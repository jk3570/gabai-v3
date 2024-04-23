import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useUserData from "../../hooks/useUserData"; // Import the useUserData hook
import { BaseURL } from "../../BaseURL";

const ResetPassword = ({ userData }) => {
  const { id, token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userEmail, setUserEmail] = useState("");

  const input =
    "flex h-10 w-full rounded-md border border-input bg-bkg px-3 py-2 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const button =
    "flex h-10 px-3 py-2 bg-azure text-white rounded-md justify-center items-center w-full text-sm";

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get(`${BaseURL}/user/${id}`);
        setUserEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    if (id) {
      fetchUserEmail();
    }
  }, [id]);

  console.log("ID:", id, "Email", userEmail);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPassword = event.target.newPassword.value;

    try {
      await axios.put(`${BaseURL}/user/update-password/${id}`, {
        newPassword,
      });
      alert("Password updated successfully");
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password");
    }
  };

  const isDisabled = () => (newPassword && confirmPassword ? false : true);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex flex-col w-[80vw]">
        <h1>Reset your password: {userEmail}</h1>
        <label htmlFor="newPassword">Type new Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={input}
        />
        <label htmlFor="confirmPassword">Confirm new Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={input}
        />
        <button type="submit" disabled={isDisabled()} className={button}>
          Reset
        </button>
      </form>
    </div>
  );
};

const PasswordResetContainer = () => {
  const { userData } = useUserData(); // Use the useUserData hook

  return <ResetPassword userData={userData} />;
};

export default ResetPassword;