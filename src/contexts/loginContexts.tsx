import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

interface LoginContextInterface {
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: () => void;
  loged: boolean;
}
type user = {
  email: string;
  password: string;
};

export const LoginContext = createContext({} as LoginContextInterface);

function LoginProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<user>({
    email: "",
    password: "",
  });
  const [loged, setLoged] = useState(false);

  useEffect(() => {}, []);

  function handleData(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  }

  function login() {
    const params = new URLSearchParams();
    params.append("email", user.email);
    params.append("password", user.password);
    if (user.email === "" || user.password === "")
      alert("values can't be empty");
    else
      api
        .post("/auth/login", params)
        .then((res) => {
          setLoged((loged) => !loged);
          localStorage.setItem("logintoken", res.data);
    window.location.reload()

        })
        .catch((err) => alert(err.response.data));
  }

  return (
    <LoginContext.Provider value={{ handleData, login, loged }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
