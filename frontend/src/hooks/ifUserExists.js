import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { BaseURL } from "../BaseURL";

export const useCheckIfUserExists = () => {
  const [errorgoogle, setErrorgoogle] = useState(null);
  const [isLoadinggoogle, setIsLoadinggoogle] = useState(null);
  const { dispatch } = useAuthContext();

  const loginwithgoogle = async (gEmail) => {
    setIsLoadinggoogle(true);
    setErrorgoogle(null);

    const response = await fetch(`${BaseURL}/user/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gEmail }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoadinggoogle(false);
      setErrorgoogle("Email doesn't exist");
    }
    if (response.ok) {
      dispatch({ type: "LOGIN", payload: json });

      setIsLoadinggoogle(false);
    }
  };

  return { loginwithgoogle, isLoadinggoogle, errorgoogle };
};