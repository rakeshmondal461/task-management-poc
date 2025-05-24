import Project from "../models/projectModel";
import { Request, Response } from "express";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const project = await Project.findById(userId);
    res.status(200).json({ project });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const reqData = req.body;
    if (!reqData.projectName) {
      res.status(400).json({ message: "Fill provide project name" });
    }

    const data = {
      projectName: reqData.projectName,
      isActive: true,
    };

    const newProject = await Project.create(data);
    res.json({ message: "Project created successfully", newProject });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const reqData = req.body;
    const projectId = req.params.id;

    if (!reqData.projectName) {
      res.status(400).json({ message: "Fill provide project name" });
    }

    const data = {
      firstName: reqData.projectName,
      isActive: true,
    };

    const updatedProject = await Project.findByIdAndUpdate(projectId, data, {
      new: true,
    });
    res.json({ message: "Project updated successfully", updatedProject });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


