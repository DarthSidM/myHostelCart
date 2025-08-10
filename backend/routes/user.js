const express = require("express");
const multer = require("multer");
const router = express.Router();

const { signup, login, sendOTP, verifyOTP } = require("../controllers/user_auth");
const { 
    createItem, 
    getUserItems, 
    getOtherItems, 
    getItemsByCategory, 
    updateItem, 
    deleteItem,
    getAllItems
} = require("../controllers/user_items");

// Configure multer for memory storage (no local storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/userlogin", login);
router.post("/usersignup", signup);

router.post("/add-items", upload.array("images", 5), createItem); // Accept up to 5 images
router.get("/get-my-items", getUserItems);
router.get("/get-other-items", getOtherItems);
router.route("/get-all-items").get(getAllItems);
router.get("/get-items-by-category", getItemsByCategory);
router.patch("/update-item", upload.array("updatedImages", 5), updateItem); // Accept up to 5 images
router.delete("/delete-item", deleteItem);

// OTP routes
router.post("/sendotp", sendOTP);
router.post("/verifyotp", verifyOTP);

module.exports = router;
