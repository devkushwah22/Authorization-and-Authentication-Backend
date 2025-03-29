const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {console.log("DB is connected successfully")})
    .catch((error) => {
        console.log("DB connection failed");
        console.log(error); 
        // console.log(message.error);
        process.exit(1)
        
        
    })
}