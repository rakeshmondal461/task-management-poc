import { Button } from "antd";
import "./CommonHeader.css";

const CommonHeader = () => {
  function logout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }
  return (
    <>
      <div className="headerContainer">
        <div className="headerTitle">
          <img src="/task.svg" alt="Logo" className="headerLogo" />
          <div className="headerTitleText">
            <p>Task Management System</p>
          </div>
        </div>
        <div className="headerButtonContainer">
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    </>
  );
};

export default CommonHeader;
