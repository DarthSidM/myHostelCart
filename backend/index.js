const express = require("express");
const app = express();







//route definations
const database = require("./config/database");
const user = require("./routes/user");
const admin = require("./routes/admin");
const category = require("./routes/categoryRoute");
const college = require("./routes/collegeRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// Routes
app.use("/api/v1/user", user);
app.use("/api/v1/admin", admin);
app.use("/api/v1/category",category);
app.use("/api/v1/college",college);







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