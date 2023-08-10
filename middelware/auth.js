const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

exports.verifyToken = async (req, res, next) => {
    
    const token = req.body.token || req.query.token || req.headers["authorizaton"];

    if (!token) {
        res.status(200).json({ message: "Token is required for authentication." })
    }
    try {
        const decode = jwt.verify(token, config.secret);
        req.user = decode;
    }
    catch {
        res.status(200).json("Invalid Token");
    }
    
    return next();
}




