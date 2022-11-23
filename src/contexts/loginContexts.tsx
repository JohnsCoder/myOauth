import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { CookiesContext } from "./cookiesContexts";
import api from "../services/api";

type user = {
  email: string;
  password: string;
};

interface LoginContextInterface {
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: () => void;
  loged: boolean;
}

export const LoginContext = createContext({} as LoginContextInterface);

function LoginProvider({ children }: { children: ReactNode }) {
  const { cookies } = useContext(CookiesContext);

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

  function login() {
    if (Object.values(user).every((e) => e !== ""))
      api
        .post("/auth/login", params)
        .then((res) => {
          cookies.remove();
          cookies.add(res.data);
          navigate("/todos");
          window.location.reload();
        })
        .catch((err) => alert(err.response.data));
    else alert("values can't be empty");
  }

  return (
    <LoginContext.Provider value={{ handleData, login, loged }}>
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
