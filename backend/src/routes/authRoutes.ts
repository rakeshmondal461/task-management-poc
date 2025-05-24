import express from "express";
const router = express.Router();
import { signInUser, signupUser } from "../controllers/userController";

router.post("/signup", signupUser);
router.post("/signin", signInUser);

export default router;
