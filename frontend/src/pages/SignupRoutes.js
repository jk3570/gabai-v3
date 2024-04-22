import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuthContext();

    const myrole = user && user.role;
    useEffect(() => {
       
        if (user) {
            switch (myrole) {
                case "user":
                    // navigate("/user-landingpage");
                    navigate("/user/home");
                    break;
                case "lawyer":
                    navigate("/lawyer");
                    break;
                case "admin":
                    navigate("/admin");
                    break;
                default:
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
