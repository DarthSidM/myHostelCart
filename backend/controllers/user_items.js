const User = require("../models/user");
const College = require("../models/colleges"); // during retrieval
const Category = require("../models/categories"); // during deletion and updation
const { uploadImage,deleteFile } = require("../config/cloud");


exports.createItem = async (req,res) => {
    try {
        const { userId, itemName, itemDescription, itemPrice, itemCategory } = req.body;
        
        if (!userId || !itemName || !itemPrice || !itemCategory || !req.files || req.files.length === 0) {
            return res.status(400).json({ message: "All fields and at least one image are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const category = await Category.findOne({ categoryName: itemCategory });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Upload all images to Cloudinary and get URLs
        const imageUploadPromises = req.files.map(file => uploadImage(file.buffer)); // Upload each image
        const uploadedImageUrls = await Promise.all(imageUploadPromises); // Wait for all uploads to complete
        const formattedPictures = uploadedImageUrls.map(img => img.secure_url);
        const newItem = {
            itemName,
            itemDescription: itemDescription || "",
            itemPrice,
            itemCategory: category._id,
            itemPictures: formattedPictures // Store Cloudinary URLs
        };

        user.item.push(newItem);
        await user.save();
        const createdItem = user.item[user.item.length - 1]; // The last added item

        //confirmation message
        console.log("Item created successfully",itemName);
        return res.status(201).json({ message: "Item created successfully", item: createdItem });

    } catch (error) {
        console.error("Error creating item:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
// getting items of the user
// user id will be sent from the frontend
exports.getUserItems = async (req,res) =>{
    try{
        const {userId} = req.query;
        
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message: "no user found",
                success: false,
            });
        }

        // Retrieve the items of the user
        const userItems = user.item;

        return res.status(200).json({
            message: "Items retrieved successfully",
            success: true,
            items: userItems,
        });
    }catch(error){
        console.error("Error fetching user items:", error);
        res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
}

// college id and search query will be sent from the frontend
exports.getOtherItems = async (req,res) =>{
    try {
        const { collegeId,userId } = req.query;

        if (!collegeId) {
            return res.status(400).json({ message: "College ID is required", success: false });
        }

        // Fetch users belonging to the specified college
        const users = await User.find({ college: collegeId, _id: { $ne: userId } });

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found for this college", success: false });
        }

        // Collect items along with seller info
        let items = [];
        users.forEach(user => {
            user.item.forEach(item => {
                items.push({
                    ...item.toObject(), // Convert Mongoose subdocument to plain object
                    seller: {
                        fullName: user.fullName,
                        phoneNumber: user.phoneNumber,
                        profile_photo_url: user.profile_photo_url,
                    }
                });
            });
        });

        return res.status(200).json({
            message: "Items retrieved successfully",
            success: true,
            items: items,
        });

    } catch (error) {
        console.error("Error fetching user items:", error);
        res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
}

// college id and category id will be sent from the frontend
exports.getItemsByCategory = async (req,res) =>{
    try{
        const { collegeId,categoryId } = req.body;
        
        if (!collegeId) {
            return res.status(400).json({ message: "College ID is required", success: false });
        }
        if (!categoryId) {
            return res.status(400).json({ message: "category ID is required", success: false });
        }

        const users = await User.find({ college: collegeId });
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found for this college", success: false });
        }

        let items = [];
        users.forEach(user => {
            user.item.forEach(item => {
                if (item.itemCategory.toString() === categoryId) {
                    items.push(item);
                }
            });
        });
        return res.status(200).json({
            message: "Items retrieved successfully",
            success: true,
            items: items,
        });
    }catch(error){
        console.error("Error fetching user items:", error);
        res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
}

// user id and item id will be sent from the frontend
// updated images will be sent from the frontend
exports.updateItem = async (req, res) => {
    console.log("update item endpoint hit")
    try {
        const { userId, itemId, itemName, itemDescription, itemPrice, deletedImages } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ message: "User ID and Item ID are required", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Find the item in the user's item array
        const itemIndex = user.item.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found", success: false });
        }

        const item = user.item[itemIndex];

        // Update text fields if provided
        if (itemName) item.itemName = itemName;
        if (itemDescription) item.itemDescription = itemDescription;
        if (itemPrice) item.itemPrice = itemPrice;

        // Upload new images to Cloudinary
        if (req.files && req.files.length > 0) {
            const imageUploadPromises = req.files.map(file => uploadImage(file.buffer));
            const uploadedImageUrls = await Promise.all(imageUploadPromises);
            const formattedPictures = uploadedImageUrls.map(img => img.secure_url);

            item.itemPictures = [...item.itemPictures, ...formattedPictures];
        }

        // Delete images from Cloudinary & remove from itemPictures array
        if (deletedImages) {
            const imagesToDelete = Array.isArray(deletedImages) ? deletedImages : [deletedImages];

            // Call deleteFile function for each image
            await Promise.all(imagesToDelete.map(imgUrl => deleteFile(imgUrl)));

            // Remove deleted images from MongoDB
            item.itemPictures = item.itemPictures.filter(img => !imagesToDelete.includes(img));
        }

        await user.save();

        return res.status(200).json({
            message: "Item updated successfully",
            success: true,
            item
        });

    } catch (error) {
        console.error("Error updating item:", error);
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
    console.log("item updated");
};


// user id and item id will be sent from the frontend
exports.deleteItem = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ message: "User ID and Item ID are required", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const itemIndex = user.item.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found", success: false });
        }

        const item = user.item[itemIndex];

        // Delete all images from Cloudinary
        if (item.itemPictures && item.itemPictures.length > 0) {
            const deleteImagePromises = item.itemPictures.map(imageUrl => deleteFile(imageUrl));
            await Promise.all(deleteImagePromises); // Wait for all deletions to complete
            console.log(`Deleted ${item.itemName} images from Cloudinary`);
        }

        // Remove the item from the user's item array
        user.item.splice(itemIndex, 1);
        await user.save();

        return res.status(200).json({
            message: "Item and associated images deleted successfully",
            success: true,
        });

    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
};



