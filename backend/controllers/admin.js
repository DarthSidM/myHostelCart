const admin = require("../models/admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require("../config/appjwt");
const Role = require("../models/roles");
const categories = require("../models/categories");
const College = require("../models/colleges");


// admin login and signup
exports.signup = async(req,res) => {
    try{
        const {name,password} = req.body;

        if(!name || !password){
            return res.status(400).json({
                message: "all fields required",
                success: false,
            });
        }

        // Check if the user already exists
        const existingAdmin = await admin.findOne({ name });
        if (existingAdmin) {
            return res.status(400).json({
            message: 'username already exists.',
            success: false,
            });
        }

        // hash
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user object with the role
        const adminRole = await Role.findOne({ roleName: "admin" });
        const newAdmin = {
            name,
            password: hashedPassword,
            role: adminRole._id,
        };

        const result = await admin.create(newAdmin);
        if (result) {
            return res.status(201).json({
              message: 'admin created successfully!',
              success: true,
              user: result,
            });
          } else {
            return res.status(500).json({
              message: 'Failed to create user.',
              success: false,
            });
          } 
    }catch (error) {
        console.error('Sign-up error:', error);
        return res.status(500).json({
          message: `Internal server error: ${error.message}`,
          success: false,
        });
    }
};

exports.login = async(req,res) => {
    try{
        const {name, password} = req.body;
        console.log("admin login endpint hit");

        if (!name || !password) {
            return res.status(400).json({
              message: 'Both name and password are required.',
              success: false,
            });
        }
        // Find the admin by name
        const existingAdmin = await admin.findOne({ name });

        if(!existingAdmin){
            return res.status(404).json({
              message: 'User does not exist. Please sign up first.',
              success: false,
            });
        }
        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
            message: 'Invalid Phone Number or password.',
            success: false,
            });
        }
        // generate a jwt token

        const token = jwt.sign(
            {
                userId: existingAdmin._id,
                name: existingAdmin.name,
                role: existingAdmin.role
            },
            JWT_SECRET,
            {expiresIn: JWT_EXPIRE}
        );
        console.log(token, "token from back");
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: (JWT_EXPIRE * 24 * 60 * 60 * 1000) || 3600000,
        }); 
        const user = {
            name: existingAdmin.name,
            role: existingAdmin.role
        }
        // Send back the token and user data
        return res.status(200).json({
            message: 'Login successful!',
            success: true,
            token,
            user,
        });
    }catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
          message: `Internal Server Error: ${error.message}`,
          success: false,
        });
    }
};


// admin category CRUD operations
// passing category as a string 
exports.addCategory = async (req,res) =>{
    try{
        const {categoryName} = req.body;
        console.log("category name to be added: ", categoryName);

        if(!categoryName){
            return res.status(400).json({
                message: "enter a category name",
                success: false,
            });
        }

        const existingCategory = await categories.findOne({categoryName});
        if(existingCategory){
            return res.status(400).json({
                message: "category already exists",
                success: false
            });
        }
        const newCategory = {categoryName};
        const result = await categories.create(newCategory);
        if(result){
            return res.status(201).json({
                message: "category created successfully",
                success: true,
                category: result
            });
        }else{
            return res.status(500).json({
                message: "failed to create category",
                success: false
            });
        }
    }catch(error){
        console.error("category addition error: ", error);
        return res.status(500).json({
            message: `internal server error: ${error.message}`,
            success: false,
        });
    }
};

exports.getCategories = async (req,res) => {
    try{
        const allCategories = await categories.find();
        console.log(allCategories);

        if(!allCategories || allCategories.length === 0){
            return res.status(404).json({
                message: "no categories found",
                success: false
            });
        }
        // If categories exist, return them
        return res.status(200).json({
            message: "Categories fetched successfully",
            success: true,
            data: allCategories
        });
    }catch(error){
        console.error("Error fetching categories: ", error);
        return res.status(500).json({
            message: `Internal server error: ${error.message}`,
            success: false
        });
    }
};
//passing category as category id
exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id; 

    try {
        const deletedCategory = await categories.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Category deleted successfully",
            success: true
        });
    } catch (error) {
        console.error("Error deleting category: ", error);
        return res.status(500).json({
            message: `Internal server error: ${error.message}`,
            success: false
        });
    }
};
// passing category as category id
exports.updateCategory = async (req, res) => {
    const categoryId = req.params.id; // Get the category ID from the URL
    const { categoryName } = req.body; // Get the updated data from the body

    if (!categoryName) {
        return res.status(400).json({
            message: "Category name is required",
            success: false
        });
    }

    try {
        // Update the category in the database by its ID
        const updatedCategory = await categories.findByIdAndUpdate(
            categoryId,
            { categoryName },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({
                message: "Category not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Category updated successfully",
            success: true,
            data: updatedCategory // Send back the updated category data
        });
    } catch (error) {
        console.error("Error updating category: ", error);
        return res.status(500).json({
            message: `Internal server error: ${error.message}`,
            success: false
        });
    }
};


// admin college CRUD operations
exports.addCollege = async (req,res) => {
    try{
        const {collegeName} = req.body;
        console.log("college name to be added: ", collegeName);

        if(!collegeName){
            return res.status(400).json({
                message: "enter a college name",
                success: false,
            });
        }

        const existingCollege = await College.findOne({collegeName});
        if(existingCollege){
            return res.status(400).json({
                message: "college already exists",
                success: false
            });
        }

        const newCollege = {collegeName};
        const result = await College.create(newCollege);

        if(result){
            return res.status(201).json({
                message: "college created successfully",
                success: true,
                college: result
            });
        }else{
            return res.status(500).json({
                message: "failed to add college",
                success: false
            });
        }
    }catch(error){
        console.error("college addition error: ", error);
        return res.status(500).json({
            message: `internal server error: ${error.message}`,
            success: false,
        });
    }
};

exports.getColleges = async (req,res) =>{
    try{
        const allColleges = await College.find();

        if(!allColleges || allColleges.length === 0){
            return res.status(404).json({
                message: "no colleges found",
                success: false
            });
        }
        console.log(allColleges);
        // If colleges exist, return them
        return res.status(200).json({
            message: "colleges fetched successfully",
            success: true,
            data: allColleges
        });
    }catch(error){
        console.error("Error fetching colleges: ", error);
        return res.status(500).json({
            message: `Internal server error: ${error.message}`,
            success: false
        });
    }
}

exports.deleteCollege = async (req,res) => {
    const collegeId = req.params.id;
    try{
        const deletedCollege = await College.findByIdAndDelete(collegeId);

        if (!deletedCollege) {
            return res.status(404).json({
                message: "college not found",
                success: false
            });
        }
        console.log("deleted college ", deletedCollege);
        return res.status(200).json({
            message: "college deleted successfully",
            success: true
        });
    }catch(error){
        console.error("Error deleting college: ", error);
        return res.status(500).json({
            message: `Internal server error: ${error.message}`,
            success: false
        });
    }
}

exports.updateCollege = async (req,res) => {
    const collegeId = req.params.id; // Get the college ID from the URL
    const { collegeName } = req.body; // Get the updated data from the body

    if (!collegeName) {
        return res.status(400).json({
            message: "college name is required",
            success: false
        });
    }

    try{
        // Update the college in the database by its ID
        const updatedCollege = await College.findByIdAndUpdate(
            collegeId,
            { collegeName },
            { new: true } // Return the updated document
        );

        if (!updatedCollege) {
            return res.status(404).json({
                message: "college not found",
                success: false
            });
        }
        console.log("updated college")
        return res.status(200).json({
            message: "college updated successfully",
            success: true,
            data: updatedCollege
        });
    }catch(error){
        console.error("Error updating college: ", error);
        return res.status(500).json({
            message: `Internal server error: ${error.message}`,
            success: false
        });
    }
}