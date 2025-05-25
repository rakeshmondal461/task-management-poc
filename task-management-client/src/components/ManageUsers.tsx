import { Button, List } from "antd";
import React, { useEffect } from "react";
import ApiRequest from "../utils/ApiRequest";
import type { ApiUser, ListUser } from "../types/user.types";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = React.useState<ListUser[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

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

  async function handleActiveDeactive(user: ListUser) {
    const updated = await ApiRequest.patch(`/admin/active/${user.id}`, {
      isActive: !user.isActive,
    });
    toast("User updated successfully");

    setUsers(
      users.map((item: ListUser) => {
        return item.id === user.id
          ? { ...item, isActive: updated.data.isActive }
          : item;
      })
    );
  }
  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">User Management</h2>

        <div className="formContainer">
          <List
            header={<div className="font-semibold">Users</div>}
            bordered
            dataSource={users}
            renderItem={(user: ListUser) => (
              <List.Item
                actions={[
                  <Button
                    type="link"
                    onClick={() => handleActiveDeactive(user)}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
                  </Button>,
                ]}
              >
                {user.name}
              </List.Item>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
