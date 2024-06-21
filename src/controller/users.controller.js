const cookieSession = require("cookie-session");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const name = await UserModel.find({}).sort({name: 1});
  res.status(200).json(name);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email) || !name || name.length < 4 || !password) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = await UserModel.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "User created", user: newUser });
    } else {
      res.status(400).json({ message: "User already exist" });
    }
  } catch (error) {
    console.log(error);
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (matchedPassword) {
    
      req.session = { email };

     //console.log('Session:', req.session);
      res.status(200).json({ message: "You are logged in" });
    } else {
      res.status(400).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};


const logoutUser = (req, res) => {
  req.session = null;
  console.log(req.session);
  console.log(req.headers.cookie)
  res.status(200).json({message: 'You are logged out'});
}

const deleteUser = async(req, res) => {
  const id = req.params.id;
  const deletedUser = await UserModel.findByIdAndDelete(id);
  res.status(200).json({message: `User with id ${id} is deleted, {deletedUser}`})
}

module.exports = { getUsers, registerUser, loginUser, logoutUser, deleteUser };
