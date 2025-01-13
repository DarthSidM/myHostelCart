const mongoose = require("mongoose");

const admin_schema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "roles_model", 
        required: true,
    }
});

const admin_details =  mongoose.model("admin", admin_schema);
module.exports = admin_details;