import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { LoginContext } from "./contexts/loginContexts";
import { RegisterContext } from "./contexts/registerContext";
import { TodosContext } from "./contexts/todosContexts";
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
  const { loged } = useContext(LoginContext);
  const loc = useLocation().pathname;
  const [authed, setAuthed] = useState(false);
  function authenticate() {
    const params = new URLSearchParams();
    params.append("tokenid", localStorage.getItem("logintoken") || "");
    api.post("/auth/authenticaded", params).then((res) => {
      if (res.data === "succesful authenticated") {
        setAuthed(true);
      } else localStorage.removeItem("logintoken");
    });
  }
  useEffect(() => {
    authenticate();
  }, []);
  return (
    <>
      <Routes>
        <Route path={usedPaths.landing} element={<Landing />} />
        <Route path={usedPaths.register} element={<Register />} />
        <Route path={usedPaths.login} element={<Login />} />
        <Route path={usedPaths.todos} element={<TodoList />} />
      </Routes>
      {Object.values(usedPaths).includes(loc) ? null : (
        <Navigate to={usedPaths.landing} replace={true} />
      )}

      {authed && loc !== "/todos" ? (
        <Navigate to={usedPaths.todos} replace={true} />
      ) : null}
    </>
  );
}

export default Paths;
