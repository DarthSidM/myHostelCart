const Category = require("../models/categories");

exports.getCategories = async (req,res) =>{
    try{
        const allCategories = await Category.find();

        if(!allCategories || allCategories.length === 0){
            return res.status(404).json({
                message: "no categories found",
                success: false
            });
        }
        const categoryNames = allCategories.map(category => category.categoryName);
        // If Categories exist, return them
        console.log(categoryNames)
        return res.status(200).json({
            message: "Categories fetched successfully",
            success: true,
            data: categoryNames
        });
    }catch(error){
        console.error("Error fetching categories: ", error);
        return res.status(500).json({
            message: `Internal server error: ${error.message}`,
            success: false
        });
    }
}