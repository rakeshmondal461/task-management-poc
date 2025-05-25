import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL } from "../utils/constants";
import { Button, Card, Space } from "antd";
import Header from "../components/Header";
import "./styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

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
        const { token, userType } = res?.data;
        console.log("token", token);
        localStorage.setItem("token", token);
        toast("Signin successfull");
        if (userType === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
      console.log("res", res);
    } catch (error) {
      console.error("Error during sign-in:", error);
      if (axios.isAxiosError(error) && error.response) {
        // Handle specific error response from the server
        toast(error.response.data.message || "Sign-in failed");
      }
    }
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
              <div style={{ padding: "5px" }}>
                <Link to="/signup">Click here to sign up</Link>
              </div>
              <Button onClick={handleSignin} type="primary">
                Submit
              </Button>
              <ToastContainer />
            </div>
          </Card>
        </Space>
      </div>
    </>
  );
};

export default Login;
