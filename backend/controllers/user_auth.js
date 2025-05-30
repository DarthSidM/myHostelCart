const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require("../config/appjwt");
const Role = require("../models/roles");
const college = require("../models/colleges");


// Signup Function
exports.signup = async (req, res) => {
  console.log("sign up endpoint hit")
  try {
    const { fullName, collegeName, phoneNumber, password } = req.body;
    console.log("Request body:", req.body);

    // Validate required fields
    if (!fullName || !collegeName || !phoneNumber || !password) {
      return res.status(400).json({
        message: 'All fields are required, including password.',
        success: false,
      });
    }

    // Validate password length (6 or more characters)
    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be greater than 6 characters.',
        success: false,
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(400).json({
        message: 'Phone Number already exists.',
        success: false,
      });
    }

    // Hash the user's provided password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Fetch the "user" role from the roles_model
    const userRole = await Role.findOne({ roleName: "user" });
    if (!userRole) {
      return res.status(500).json({
        message: 'Role "user" not found. Please set up roles in the database.',
        success: false,
      });
    }

    // Fetch the user's college from the colleges model
    const userCollege = await college.findOne({ collegeName });
    if (!userCollege) {
      return res.status(500).json({
        message: 'User college not found. Please set up the college in the database.',
        success: false,
      });
    }

    // Create a new user object with the role
    const newUser = {
      fullName,
      college: userCollege._id,
      phoneNumber,
      password: hashedPassword,
      role: userRole._id,
    };

    const result = await User.create(newUser);

    if (result) {
      return res.status(201).json({
        message: 'User created successfully!',
        success: true,
        user: result,
      });
    } else {
      return res.status(500).json({
        message: 'Failed to create user.',
        success: false,
      });
    }
  } catch (error) {
    console.error('Sign-up error:', error);
    return res.status(500).json({
      message: `Internal server error: ${error.message}`,
      success: false,
    });
  }
};

// Login Function
exports.login = async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
  
      console.log("login endpoint hit")
      // Validate required fields
      if (!phoneNumber || !password) {
        return res.status(400).json({
          message: 'Both email and password are required.',
          success: false,
        });
      }
  
      // Find the user by phone number
      const existingUser = await User.findOne({ phoneNumber });
      
      if(!existingUser){
        return res.status(404).json({
          message: 'User does not exist. Please sign up first.',
          success: false,
        });
      }
      console.log(existingUser, "existingUser");
      if (!existingUser) {
        return res.status(404).json({
          message: 'User does not exist. Please sign up first.',
          success: false,
        });
      }
  
      // Compare the provided password with the hashed password
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: 'Invalid Phone Number or password.',
          success: false,
        });
      }
  
      // Generate a JWT token 
      const token = jwt.sign(
        {
          userId: existingUser._id,
          phoneNumber: existingUser.phoneNumber,
          college: existingUser.college,
          fullName: existingUser.fullName,
          picture: existingUser.profile_photo_url || null,
          role: existingUser.role,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRE }
      );
  
      console.log(token, "token from back");
      const user = {
        fullName: existingUser.fullName,
        phoneNumber: existingUser.phoneNumber,
        picture: existingUser.profile_photo_url,
        id: existingUser._id,
        role: 'user',
      }
  
      res.cookie('jwt', token, { // "name of cookie", "value of cookie", "options"
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: (JWT_EXPIRE * 24 * 60 * 60 * 1000) || 3600000,
      });
  
      // Send back the token and user data
      return res.status(200).json({
        message: 'Login successful!',
        success: true,
        token,
        user,
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        message: `Internal Server Error: ${error.message}`,
        success: false,
      });
    }
  };

