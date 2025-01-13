const express = require("express");
const router = express.Router();
const { 
    signup,
    login,

    addCategory,
    getCategories,
    deleteCategory,
    updateCategory,
    
    addCollege,
    getColleges,
    deleteCollege,
    updateCollege,

    } = require("../controllers/admin");
const verifyAdmin = require("../middleware/verifyAdmin");

router.post("/adminlogin", login);
router.post("/adminsignup", signup);

router.post("/add-category", verifyAdmin, addCategory); // C
router.get("/get-categories",verifyAdmin, getCategories); // R
router.patch("/update-category/:id",verifyAdmin, updateCategory); // U
router.delete("/delete-category/:id",verifyAdmin,deleteCategory); // D

router.post("/add-college", verifyAdmin, addCollege); // C
router.get("/get-colleges", verifyAdmin, getColleges); // R 
router.patch("/update-college/:id",verifyAdmin, updateCollege); // U
router.delete("/delete-college/:id", verifyAdmin, deleteCollege); // D


module.exports = router;

