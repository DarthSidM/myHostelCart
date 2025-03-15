const express = require("express");
const multer = require("multer");
const router = express.Router();


const { signup,login } = require("../controllers/user_auth");
const { createItem, getUserItems, getOtherItems, getItemsByCategory,updateItem,deleteItem } = require("../controllers/user_items");

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store images in `uploads/` folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

router.post("/userlogin", login)
router.post("/usersignup", signup);

// router.post("/add-items", createItem);
router.post("/add-items", upload.array("images", 5), createItem); // Accept up to 5 images

router.get("/get-my-items", getUserItems);
router.get("/get-other-items",getOtherItems);
router.get("/get-items-by-category",getItemsByCategory);
router.patch("/update-item", upload.array("updatedImages", 5), updateItem); // Accept up to 5 images
router.delete("/delete-item",deleteItem);

module.exports = router;

