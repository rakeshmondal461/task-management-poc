const project = require("../models/projectModel");
const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getProjects = async (req, res) => {
  try {
    const projects = await project.find();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const userId = req.params.id;
    const project = await project.findById(userId);
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const reqData = req.body;
    if (
      !reqData.projectName
    ) {
      res.status(400).json({ message: "Fill provide project name" });
    }

    const data = {
      firstName: reqData.projectName,
      isActive: true,
    };

    const newProject = await project.create(data);
    res.json({ message: "Project created successfully", newProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  getProjects,
  getProjectById,
  createProject,

};
