// Import necessary modules (if any)
const user = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await user.find({userType:'user'});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

module.exports = {
  getUsers,
  getUserById
};