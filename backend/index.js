// the code is created and maintained by Siddharth Maurya or Darth Sid if you steal it, I will fuck you up

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");


//route definations
const database = require("./config/database");
const user = require("./routes/user");
const admin = require("./routes/admin");
const category = require("./routes/categoryRoute");
const college = require("./routes/collegeRoute");
const chatMessage = require("./routes/chatMessage");

const allowedOrigins = [
  'http://localhost:5173',           // Dev
  'http://hostelcart.in',            // Production HTTP
  'https://hostelcart.in'            // Production HTTPS (if using SSL)
];

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Prevent JSON parsing for GET requests
app.use((req, res, next) => {
    if (req.method !== "GET") {
        express.json()(req, res, next);
    } else {
        next();
    }
});

// Routes
app.use("/api/v1/user", user);
app.use("/api/v1/admin", admin);
app.use("/api/v1/category",category);
app.use("/api/v1/college",college);
app.use("/api/v1/chat", chatMessage);


const PORT = 3000;
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Welcome to myhostelcart Server"
    })
});
//database connection
database.connect();
const server = app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
});



// websocket connection
const io = new Server(server, {
  cors: { origin: allowedOrigins, credentials: true },
});

io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  socket.on("setup", (userId) => {
    socket.join(userId);
    console.log(`✅ User ${userId} joined personal room`);
  });

  socket.on("join chat", (chatId) => {
    socket.join(chatId);
    console.log(`📥 Joined chat room ${chatId}`);
  });

  socket.on("new message", (message) => {
    const chat = message.chat;

    if (!chat || !chat.users) return;
    socket.to(chat._id).emit("message received", message);

  });

  socket.on("disconnect", () => {
    console.log("🚫 Client disconnected:", socket.id);
  });
});
