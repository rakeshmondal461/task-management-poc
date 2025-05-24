import { Request, Response } from "express";
import Task from "../models/taskModel";
import { AnyARecord } from "dns";



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
    const tasks = await Task.find({ assignedTo: req?.user.id });
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

export const assignTask = async (req: any, res: Response) => {
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

    const newTask = await Task.create(data);
    res.json({ message: "Task created successfully", newTask });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const reqData = req.body;
    if (!reqData.taskId || !reqData.status) {
      res.status(400).json({ message: "Select status" });
    }

    const task = await Task.findByIdAndUpdate(reqData.taskId, {
      status: reqData.status,
    });
    res.json({ message: "Task updated successfully", task });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
