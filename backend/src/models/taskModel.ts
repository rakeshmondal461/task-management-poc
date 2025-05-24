
import mongoose from "mongoose";
// Define the User schema
const taskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.ObjectId, ref: "Project" },
  status: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
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
const Task = mongoose.model("Task", taskSchema);
export default Task;
