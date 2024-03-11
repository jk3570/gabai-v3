import React from "react";
import "animate.css";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { AuthContextProvider } from './contexts/AuthContext'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
);