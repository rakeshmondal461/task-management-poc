import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: "user" | "admin";
  createdAt: NativeDate;
};

const getUsers = (req: Request, res: Response) => {
  // Your logic to retrieve users from a database or service
  res.send("Retrieving all users");
};

export const getUserById = async (req: any, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
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
    }

    const existUser:UserType|any = await User.findOne({ email: data.email });
    if (!existUser) res.status(400).json({ message: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(
      data.password,
      existUser.password
    );
    if (!isValidPassword)
      res.status(400).json({ message: "Invalid credentials" });

    const token = JWT.sign(
      {
        id: existUser._id,
        email: existUser.email,
        userType: existUser.existUser,
      },
      process.env.JWT_SECRET as string,
    );

    res.json({ message: "Login successfully", token });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
