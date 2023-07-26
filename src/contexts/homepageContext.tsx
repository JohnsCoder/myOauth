import { AxiosRequestConfig } from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import cookies from "../services/cookies";

interface Todosinterface {
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nick: string;
  todoList: object[];
  postTodo: (e: any) => void;
  deleteTodo: (e: any) => void;
  values: string;
  logout: () => void;
}

export const HomepageContext = createContext({} as Todosinterface);

function HomepageProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<string>("");
  const [nick, setNick] = useState<string>("");
  const [todoList, setTodoList] = useState<Object[]>([]);

  const navigate = useNavigate();

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: "Bearer " + cookies.get("tokenId"),
    },
  };

  function logout() {
    cookies.remove("tokenId");
    navigate("/login");
    window.location.reload();
  }

  function handleData(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(e.target.value);
  }

  function getNick() {
    api.get("/user/nick", config).then((res) => {
      setNick(res.data.payload.nickname);
    });
  }

  function getTodo() {
    api.get("/todo", config).then((res) => {
      setTodoList(res.data.payload);
    });
  }
  function postTodo(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      api.post("/todo", { content: values }, config).then(() => getTodo());
      setValues("");
    }
  }

  function deleteTodo(e: number) {
    api.delete(`/todo/${e}`, config).then(() => getTodo());
  }

  useEffect(() => {
    getTodo();
    getNick();
  }, []);

  return (
    <HomepageContext.Provider
      value={{
        handleData,
        nick,
        todoList,
        postTodo,
        deleteTodo,
        values,
        logout,
      }}
    >
      {children}
    </HomepageContext.Provider>
  );
}

export default HomepageProvider;
