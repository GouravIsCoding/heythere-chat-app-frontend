import { CONFIG } from "@/CONFIG";
import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.withCredentials = true;

export function useGetAuthStatus() {
  const [userId, setUserId] = useState<string>();
  const [authStatus, setAuthStatus] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${CONFIG.BACKEND_URL}/auth/status`);
        setUserId(response.data.userId);
        setAuthStatus(response.data.authStatus);
      } catch (error) {
        console.error("something went wrong");
      }
    })();
  }, []);

  return { userId, authStatus };
}
