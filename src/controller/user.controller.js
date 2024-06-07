const UserModel = require("../model");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  const name = await UserModel.find();
  res.status(200).json(name);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    const hashedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (hashedPassword) {
      res.cookie("user", existingUser._id);
      console.log(existingUser._id);
      res.status(200).json({ message: "You are logged in" });
    } else {
      res.status(400).json({ message: "Wrong credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.log(error);
  }
};


module.exports = { getUsers, registerUser, loginUser };
