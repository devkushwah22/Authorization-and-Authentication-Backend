// Aise banta hai router express framework ki help se
const express = require("express");
const router = express.Router();

// Authentication()
const {login, signup} = require("../controller/Auth");
// Authorization(middleware)
const {auth, isStudent, isAdmin} = require("../middleware/auth");

// router.method(PATH, controller ka callback function)
router.post("/login", login) 
router.post("/signup", signup) 


// single middleware just for testing 
// rouuter.method(PATH, middleware, callback)
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for test"
    });
});

//Protected Route
// rouuter.method(PATH, first middleware, second middleware, callback)
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for student" 
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the protected route for admin"
    });
});

module.exports = router;