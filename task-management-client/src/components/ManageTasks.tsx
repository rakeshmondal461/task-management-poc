import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button, message, List } from "antd";
import ApiRequest from "../utils/ApiRequest";
import type { ApiProject } from "../types/project.types";
import type { ApiUser } from "../types/user.types";
import type { ApiTask, ListTask } from "../types/task.types";
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
    setLoading(true);
    console.log("Submitting form with values:", values);
    try {
      // Mock API call
      console.log("Form values:", values);

      await ApiRequest.post(`/admin/createTask`, {
        projectId: values.project,
        title: values.taskTitle,
        userId: values.assignedUser || null,
      });

      message.success("Task created successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Failed to create task.");
    } finally {
      setLoading(false);
    }
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

          <Form.Item label="Assign User (Optional)" name="assignedUser">
            <Select placeholder="Select a user" allowClear>
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Submit
            </Button>
          </Form.Item>
        </Form>

        <List
          header={<div className="font-semibold">Tasks</div>}
          bordered
          dataSource={tasks}
          renderItem={(task: ListTask) => {
            return (
              <>
                <List.Item>
                  {task.name} 🚀 {task.project.name} 🚀
                  {task.assignedTo.name}
                  <span className="ml-2 text-sm text-gray-500">
                    {" "}{task.status}
                  </span>
                </List.Item>
              </>
            );
          }}
        />
      </div>
    </div>
  );
};

export default ManageTasks;
