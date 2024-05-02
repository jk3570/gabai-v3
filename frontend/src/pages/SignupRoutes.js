import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuthContext();

    const myrole = user && user.role;
    useEffect(() => {
       
        if (user) {
            switch (myrole) {
                case "user":
                    toast.success('Login successful!', { duration: 5000 });
                    navigate("/user");
                    break;
                case "lawyer":
                    toast.success('Login successful!', { duration: 5000 });
                    navigate("/lawyer");
                    break;
                case "admin":
                    toast.success('Login successful!', { duration: 5000 });
                    navigate("/admin");
                    break;
                default:
                    toast.error('Login error!');
                    navigate("/");
                    break;
            }
        } else  {
            navigate("/")
        }
        
    }, [myrole, navigate]);

    return null; // Or you can render a loading spinner or any UI while the redirection happens
};

export default Home;
