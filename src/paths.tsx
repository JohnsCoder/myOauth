import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import TodoList from "./pages/todoList";
import api from "./services/api";

const usedPaths = {
  landing: "/",
  login: "/login",
  register: "/register",
  todos: "/todos",
};
function Paths() {
  const loc = useLocation().pathname;

  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams();
    params.append("tokenid", localStorage.getItem("logintoken") || "");
    api.post("/auth/authenticaded", params).then((res) => {
      if (res.data === "succesful authenticated") {
        navigate("/todos");
      } else localStorage.removeItem("logintoken");
    }
    );
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
      {Object.values(usedPaths).includes(loc) ? null : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
}

export default Paths;
