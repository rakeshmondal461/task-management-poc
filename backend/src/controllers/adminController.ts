import { Request, Response } from "express";

import User from "../models/userModel";
import Task from "../models/taskModel";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ userType: "user" });
    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error?.message });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({})
      .populate("assignedTo", "firstName lastName email")
      .populate("project", "projectName");
    res.status(200).json(tasks);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error?.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const activeUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const users = await User.findByIdAndUpdate(
      userId,
      { isActive: req.body.isActive },
      { new: true }
    );
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};
