import "font-awesome/css/font-awesome.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import Paths from "./paths";
import AuthProvider from "./contexts/authContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Paths />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
