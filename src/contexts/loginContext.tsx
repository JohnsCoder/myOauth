import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import cookies from "../services/cookies";
import { LoadingContext } from "./components/loading.context";

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
  const { switchDisplay } = useContext(LoadingContext);
  const navigate = useNavigate();

  function handleData(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((user) => ({
      ...user!,
      [e.target.name]: e.target.value,
    }));
  }

  async function login() {
    if (!user) {
      alert("values can't be empty");
      return;
    }

    switchDisplay();
    try {
      const loged = await api.post("/auth/login", user);
      cookies.remove("tokenId");
      cookies.add(loged.data.data);
      navigate("/homepage");
    } catch (err: any) {
      switchDisplay();
      
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
