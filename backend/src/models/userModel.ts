import mongoose from "mongoose";
// Define the User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["admin", "user"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Create the User model from the schema
const User = mongoose.model("User", userSchema);
export default User;
