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
  const [user, setUser] = useState<user>();

  const navigate = useNavigate();

  function handleData(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((user) => ({
      ...user!,
      [e.target.name]: e.target.value,
    }));
  }

  async function register() {
    if (!user) alert("values can't be empty");

    try {
      await api.post("/auth/register", user);
      navigate("/login");
    } catch (err: any) {
      alert(err.response.data.error.message);
    }
  }
  return (
    <RegisterContext.Provider value={{ handleData, register }}>
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterProvider;
