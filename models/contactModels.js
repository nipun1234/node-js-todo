const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the Contact Name"]
    },
    email: {
        type: String,
        required: [true, "Please add the Contact email"]
    },
    phone: {
        type: String,
        required: [true, "Please add the Contact Phone number"]
    }
},
{
    timestamps: true
});

const Contacts = mongoose.model("contact", contactSchema);

module.exports = Contacts;