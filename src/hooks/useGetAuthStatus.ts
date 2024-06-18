import { CONFIG } from "@/CONFIG";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

export function useGetAuthStatus() {
  const [userId, setUserId] = useState<string | null>(null);
  const [authStatus, setAuthStatus] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${CONFIG.BACKEND_URL}/auth/status`);
        setUserId(response.data.userId);
        setAuthStatus(response.data.authStatus);
      } catch (error) {
        if (error instanceof AxiosError)
          setAuthStatus(error.response?.data.authStatus);
      }
    })();
  }, []);

  return { userId, authStatus };
}
