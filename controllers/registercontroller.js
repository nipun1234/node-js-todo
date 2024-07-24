const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const userData = require("../models/registerUserModel");

const registerUser = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are mandatory" });
        }
    
            // Check if user already exists
            const existingUser = await userData.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User Already Exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create new user
            const newUser = await userData.create({ name, email, password: hashedPassword });
    
            // Send success response
            return res.send("User created successfully - " + newUser.name);
    });


// Another method is using Try Catch block as given below.....

//     const registerUser = async (req, res) => {
//         const { name, email, password } = req.body;
    
//         if (!name || !email || !password) {
//             return res.status(400).json({ message: "All fields are mandatory" });
//         }
    
//         try {
//             // Check if user already exists
//             const existingUser = await userData.findOne({ email });
//             if (existingUser) {
//                 return res.status(400).json({ message: "User Already Exists" });
//             }
    
//             // Create new user
//             const newUser = await userData.create({ name, email, password });
    
//             // Send success response
//             return res.send("User created successfully - " + newUser.name);
//         } catch (error) {
//             console.error("Error registering user:", error);
//             return res.status(500).json({ message: "Internal Server Error" });
//         }
//     };
    

module.exports = registerUser;