const mongoose = require("mongoose");

const colleges_schema= new mongoose.Schema(
{
    collegeName :{
        type: String, 
        required: true, 
        unique: true
    }
});

module.exports = mongoose.model("colleges", colleges_schema);