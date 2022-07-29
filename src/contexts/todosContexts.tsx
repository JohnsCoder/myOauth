import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Todosinterface {
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nick: string;
  todoList: object[];
  postTodo: (e: any) => void;
  deleteTodo: (e: any) => void;
  values: string;
  logout: () => void;
}

export const TodosContext = createContext({} as Todosinterface);

function TodosProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<string>("");
  const [nick, setNick] = useState<string>("");
  const [todoList, setTodoList] = useState<Object[]>([]);

  const navigate = useNavigate();

  const params = new URLSearchParams();
  params.append("tokenid", localStorage.getItem("logintoken") || "");

  useEffect(() => {
    api.post("/auth/authenticaded", params).then((res) => {
      if (res.data === "succesful authenticated") null;
      else {
        localStorage.removeItem("logintoken");
        navigate("/");
      }
    });
  }, []);

  function logout() {
    localStorage.removeItem("logintoken");
    navigate("/login");
    window.location.reload();
  }
  
  function handleData(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(e.target.value);
  }

  function getNick() {
    api.post("/auth/nick", params).then((res) => setNick(res.data[0].nickname));
  }

  function getTodo() {
    api.post("/todos/get-todo", params).then((res) => setTodoList(res.data));
  }
  function postTodo(e: React.KeyboardEvent<HTMLInputElement>) {
    params.append("todo", values);
    if (e.key === "Enter") {
      api.post("/todos/send-todo", params).then(() => getTodo());
      setValues("");
    }
  }

  function deleteTodo(e: number) {
    api.delete(`/todos/delete-todo/${e}`).then(() => getTodo());
  }


  useEffect(() => {
    getTodo();
    getNick();
  }, []);

  return (
    <TodosContext.Provider
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
    </TodosContext.Provider>
  );
}

export default TodosProvider;
