const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("./model");

router.get('/get', async(req, res) => {
    const name = await UserModel.find();
    res.status(200).json(name);
});

router.post('/register', async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        const existingUser = await UserModel.findOne({email: req.body.email});
        if(!existingUser) {
            const newUser = await UserModel.create({name: name, email: email, password: hashedPassword});
            console.log('17', newUser);
             res.status(201).json({message: 'User created', user: newUser});
        }else{
            res.status(400).json({message: 'User already exist'})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server error'})
    }
});

router.post("/signin", (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        
    }
})

module.exports = router;