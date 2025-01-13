const mongoose = require("mongoose");

// Define a schema for the `item` subdocument
const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
    },
    itemDescription: {
        type: String,
        default: "",
    },
    itemPrice: {
        type: Number,
    },
    itemCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    itemPictures: [
        {
            type: String,
        }
    ],
}, { _id: true }); // Ensure `_id` is enabled for the subdocument



const user_schema = new mongoose.Schema({ 
    profile_photo_url : {
        type : String
    },
    
    fullName : {
        type : String,
        required : true
    },

    phoneNumber : {
        type : Number,
        required : true,
        unique: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); // Add a simple phone number validation for a 10-digit number
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },

    password : {
        type : String,
        required : true
    },

    role: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "roles_model", 
        required: true,
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "colleges",
        required: true,
    },
    item: [
        // {
        //     itemName: {type: String},
        //     itemDescription: {type: String,default: ""},
        //     itemPrice: {type: Number},
        //     itemCategory: {type:mongoose.Schema.Types.ObjectId, ref:"categories"},
        //     itemPictures: [
        //         {
        //             type: String,
        //         }
        //     ]    
        // }
        itemSchema
    ]    
});



const user_details =  mongoose.model("users", user_schema);
module.exports = user_details;