const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); 
const { JWT_SECRET, JWT_EXPIRE } = require("../config/appjwt");


const verifyAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        const user = await Admin.findById(req.user.userId);

        // if user not found then either that user is not an admin or not in the admin database
        if (user === null) {
            console.log("No user found with this ID then either that user is not an admin or not in the admin database.");
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        else{
            next();
        }
    
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = verifyAdmin;
