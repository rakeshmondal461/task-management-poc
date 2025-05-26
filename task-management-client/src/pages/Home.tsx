import { useEffect, useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { capitalize } from "../utils/common";
import type { ApiTask, ListTask } from "../types/task.types";
import ApiRequest from "../utils/ApiRequest";
import { Button, Dropdown, Space, type MenuProps } from "antd";
import {
  CheckCircleOutlined,
  DownOutlined,
  HourglassOutlined,
  PauseCircleOutlined,
  SmileOutlined,
  StopOutlined,
} from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    key: "in progress",
    label: (
      <span
        style={{
          display: "inline-block",
          width: "100%",
          textAlign: "left",
          padding: "4px",
          cursor: "pointer",
        }}
      >
        In Progress
      </span>
    ),
    icon: <HourglassOutlined />,
  },
  {
    key: "completed",
    label: (
      <span
        style={{
          display: "inline-block",
          width: "100%",
          textAlign: "left",
          padding: "4px",
          cursor: "pointer",
        }}
      >
        Completed
      </span>
    ),
    icon: <CheckCircleOutlined />,
    disabled: false,
  },
  {
    key: "rejected",
    label: (
      <span
        style={{
          display: "inline-block",
          width: "100%",
          textAlign: "left",
          padding: "4px",
          cursor: "pointer",
        }}
      >
        Rejected
      </span>
    ),
    icon: <StopOutlined />,
    disabled: false,
  },
  {
    key: "pending",
    label: (
      <span
        style={{
          display: "inline-block",
          width: "100%",
          textAlign: "left",
          padding: "4px",
          cursor: "pointer",
        }}
      >
        Pending
      </span>
    ),
    disabled: false,
    icon: <PauseCircleOutlined />,
  },
];

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState<ListTask | null>(null);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const response = await ApiRequest.get(`/user/mytasks`);
      const data = response.data.tasks;
      const taskData = data.map((item: ApiTask) => ({
        id: item._id,
        name: item.title,
        project: {
          id: item.project._id,
          name: item.project.projectName,
        },
        status: item.status,
      }));
      console.log("Fetched tasks:", taskData);
      setTasks(taskData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };


    const handleStatusChange = async (taskId: string, status: string) => {
        try {
        await ApiRequest.patch(`/user/task/${taskId}`, { status });
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
            task.id === taskId ? { ...task, status } : task
            )
        );
        } catch (error) {
        console.error("Error updating task status:", error);
        }
    };

  return (
    <>
      <CommonHeader />
      <div>
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Assigned Tasks
          </h2>
          <div className="tableContainer mt-8">
            <table className="taskTable">
              <thead className="bg-gray-100">
                <tr>
                  <th>Task Name</th>
                  <th>Project</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task: ListTask) => (
                  <tr key={task.id}>
                    <td>{capitalize(task.name)}</td>
                    <td>{capitalize(task.project.name)}</td>
                    <td>{capitalize(task.status)}</td>
                    <td>
                      <Space wrap>
                        <Dropdown
                          menu={{
                            items,
                            onClick: (e) => {
                              console.log("Selected status:", e.key, task.id);
                             // handleStatusChange(task.id, e.key);
                              // Here you can handle the status change
                              // For example, you can call an API to update the task status
                              handleStatusChange(task.id, e.key);
                            },
                          }}
                          trigger={["click"]}
                        >
                          <Button>
                            Change Status <DownOutlined />
                          </Button>
                        </Dropdown>
                      </Space>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
