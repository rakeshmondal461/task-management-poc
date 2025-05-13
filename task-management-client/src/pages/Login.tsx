import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "../utils/constants";
import { Button, Card, Space } from "antd";
import Header from "../components/Header";
import "./styles/Login.css";
import { Link } from "react-router-dom";

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
        localStorage.setItem("token", token);
        toast("Signin successfull");
      }
      console.log("res", res);
    } catch (error) {}
  }

  return (
    <>
      <Header />
      <div className="loginCardContainer">
        <Space direction="vertical" size={16}>
          <Card title="Login" className="loginCard">
            <div>
              <div className="inputContainer">
                <label>Email:</label>
                <input
                  className="customInput"
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                />
              </div>

              <div className="inputContainer">
                <label>Password</label>
                <input
                  className="customInput"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                />
              </div>
              <div style={{padding:'5px'}}>
                <Link to="/signup">Click here to sign up</Link>
              </div>
              <Button onClick={handleSignin} type="primary">Submit</Button>
              <ToastContainer />
            </div>
          </Card>
        </Space>
      </div>
    </>
  );
};

export default Login;
