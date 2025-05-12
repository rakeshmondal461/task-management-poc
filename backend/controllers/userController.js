const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUsers = (req, res) => {
  // Your logic to retrieve users from a database or service
  res.send("Retrieving all users");
};

const getUserById = async(req, res) => {
  try {
    const userId = req.params.id;
    const user = await user.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  try {
    const newUser = req.body;
    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.password
    ) {
      res.status(400).json({ message: "Fill all required fields" });
    }

    const hashed = await bcrypt.hash(newUser.password, 10);
    const data = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: hashed,
      userType: "user",
    };

    const newuser = await user.create(data);
    res.json({ message: "User created successfully", newuser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const signInUser = async (req, res) => {
  try {
    const data = req.body;
    if (!data.email || !data.password) {
      res.status(400).json({ message: "Fill all required fields" });
    }

    const existUser = await user.findOne({ email: data.email });
    if (!existUser) res.status(400).json({ message: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(
      data.password,
      existUser.password
    );
    if (!isValidPassword)
      res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        id: existUser._id,
        email: existUser.email,
        userType: existUser.existUser,
      },
      process.env.JWT_SECRET
    );

    res.json({ message: "Login successfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  signupUser,
  signInUser,
};
