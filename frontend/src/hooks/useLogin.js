import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { BaseURL } from "../BaseURL";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (identifier, password) => {
    // Changed parameter name to identifier

    setIsLoading(true);
    setError(null);

    const response = await fetch(`http://localhost:4000/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }), // Changed email to identifier
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};