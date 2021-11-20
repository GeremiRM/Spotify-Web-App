import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const URL = "http://localhost:3001";

const useAuth = (code: string) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  // const router = useRouter();

  // get access token on login
  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await axios.post(`${URL}/login`, {
          code,
        });
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);

        // remove the code from the URL
        if (typeof window !== "undefined") {
          window.history.replaceState(null, "", "/");
        }
      } catch (error) {
        console.error(error + "hola!");

        if (typeof window !== "undefined") {
          // if error, go back to home
          window.location.href = "/";
        }
      }
    };
    if (code) getToken();
  }, [code]);

  return accessToken;
};

export default useAuth;
