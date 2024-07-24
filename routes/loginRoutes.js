const express = require("express");
const loginUser = require("../controllers/logincontroller");
const router = express.Router();

router.route("/")
.post(loginUser);

module.exports = router;