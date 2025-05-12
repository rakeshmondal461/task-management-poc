import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  async function handleSignup() {
    try {
      if (!firstName || !lastName || !email || !password) {
        toast("Please fill all!");
        return;
      }

      if (password !== confirmPassword) {
        toast("Password and confirm password do not match!");
        return;
      }
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
      });
      if (res.data) {
        toast("Signup successfull");
      }
      console.log("res", res);
    } catch (error) {}
  }

  return (
    <div>
      <div>
        <label>First name</label>
        <input
          type="text"
          placeholder="Enter first name"
          onChange={(e) => setFirstName(e.target.value)}
          name="firstName"
        />
      </div>

      <div>
        <label>Last name</label>
        <input
          type="text"
          placeholder="Enter first name"
          onChange={(e) => setLastName(e.target.value)}
          name="lastName"
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          name="password"
        />
      </div>

      <div>
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Enter confirm password"
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleSignup}>Submit</button>
      <ToastContainer />
    </div>
  );
};

export default Signup;
