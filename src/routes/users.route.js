const express = require("express");
const router = express.Router();
const {getUsers, registerUser, loginUser, logoutUser, deleteUser} = require("../controller/users.controller");
const cookieSession = require("../../server");


router.get("/users", getUsers);


router.post("/registeruser", registerUser);


router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.delete("/users/:id", deleteUser)

module.exports = router;

