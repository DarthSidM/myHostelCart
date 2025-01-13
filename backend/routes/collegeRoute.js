const express = require("express");
const router = express.Router();

const {getColleges} = require("../controllers/collegeGetter");
router.get("/",getColleges);
module.exports = router;