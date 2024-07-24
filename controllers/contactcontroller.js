const contacts = require("../models/contactModels");

const getAllContacts = async(req, res)=> {

    contactsData = await contacts.find();
    return res.json(contactsData);
};

const createContact = async(req, res)=> {
    const {name, email, phone} = req.body;

    if(!name || !email || !phone) {
        return res.status(400).json({message: "Bad Request"});
    }
    const data = await contacts.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    })

    return res.send("created post request");
};

const getContactById = (req, res)=> {
    return res.json({message: `get contact of id ${req.params.id}`});
};

const updateContact = (req, res)=> {
    return res.json({message: `put contact of id ${req.params.id}`})
};

const deleteContact = (req, res)=> {
    return res.json({message: `delete contact of id ${req.params.id}`})
};

module.exports = { getAllContacts, createContact, getContactById, updateContact, deleteContact };