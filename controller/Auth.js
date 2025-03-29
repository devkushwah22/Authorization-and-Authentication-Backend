const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 

// signUp route handler
exports.signup = async (req, res) => {
    try {
        // Get data from request body (frontend side se)
        const { name, email, passward, role } = req.body;   // ye hum postman se denge  

        // Check if user already exists based on email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Secure password
        let hashedPassward;
        try {
            hashedPassward = await bcrypt.hash(passward, 10);   // password ko hash kar rahe hai, 10 round tak
        } 
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            });
        }

        // Create user entry
        const user = await User.create({ 
            name, 
            email, 
            passward: hashedPassward,
            role
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
        });

    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User can't be created",
        });
    }
};

// login handler route
exports.login = async (req, res) => {
    try{
        // Data fetch 
        const { email, passward } = req.body; 

        // Validation on email and passward
        if (!email || !passward) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully"
            });
        }

        // Check for registered user
        const user = await User.findOne({ email });
        // If not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            });
        }

        // Payload(body)
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };

        // Verify password & generate a JWT Token
        if (await bcrypt.compare(passward, user.passward)) {
            // Passward matched
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

            const userObj = user.toObject();    // user ko object banane ki need kyo padi ye to mujhe khud nahi pta
            userObj.token = token;
            userObj.passward = undefined;

            

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };                

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user: userObj,
                message: "User login successfully"
            });
        } 
        else {
            // Passward does not match
            return res.status(400).json({
                success: false,
                message: "Passward is incorrect"
            });
        }
    }

    catch(error) { 
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Login Failure"
        });
    }
};
