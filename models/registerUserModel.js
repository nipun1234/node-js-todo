const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required field"]
    },
    email: {
        type: String,
        required: [true, "Email is required field"]
    },
    password: {
        type: String,
        required: [true, "Password is required field"]
    }
})

module.exports = mongoose.model("userData", userDataSchema);