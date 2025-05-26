import { Request, Response } from "express";
import Task from "../models/taskModel";
import User from "../models/userModel";
import { getIO } from "../utils/socket";

type TaskData = {
  project: string;
  title: string;
  assignedTo?: string;
  status?: string;
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ tasks });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getUserTasks = async (req: any, res: Response) => {
  try {
    const tasks = await Task.find({ assignedTo: req?.user.id }).populate(
      "project",
      "projectName"
    );
    res.status(200).json({ tasks });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    res.status(200).json({ task });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createAndAssignTask = async (req: any, res: Response) => {
  try {
    const reqData = req.body;
    if (!reqData.projectId.trim() || !reqData.title.trim()) {
      res.status(400).json({ message: "provide required data" });
      return;
    }

    let userData: any = null;
    if (req.user.id) {
      userData = await User.findById(req.user.id);
    }

    console.log("userData", userData);
    if (!userData || userData.userType != "admin") {
      res.status(405).json({ message: "You are not allowed to create Task" });
      return;
    }

    const data: TaskData = {
      project: reqData.projectId,
      title: reqData.title,
      status: "pending",
    };
    if (reqData.userId) {
      data["assignedTo"] = reqData.userId;
    }

    const newTask = await Task.create(data);
    res.status(201).json({ message: "Task created successfully", newTask });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const assignTask = async (req: any, res: Response) => {
  try {
    const reqData = req.body;
    const taskId = req.params.id;
    if (!reqData.userId || !taskId) {
      res.status(400).json({ message: "provide required data" });
      return;
    }

    let userData: any = null;
    if (req.user.id) {
      userData = await User.findById(req.user.id);
    }

    console.log("userData", userData);
    if (!userData || userData.userType != "admin") {
      res.status(405).json({ message: "You are not allowed to create Task" });
      return;
    }
    const task = await Task.findById(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }
    const newTask = await Task.findByIdAndUpdate(
      taskId,
      {
        assignedTo: reqData.userId,
      },
      { new: true }
    );

    res.json({ message: "Task assigned successfully", newTask });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const reqData = req.body;
    const taskId = req.params.id;

    if (!taskId || !reqData.status) {
      res.status(400).json({ message: "Select status" });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        status: reqData.status,
      },
      { new: true }
    );
    const io = getIO();
    io.emit("update-task-status", {
      taskId: taskId,
      status: reqData.status,
    });
    res.json({ message: "Task updated successfully", task });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
