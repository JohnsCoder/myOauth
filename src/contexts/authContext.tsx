import { AxiosRequestConfig } from "axios";
import { createContext, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import cookies from "../services/cookies";

interface AuthInterface {}

export const AuthContext = createContext({} as AuthInterface);

function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: "Bearer " + cookies.get("tokenId"),
    },
  };
  const location = useLocation().pathname;

  useEffect(() => {
    const auth = api.get("/auth", config);

    auth
      .then((e) => {
        if (location !== "/homepage") {
          navigate("/homepage");
          navigate(0);
        }
      })
      .catch((e) => {
        if (location === "/homepage") {
          navigate("/");
          navigate(0);
        }
      });
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
