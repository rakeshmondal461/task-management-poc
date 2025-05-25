import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  userType: "user" | "admin";
};

const getUsers = (req: Request, res: Response) => {
  // Your logic to retrieve users from a database or service
  res.send("Retrieving all users");
};

export const getUserById = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const user: UserType | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" }); // Remove 'return'
      return;
    }
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const signupUser = async (req: any, res: Response) => {
  try {
    const newUser = req.body;
    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.email ||
      !newUser.password
    ) {
      res.status(400).json({ message: "Fill all required fields" });
      return;
    }

    const hashed = await bcrypt.hash(newUser.password, 10);
    const data = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: hashed,
      userType: "user",
    };

    const newuser = await User.create(data);
    res.json({ message: "User created successfully", newuser });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const signInUser = async (req: any, res: Response) => {
  try {
    const data = req.body;
    if (!data.email || !data.password) {
      res.status(400).json({ message: "Fill all required fields" });
      return;
    }

    const existUser: UserType | any = await User.findOne({ email: data.email });
    if (!existUser) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const isValidPassword = await bcrypt.compare(
      data.password,
      existUser.password
    );
    if (!isValidPassword) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = JWT.sign(
      {
        id: existUser._id,
        email: existUser.email,
        userType: existUser.userType,
      },
      process.env.JWT_SECRET as string
    );

    res.json({
      message: "Login successfully",
      userType: existUser.userType,
      token
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
