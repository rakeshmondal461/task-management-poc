import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import { Button, Card, Space } from "antd";
import "./styles/Signup.css";
import { Link } from "react-router-dom";

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
    <>
      <div className="signupCardContainer">
        <Space direction="vertical" size={16}>
          <Card title="Sign Up" className="signupCard">
            <div>
              <div className="inputContainer">
                <label>First Name</label>
                <input
                  className="customInput"
                  type="text"
                  placeholder="Enter first name"
                  onChange={(e) => setFirstName(e.target.value)}
                  name="firstName"
                />
              </div>

              <div className="inputContainer">
                <label>Last Name</label>
                <input
                  className="customInput"
                  type="text"
                  placeholder="Enter last name"
                  onChange={(e) => setLastName(e.target.value)}
                  name="lastName"
                />
              </div>

              <div className="inputContainer">
                <label>Email</label>
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

              <div className="inputContainer">
                <label>Confirm Password</label>
                <input
                  className="customInput"
                  type="password"
                  placeholder="Enter confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  name="confirmPassword"
                />
              </div>
              <div style={{ padding: "5px" }}>
                <Link to="/login">Click here to login</Link>
              </div>
              <Button onClick={handleSignup} type="primary">
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

export default Signup;
