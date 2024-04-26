import React from "react";
import "animate.css";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

const ClID =
  "955795549208-pende5iditbs3lalomumqjo50kbhi7g2.apps.googleusercontent.com";

root.render(
  <AuthContextProvider>
    <GoogleOAuthProvider clientId={ClID}>
      <App />
    </GoogleOAuthProvider>
  </AuthContextProvider>
);