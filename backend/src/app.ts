import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./dbConfig";
import adminRoutes from "./routes/adminRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import { createServer } from 'node:http';
import { initSocket } from "./utils/socket";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const httpServer = createServer(app);

app.use(express.json());
app.use(cors());

// Use the router for the /about path
app.use("/admin", adminRoutes);
app.use("/userRoutes", userRoutes);
app.use("/auth", authRoutes);

// Connect to the database

initSocket(httpServer)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
