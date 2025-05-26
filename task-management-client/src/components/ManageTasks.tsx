import React, { useEffect, useRef, useState } from "react";
import { Form, Select, Input, Button, message, List } from "antd";
import ApiRequest from "../utils/ApiRequest";
import type { ApiProject } from "../types/project.types";
import type { ApiUser } from "../types/user.types";
import type { ApiTask, ListTask } from "../types/task.types";
import { capitalize } from "../utils/common";
import { toast } from "react-toastify";
const { Option } = Select;

type FormValues = {
  project: string;
  assignedUser?: string | null;
  taskTitle: string;
};

const ManageTasks = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [users, setUsers] = useState<ListTask[]>([]);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState<ListTask | null>(null);

  useEffect(() => {
    fetchProjects();
    fetchUsers();
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const response = await ApiRequest.get(`/admin/allTasks`);
      const data = response.data;
      const taskData = data.map((item: ApiTask) => ({
        id: item._id,
        name: item.title,
        project: {
          id: item.project._id,
          name: item.project.projectName,
        },
        assignedTo: {
          id: item.assignedTo?._id || null,
          name: item.assignedTo
            ? `${item.assignedTo.firstName} ${item.assignedTo.lastName}`
            : "Unassigned",
        },
        status: item.status,
      }));
      console.log("Fetched tasks:", taskData);
      setTasks(taskData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await ApiRequest.get(`/admin/projects`);
      const data = response.data.projects;
      const projectData = data.map((item: ApiProject) => ({
        id: item._id,
        name: item.projectName,
      }));
      setProjects(projectData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await ApiRequest.get(`/admin/users`);
      const data = response.data;
      if (!data || data.length === 0) {
        console.error("No users found");
        return;
      }
      const userData = data.map((item: ApiUser) => ({
        id: item._id,
        name: `${item.firstName} ${item.lastName}`,
        isActive: item.isActive,
      }));
      setUsers(userData);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // Handle form submission
  const onFinish = async (values: FormValues) => {
    try {
      setLoading(true);
      if (editingTask) {
        // Mock API call
        console.log("Form values:", values);

        await ApiRequest.patch(`/admin/assignTask/${editingTask.id}`, {
          userId: values.assignedUser,
        });

        toast("Task updated successfully!");
        form.resetFields();
        setEditingTask(null);
      } else {
        // Mock API call
        console.log("Form values:", values);

        await ApiRequest.post(`/admin/createTask`, {
          projectId: values.project,
          title: values.taskTitle,
          userId: values.assignedUser || null,
        });

        message.success("Task created successfully!");
        form.resetFields();
      }
      fetchAllTasks();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (task: ListTask) => {
    setEditingTask(task);
    form.setFieldsValue({
      project: task.project.id,
      assignedUser: task.assignedTo.id || null,
      taskTitle: task.name,
    });
    form.scrollToField("project");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Task</h2>
      <div className="formContainer">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Project"
            name="project"
            rules={[{ required: true, message: "Please select a project" }]}
          >
            <Select placeholder="Select a project">
              {projects.map((project) => (
                <Option key={project.id} value={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Task Title"
            name="taskTitle"
            rules={[{ required: true, message: "Please enter the task title" }]}
          >
            <Input placeholder="Enter task title or details" />
          </Form.Item>

          <Form.Item
            label={editingTask ? "Assign User" : "Assign User (Optional)"}
            name="assignedUser"
            rules={[
              editingTask
                ? { required: true, message: "Please select target user" }
                : { required: false, message: "Optional" },
            ]}
          >
            <Select
              placeholder="Select a user"
              allowClear
            >
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              variant="solid"
              color={editingTask ? "danger" : "blue"}
              htmlType="submit"
              loading={loading}
              block
            >
              {editingTask ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="tableContainer mt-8">
        <table className="taskTable">
          <caption className="text-lg font-bold mb-4">Task List</caption>
          <thead className="bg-gray-100">
            <tr>
              <th>Task Name</th>
              <th>Project</th>
              <th>Assigned To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: ListTask) => (
              <tr key={task.id}>
                <td>{capitalize(task.name)}</td>
                <td>{capitalize(task.project.name)}</td>
                <td>
                  {task.assignedTo.id === null ? (
                    <Button
                      size="small"
                      color="purple"
                      variant="solid"
                      onClick={() => handleAssign(task)}
                    >
                      Assign
                    </Button>
                  ) : (
                    capitalize(task.assignedTo.name)
                  )}
                </td>
                <td>{capitalize(task.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTasks;
