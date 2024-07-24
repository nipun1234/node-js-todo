const asyncHandler = require("express-async-handler");
const jwtToken = require("jsonwebtoken");

const validateToken = asyncHandler(async(req, res, next) => {

    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwtToken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, resp)=> {
            if(err) {
                return res.status(401).json({msg: "Unauthorized Error from Middleware"});
            }
            req.loggedInUser = resp.userData;
            next();
        })
    } else {
        return res.status(401).json({msg: "Unauthorized User Error"});
    }
});

module.exports = validateToken;