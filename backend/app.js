const express = require("express");
require("dotenv").config();
const connectDB = require("./dbConfig");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
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
