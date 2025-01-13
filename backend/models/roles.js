const mongoose = require("mongoose");

const role_schema= new mongoose.Schema(
{
    roleName :{type: String, required: true}
});

const role = mongoose.model("roles_model", role_schema);
module.exports = role;