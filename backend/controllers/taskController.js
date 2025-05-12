const task = require("../models/taskModel");
const user = require("../models/userModel");

const getTasks = async (req, res) => {
  try {
    const tasks = await task.find();
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const tasks = await task.find({ assignedTo: req.user.id });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await task.findById(taskId);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignTask = async (req, res) => {
  try {
    const reqData = req.body;
    if (!reqData.projectId || !req.userId) {
      res.status(400).json({ message: "Fill provide project name" });
    }

    if (req.user.userType != "admin")
      res.status(405).json({ message: "You are not allowed to create Task" });

    const data = {
      project: reqData.projectId,
      assignedTo: req.userId,
      status: "pending",
    };

    const newTask = await task.create(data);
    res.json({ message: "Task created successfully", newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const reqData = req.body;
    if (!reqData.taskId || !reqData.status) {
      res.status(400).json({ message: "Select status" });
    }

    const task = await task.findByIdAndUpdate(reqData.taskId, {
      status: reqData.status,
    });
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTasks,
  getUserTasks,
  getTaskById,
  assignTask,
  updateTaskStatus,
};
