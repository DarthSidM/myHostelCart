const express = require("express");
const router = express.Router();
const { signup,login } = require("../controllers/user_auth");
const { createItem, getUserItems, getItemsBySearch, getItemsByCategory,updateItem,deleteItem } = require("../controllers/user_items");

router.post("/userlogin", login)
router.post("/usersignup", signup);

router.post("/add-items", createItem);
router.get("/get-my-items", getUserItems);
router.get("/get-items-by-search",getItemsBySearch);
router.get("/get-items-by-category",getItemsByCategory);
router.patch("/update-item",updateItem);
router.delete("/delete-item",deleteItem);

module.exports = router;

