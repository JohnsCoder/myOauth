import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomepageProvider from "./contexts/homepageContext";
import LoginProvider from "./contexts/loginContext";
import RegisterProvider from "./contexts/registerContext";
import Homepage from "./pages/homepage";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import EditorProvider from "./contexts/components/editor.context";
import TodoProvider from "./contexts/components/todo.context";

function Paths() {
  const routes = (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/register"
        element={
          <RegisterProvider>
            <Register />
          </RegisterProvider>
        }
      />
      <Route
        path="/login"
        element={
          <LoginProvider>
            <Login />
          </LoginProvider>
        }
      />
      <Route
        path="/homepage"
        element={
          <TodoProvider>
            <EditorProvider>
              <HomepageProvider>
                <Homepage />
              </HomepageProvider>
            </EditorProvider>
          </TodoProvider>
        }
      />
    </Routes>
  );

  const paths = routes.props.children.map(
    (child: JSX.Element) => child.props.path
  );
  const location = useLocation().pathname;

  const navigate = useNavigate();
  useEffect(() => {
    !paths.includes(location) && navigate("/");
  }, []);

  return routes;
}

export default Paths;
