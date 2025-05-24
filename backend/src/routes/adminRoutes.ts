import express from "express";
import { getUsers, getUserById } from "../controllers/adminController";
import {
  createProject,
  getProjects,
} from "../controllers/projectController";
import { assignTask } from "../controllers/taskController";
import { validateToken } from "../middlewares/validateToken";

const router = express.Router();

router.get("/users", validateToken as any, getUsers);
router.get("/projects", validateToken as any, getProjects);
router.post("/addProject", validateToken as any, createProject);
router.post("/createTask", validateToken as any, assignTask);

export default router;
