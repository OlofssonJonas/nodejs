const mongoose = require("mongoose");

const Schema = mongoose.Schema({
    name: {type: String, required: true, minLength: 4 },
    email: {type: String, required: true},
    password: {type: String, required: true}
});

const UserModel = mongoose.model("User", Schema );

module.exports = UserModel;