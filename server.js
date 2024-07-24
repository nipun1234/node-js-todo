const express = require("express");
const dotenv = require('dotenv').config();
const contactsRoute = require("./routes/contactsroutes");
const registerRoutes = require("./routes/registerRoutes");
const validateToken = require("./middleware/validateTokenHandler");
const loginRoutes = require("./routes/loginRoutes");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/youtube-app-1")
.then(()=> console.log("mongodb connected"))
.catch(()=> console.log("error in connecting"));

const port = process.env.PORT || 5000;

app.use('/api/contacts', validateToken, contactsRoute);

app.use('/register', registerRoutes);

app.use('/login', loginRoutes);

app.use((err, req, res, next) => {
    // Handle the error here
    res.status(500).json({ error: 'Internal Server Error from here' });
});

app.listen(port, ()=> {
    console.log(`Listening at port ${port}`);
})

console.log("check new data");