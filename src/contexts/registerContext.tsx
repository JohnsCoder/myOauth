import { Children, createContext, ReactNode, useState } from "react";
import api from "../services/api";

interface RegisterContextInterface {
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: () => void;
  registered: boolean;
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

  const [registered, setRegistered] = useState<boolean>(false);

  function handleData(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  }
  function register(): void {
    const params = new URLSearchParams();
    params.append("nickname", user.nickname);
    params.append("email", user.email);
    params.append("number", user.phonenumber);
    params.append("password", user.password);

    if (
      user.nickname === "" ||
      user.email === "" ||
      user.phonenumber === "" ||
      user.password === ""
    )
      alert("values can't be empty");
    else
      api
        .post("/auth/register", params)
        .then((res) => {
          setRegistered((registered) => !registered);
        })
        .catch((err) => alert(err.response.data));
  }
  return (
    <RegisterContext.Provider value={{ handleData, register, registered }}>
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterProvider;
