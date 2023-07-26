import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import cookies from "../services/cookies";

type user = {
  email: string;
  password: string;
};

interface LoginContextInterface {
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: () => void;
}

export const LoginContext = createContext({} as LoginContextInterface);

function LoginProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<user>();

  const navigate = useNavigate();

  function handleData(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((user) => ({
      ...user!,
      [e.target.name]: e.target.value,
    }));
  }

  async function login() {
    if (!user) alert("values can't be empty");

    try {
      const loged = await api.post("/auth/login", user);
      cookies.remove("tokenId");
      cookies.add(loged.data.payload);
      navigate("/homepage");
    } catch (err: any) {
      alert(err.response.data.error.message);
    }
  }

  return (
    <LoginContext.Provider value={{ handleData, login }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
