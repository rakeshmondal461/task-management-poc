import { useState, useEffect } from "react";
import ApiRequest from "../utils/ApiRequest";
import type { storeData } from "../types/storeDataTypes";



export const useAuth = () => {
  const [user, setUser] = useState<{
    userType: "admin" | "user";
    [key: string]: any;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storeData: storeData = JSON.parse(
        localStorage.getItem("user")!
      );
      if (!storeData || !storeData.token) {
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
