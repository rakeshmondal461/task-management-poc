import express from "express";
const router = express.Router();
import { validateToken } from "../middlewares/validateToken";
import { getUserById } from "../controllers/userController";
import {
  getTaskById,
  getUserTasks,
  updateTaskStatus,
} from "../controllers/taskController";

router.get("/profile/:id", validateToken as any, getUserById);
router.get("/mytasks", validateToken as any, getUserTasks);
router.get("/task/:id", validateToken as any, getTaskById);
router.patch("/task/:id", validateToken as any, updateTaskStatus);

export default router;
