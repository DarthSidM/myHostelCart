const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
      required: true,
    },
  },
  { timestamps: true }
);

const message = mongoose.model("message", messageSchema);
module.exports = message;
// This schema defines a message in a chat application.
// Each message has a sender (referencing the User model), content (the text of the message),
// and a chat (referencing the Chat model). The timestamps option automatically adds createdAt and updatedAt fields to the schema.
// The sender field is required, ensuring that every message has a sender.
// The content field is also required, ensuring that every message has some text.
// The chat field is required, linking the message to a specific chat.
// The Message model is then exported for use in other parts of the application.
// This schema is used to store messages in a chat application, allowing for the retrieval of messages by sender and chat.
// The messageSchema is designed to store messages in a chat application.
// It includes fields for the sender, content, and chat, with appropriate references to the User and Chat models.
// The timestamps option is enabled to automatically manage createdAt and updatedAt fields.
// The sender field is required, ensuring that every message has a sender.
// The content field is also required, ensuring that every message has some text.
// The chat field is required, linking the message to a specific chat.
// The Message model is then exported for use in other parts of the application.
// This schema is used to store messages in a chat application, allowing for the retrieval of messages by sender and chat.
// The messageSchema is designed to store messages in a chat application.
// It includes fields for the sender, content, and chat, with appropriate references to the User and Chat models.
// The timestamps option is enabled to automatically manage createdAt and updatedAt fields.
// The sender field is required, ensuring that every message has a sender.
// The content field is also required, ensuring that every message has some text.
// The chat field is required, linking the message to a specific chat.
// The Message model is then exported for use in other parts of the application.
// This schema is used to store messages in a chat application, allowing for the retrieval of messages by sender and chat.
// The messageSchema is designed to store messages in a chat application.   