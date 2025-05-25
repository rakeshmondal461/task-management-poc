import { useState, useEffect, useMemo } from "react";
import CommonHeader from "../components/CommonHeader";
import "./styles/Dashboard.css";
import ManageProjects from "../components/ManageProjects";
import ManageUsers from "../components/ManageUsers";
import ManageTasks from "../components/ManageTasks";

const Dashboard = () => {
  const [currentComponent, setCurrentComponent] = useState("");

  const rednderView = useMemo(() => {
    if (currentComponent === "projects") {
      return <ManageProjects />;
    } else if (currentComponent === "users") {
      return <ManageUsers />;
    } else if (currentComponent === "tasks") {
      return <ManageTasks />;
    } else {
      return (
        <div className="dashboardContent">
          <h4>Welcome to the Dashboard</h4>
          <p>Here you can manage projects, users, and tasks.</p>
        </div>
      );
    }
  }, [currentComponent]);

  return (
    <>
      <CommonHeader />
      <div>
        <nav>
          <ul className="dashboardLinks">
            <li>
              <a onClick={() => setCurrentComponent("projects")}>
                Manage Projects
              </a>
            </li>
            <li>
              <a onClick={() => setCurrentComponent("users")}>Manage Users</a>
            </li>
            <li>
              <a onClick={() => setCurrentComponent("tasks")}>Manage Tasks</a>
            </li>
          </ul>
        </nav>
        {rednderView}
      </div>
    </>
  );
};

export default Dashboard;
