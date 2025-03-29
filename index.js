// ye humne app ka reference le liya express framework se
const express = require("express");
const app = express();
app.use(express.json());
const database = require("./config/database");


// ye  port set kar diya
require("dotenv").config();
const PORT = process.env.PORT || 4000;
database.connect(); 


//route import and mount 
const user = require("./routes/user")    // import route
app.use("/api/v1", user);   // mount route


//activation
app.listen(PORT, (req, res) => {
    console.log(`App is listening at PORT ${PORT}`);
 
})

// ye hum router me banate hain, 
// e.g. router.method(PATH, controller ka callback function)
app.get("/", (req, res) => {
    res.send(`<h1> Hii, This is HomePage</h1>`);
});

