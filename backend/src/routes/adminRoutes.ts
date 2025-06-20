import express from "express";
import { getUsers, activeUser, getAllTasks } from "../controllers/adminController";
import {
  createProject,
  getProjects,
  updateProject,
} from "../controllers/projectController";
import { assignTask, createAndAssignTask } from "../controllers/taskController";
import { validateToken } from "../middlewares/validateToken";

const router = express.Router();

router.get("/users", validateToken as any, getUsers);
router.patch("/active/:id", validateToken as any, activeUser);
router.get("/projects", validateToken as any, getProjects);
router.post("/addProject", validateToken as any, createProject);
router.put ("/updateProject/:id", validateToken as any, updateProject);
router.post("/createTask", validateToken as any, createAndAssignTask);
router.patch("/assignTask/:id", validateToken as any, assignTask);
router.get("/allTasks", validateToken as any, getAllTasks);

export default router;
