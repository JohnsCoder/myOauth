import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter } from "react-router-dom";
import RegisterProvider from "./contexts/registerContext";

import Paths from "./paths";
import LoginProvider from "./contexts/loginContexts";
import TodosProvider from "./contexts/todosContexts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <RegisterProvider>
        <LoginProvider>
          <TodosProvider>
            <Paths />
          </TodosProvider>
        </LoginProvider>
      </RegisterProvider>
    </BrowserRouter>
  </React.StrictMode>
);
