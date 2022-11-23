import { AxiosResponse } from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

type user = {
  email: string;
  password: string;
};

type cookies = {
  add: (value: AxiosResponse) => void;
  remove: () => void;
  get: () => string;
};

interface LoginContextInterface {
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: () => void;
  loged: boolean;
  cookies: cookies;
}

export const LoginContext = createContext({} as LoginContextInterface);

function LoginProvider({ children }: { children: ReactNode }) {
  const [loged, setLoged] = useState(false);
  const [user, setUser] = useState<user>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const params = new URLSearchParams();
  params.append("email", user.email);
  params.append("password", user.password);

  function handleData(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((user) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  }

  const cookies: cookies = {
    add(value) {
      document.cookie = `loginToken=${value}; expires=${new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      )}; place="/"; SameSite=strict; Secure";`;
    },
    remove() {
      document.cookie = `loginToken=""; expires=${Date()}`;
    },
    get() {
      return document.cookie.split('=')[1]

    },
  };

  function login() {
    if (Object.values(user).every((e) => e !== ""))
      api
        .post("/auth/login", params)
        .then((res) => {
          localStorage.removeItem("logintoken");
          localStorage.setItem("logintoken", res.data);
          navigate("/todos");
          window.location.reload();
        })
        .catch((err) => alert(err.response.data));
    else alert("values can't be empty");
  }

  return (
    <LoginContext.Provider value={{ handleData, login, loged, cookies }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
