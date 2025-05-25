import { Button, Form, Input, List } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./ManageProjects.css";
import ApiRequest from "../utils/ApiRequest";
import type { ApiProject, ListProject } from "../types/project.types";

const ManageProjects = () => {
  const [form] = Form.useForm();
  const [projects, setProjects] = useState<ListProject[]>([]);
  const [editingProject, setEditingProject] = useState(null);

  // Fetch projects from GET API
  useEffect(() => {
    fetchProjects();
  }, []);

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

  const onFinish = async (values: any) => {
    console.log("Form values:", values, editingProject);
    try {
      if (editingProject) {
        await ApiRequest.put(`/admin/updateProject/${editingProject.id}`, {
          projectName: values.projectName,
        });

        toast("Project updated successfully");
        setProjects(
          projects.map((project) =>
            project.id === editingProject.id
              ? { ...project, name: values.projectName }
              : project
          )
        );
        setEditingProject(null);
        form.resetFields();
      } else {
        // Mock POST API call for creating new project
        const response = await ApiRequest.post(`/admin/addProject`, {
          projectName: values.projectName,
        });
        console.log("New project response:", response);
        const newProject = response.data.newProject;
        setProjects([
          ...projects,
          { id: newProject._id, name: values.projectName },
        ]);
        toast("Project created successfully");
        form.resetFields();
      }
    } catch (error) {
      toast("Operation failed");
      console.error("Operation error:", error);
    }
  };

  const handleEdit = (project: ListProject) => {
    setEditingProject(project);
    form.setFieldsValue({ projectName: project.name });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Project Management</h2>
      <div className="formContainer">
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="mb-8"
        >
          <Form.Item
            name="projectName"
            label="Project Name"
            rules={[{ required: true, message: "Please enter a project name" }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              color={editingProject ? "danger" : "primary"}
              htmlType="submit"
              className="w-full"
            >
              {editingProject ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
        <List
          header={<div className="font-semibold">Projects</div>}
          bordered
          dataSource={projects}
          renderItem={(project: ListProject) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => handleEdit(project)}>
                  Edit
                </Button>,
              ]}
            >
              {project.name}
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ManageProjects;
