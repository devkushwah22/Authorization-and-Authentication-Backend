const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // Extract JWT token 
        console.log("cookie", req.cookies?.token)
        console.log("body", req.body?.token) 
        console.log("header", req.header("Authorization"))


        // const token = req.body?.cookies || req.body?.token || req.header("Authorization").replace("Bearer", " ")
        const token = req.cookies?.token || req.body?.token || req.header("Authorization")?.replace("Bearer ", "");
  
  

        if (!token || token === undefined) {
            return res.status(401).json({
                success: false,
                message: "Token Missing", 
            });
        }

        // Verify token: extract data for verification
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload;
            
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token",
        });
    }
};

exports.isStudent = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access",
            });
        }
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students",
            });
        }
        
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching",
        });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access",
            });
        }
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admins",
            });
        }
        
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching", 
        });
    }
};
 