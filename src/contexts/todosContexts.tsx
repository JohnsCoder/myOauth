import { createContext, ReactNode, useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import api from "../services/api";

interface Todosinterface {
  handleData: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nick: string;
  todoList: object[];
  postTodo: (e: any) => void;
  deleteTodo: (e: any) => void;
  values: string;
  isAuthed: string;
  logout: () => void;
  isLogout: boolean;
}

export const TodosContext = createContext({} as Todosinterface);

function TodosProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<string>("");
  const [nick, setNick] = useState<string>("");
  const [todoList, setTodoList] = useState<Object[]>([]);
  const [isAuthed, setIsAuthed] = useState("none");
  const [isLogout, setIsLogout] = useState(false);

  const params = new URLSearchParams();
  params.append("tokenid", localStorage.getItem("logintoken") || "");
  useEffect(() => {
    api.post("/auth/authenticaded", params).then((res) => {
      if (res.data === "succesful authenticated") null;
      else {
        setIsAuthed("block");
        localStorage.removeItem("logintoken");
      }
    });
  }, []);

  function handleData(e: React.ChangeEvent<HTMLInputElement>) {
    setValues(e.target.value);
  }

  function getNick() {
    const params = new URLSearchParams();
    params.append("tokenid", localStorage.getItem("logintoken") || "");

    api.post("/auth/nick", params).then((res) => setNick(res.data[0].nickname));
  }

  function getTodo() {
    const params = new URLSearchParams();
    params.append("tokenid", localStorage.getItem("logintoken") || "");

    api.post("/todos/get-todo", params).then((res) => setTodoList(res.data));
  }
  function postTodo(e: any) {
    const params = new URLSearchParams();
    params.append("tokenid", localStorage.getItem("logintoken") || "");
    params.append("todo", values);
    if (e.keyCode === 13) {
      api.post("/todos/send-todo", params).then(() => getTodo());
      setValues("");
    }
  }

  function deleteTodo(e: any) {
    const params = new URLSearchParams();
    params.append("tokenid", localStorage.getItem("logintoken") || "");
    api.delete(`/todos/delete-todo/${e}`).then(() => getTodo());
  }

  function logout() {
    localStorage.removeItem("logintoken");
    setIsLogout(true);
    window.location.reload();
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
        isAuthed,
        logout,
        isLogout,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}

export default TodosProvider;
