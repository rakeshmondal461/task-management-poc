import React, { useState } from "react";
import { Form, Select, Input, Button, message } from "antd";
const { Option } = Select;

const ManageTasks = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Mock data for projects and users
  const projects = [
    { id: 1, name: "Project Alpha" },
    { id: 2, name: "Project Beta" },
    { id: 3, name: "Project Gamma" },
  ];

  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
  ];

  // Handle form submission
  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Mock API call
      console.log("Form values:", values);
      // Replace with your actual API call
      await fetch("https://api.example.com/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: values.project,
          title: values.taskTitle,
          assignedUser: values.assignedUser || null,
        }),
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
      </div>
    </div>
  );
};

export default ManageTasks;
