import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./dbConfig";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(cors());

// Use the router for the /about path
app.use("/admin", adminRoutes);
app.use("/userRoutes", userRoutes);
app.use("/auth", authRoutes);

// Connect to the database

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
