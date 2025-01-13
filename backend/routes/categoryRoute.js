const express = require("express");
const router = express.Router();

const {getCategories} = require("../controllers/categoryGetter");
router.get("/",getCategories);
module.exports = router;