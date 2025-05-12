import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignin() {
    try {
      if (!email || !password) {
        toast("Please fill all!");
        return;
      }

      const res = await axios.post(`${API_BASE_URL}/auth/signin`, {
        email,
        password,
      });
      if (res.data) {
        const token = res?.data?.token;
        console.log("token", token);
        localStorage.setItem("token",token);
        toast("Signin successfull");
      }
      console.log("res", res);
    } catch (error) {}
  }

  return (
    <div>
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
      <button onClick={handleSignin}>Submit</button>
      <ToastContainer />
    </div>
  );
};

export default Login;
