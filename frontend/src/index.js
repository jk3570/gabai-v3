import React from "react";
import "animate.css";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

const GoogleClientID =
  "258276610317-7pd1hgf46lutdkmlg0o18ha6h8om9fa9.apps.googleusercontent.com";
console.log("GoogleClientID:", GoogleClientID);

root.render(
  <GoogleOAuthProvider clientId={GoogleClientID}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </GoogleOAuthProvider>
);
