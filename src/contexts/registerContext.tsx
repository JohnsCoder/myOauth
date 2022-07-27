import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface RegisterContextInterface {
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: () => void;
}

type user = {
  nickname: string;
  phonenumber: string;
  email: string;
  password: string;
};

export const RegisterContext = createContext({} as RegisterContextInterface);

function RegisterProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<user>({
    nickname: "",
    phonenumber: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const params = new URLSearchParams();
  params.append("nickname", user.nickname);
  params.append("email", user.email);
  params.append("number", user.phonenumber);
  params.append("password", user.password);

  function handleData(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }

  function register() {
    if (Object.values(user).every((e) => e !== ""))
      api
        .post("/auth/register", params)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => alert(err.response.data));
    else alert("values can't be empty");
  }
  return (
    <RegisterContext.Provider value={{ handleData, register }}>
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterProvider;
