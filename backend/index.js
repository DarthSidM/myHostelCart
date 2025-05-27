const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");





//route definations
const database = require("./config/database");
const user = require("./routes/user");
const admin = require("./routes/admin");
const category = require("./routes/categoryRoute");
const college = require("./routes/collegeRoute");
const chatMessage = require("./routes/chatMessage");

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
});