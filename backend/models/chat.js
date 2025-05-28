
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Reference to the User model
        required: true,
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  },
  { timestamps: true }
);

// Ensure only one chat exists between any two users
chatSchema.index({ users: 1 }, { unique: false });

const chat = mongoose.model("chat", chatSchema);
module.exports = chat;
