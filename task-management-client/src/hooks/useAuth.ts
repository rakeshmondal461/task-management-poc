import { useState, useEffect } from "react";
import ApiRequest from "../utils/ApiRequest";

export const useAuth = () => {
  const [user, setUser] = useState<{
    userType: "admin" | "user";
    [key: string]: any;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token: string | null = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await ApiRequest.get(`/user/profile`);
        setUser(response.data);
      } catch (err: unknown) {
        setError((err as Error).message);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  return { user, loading, error };
};
