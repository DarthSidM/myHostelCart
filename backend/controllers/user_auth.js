const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRE } = require("../config/appjwt");
const Role = require("../models/roles");
const college = require("../models/colleges");
const axios = require('axios');
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const TWOFACTOR_API_KEY = process.env.TWOFACTOR_API_KEY;
const OTP_TEMPLATE_NAME = process.env.TWOFACTOR_TEMPLATE_NAME;
const { addVerifiedNumber, isVerified, removeVerified } = require("../middleware/verifiedNumbers");

async function verifyRecaptcha(token) {
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`;
  const response = await axios.post(url);
  return response.data.success;
}

// Send OTP Function
exports.sendOTP = async (req, res) => {
  const { phoneNumber, recaptchaToken } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: "Phone number is required." });
  }
  if (!recaptchaToken) {
    return res.status(400).json({ success: false, message: "reCAPTCHA token is missing." });
  }

  try {
    // Verify reCAPTCHA token with Google
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const recaptchaResponse = await axios.post(verifyUrl);
    if (!recaptchaResponse.data.success) {
      return res.status(403).json({ success: false, message: "reCAPTCHA verification failed." });
    }

    // If captcha verification passed, proceed to send OTP
    const otpUrl = `https://2factor.in/API/V1/${TWOFACTOR_API_KEY}/SMS/${phoneNumber}/AUTOGEN/${OTP_TEMPLATE_NAME}`;
    const response = await axios.get(otpUrl);

    if (response.data.Status === "Success") {
      return res.status(200).json({
        success: true,
        sessionId: response.data.Details,
        message: "OTP sent successfully.",
      });
    } else {
      return res.status(500).json({ success: false, message: "Failed to send OTP." });
    }
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


exports.verifyOTP = async (req, res) => {
  const { phoneNumber, otp, sessionId } = req.body;

  if (!phoneNumber || !otp || !sessionId) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const verifyUrl = `https://2factor.in/API/V1/${TWOFACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`;
    const response = await axios.get(verifyUrl);

    if (response.data.Status === "Success") {
      addVerifiedNumber(phoneNumber); // ✅ mark phone number as verified
      return res.status(200).json({ success: true, message: "OTP verified successfully." });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};


// Signup Function
exports.signup = async (req, res) => {
  console.log("sign up endpoint hit")
  try {
    const { recaptchaToken, fullName, collegeName, phoneNumber, password } = req.body;
    console.log("Request body:", req.body);

    // Verify reCAPTCHA token
    if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed.' });
    }
    // Check OTP verification
    if (!isVerified(phoneNumber)) {
      return res.status(401).json({
        message: 'Phone number not verified via OTP.',
        success: false,
      });
    }
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

    removeVerified(phoneNumber); // ✅ remove phone number from verified list after successful signup
    
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
      const { recaptchaToken, phoneNumber, password } = req.body;
  
      console.log("login endpoint hit")
      // Validate required fields

      if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
        return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed.' });
      }
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

