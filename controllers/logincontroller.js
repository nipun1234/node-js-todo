const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");
const userData = require("../models/registerUserModel");

const loginUser = asyncHandler(async(req,res) => {

    const {email, password} = req.body;

    if(!email || !password) {
       return res.status(400).json({msg: "All fields are mandatory"});
    }

    const user = await userData.findOne({ email });
    if(!user) {
        return res.status(400).json({msg: "No User Exists"});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(user && isPasswordCorrect) {

        const userJwtToken = jwtToken.sign({
            userData: {
                username: user.name,
                email: user.email 
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
        )
        
        return res.status(200).json({ userJwtToken });
    }

    return res.status(400).send({msg: "Invalid Ceredentials"});
});

module.exports = loginUser;
