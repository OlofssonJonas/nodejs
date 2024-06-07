const express = require("express");
const router = express.Router();
const {getUsers, registerUser, loginUser} = require("../controller/user.controller");
const cookieSession = require("../../server");


router.get("/users", getUsers);


router.post("/registeruser", registerUser);


router.post("/login", loginUser);

module.exports = router;

