const mongoose = require("mongoose");
// Define the User schema
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
// Create the User model from the schema
const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
