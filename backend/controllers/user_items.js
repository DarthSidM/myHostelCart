const User = require("../models/user");
const College = require("../models/colleges"); // during retrieval
const Category = require("../models/categories"); // during deletion and updation


exports.createItem = async (req,res) => {
    try{
        const { userId, itemName, itemDescription,itemPrice, itemCategory } = req.body;

        if (!userId || !itemName || !itemPrice || !itemCategory) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const category = await Category.findOne({categoryName: itemCategory}); // here i have to do {categoryName: itemCategory} because if i had directly written categoryName instead of itemCategory then simple {categoryName} would have sufficed

        const newItem = {
            itemName,
            itemDescription: itemDescription || "", // Default to an empty string if not provided
            itemPrice,
            itemCategory:category._id,
        };

        user.item.push(newItem);
        await user.save();
        const createdItem = user.item[user.item.length - 1]; // The last added item
        return res.status(201).json({ message: "Item created successfully", item: createdItem });


    }catch(error){
        console.error("Error creating item:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
// getting items of the user
// user id will be sent from the frontend
exports.getUserItems = async (req,res) =>{
    try{
        const {userId} = req.body;

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
exports.getItemsBySearch = async (req,res) =>{
    try{
        const { collegeId, searchQuery } = req.body;

        if (!collegeId) {
            return res.status(400).json({ message: "College ID is required", success: false });
        }

        const users = await User.find({ college: collegeId }); 

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found for this college", success: false });
        }

        // Filter items based on the search query
        let items = [];
        users.forEach(user => {
            user.item.forEach(item => {
                if (!searchQuery || 
                    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    item.itemDescription.toLowerCase().includes(searchQuery.toLowerCase())) {
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
exports.updateItem = async (req, res) => {
    try {
        const { userId, itemId, itemName, itemDescription, itemPrice, itemCategory } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ message: "User ID and Item ID are required", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Find the item in the user's item array by itemId
        const itemIndex = user.item.findIndex(item => item._id.toString() === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found", success: false });
        }

        // Update the item fields (check if new values are provided, otherwise retain existing ones)
        user.item[itemIndex].itemName = itemName || user.item[itemIndex].itemName;
        user.item[itemIndex].itemDescription = itemDescription || user.item[itemIndex].itemDescription;
        user.item[itemIndex].itemPrice = itemPrice || user.item[itemIndex].itemPrice;
        user.item[itemIndex].itemCategory = itemCategory || user.item[itemIndex].itemCategory;

        await user.save();

        return res.status(200).json({
            message: "Item updated successfully",
            success: true,
            item: user.item[itemIndex],
        });

    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message,
        });
    }
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

        // Remove the item from the array
        user.item.splice(itemIndex, 1);

        await user.save();

        return res.status(200).json({
            message: "Item deleted successfully",
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



