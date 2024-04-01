import React from "react";
import "animate.css";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

const GoogleClientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log("GoogleClientID:", GoogleClientID);

root.render(
  <GoogleOAuthProvider clientId={GoogleClientID}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </GoogleOAuthProvider>
);
