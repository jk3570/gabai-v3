import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/App.css";
import "animate.css";

//AuthContext provider
import { useAuthContext } from "./hooks/useAuthContext";

//Navbars
import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import Sidebar from "./components/admin/Sidebar.js";

//Components routes
import Footer from "./components/Footer";
import Terms from "./components/Terms";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SignupAdminAndLawyer from "./components/SignupAdminAndLawyer";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";

//Landing route
import LandingPage from "./pages/LandingPage";

//Search routes
import SearchResults from "./pages/search/SearchResults";
import Search from "./pages/search/Search";

//Admin routes
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserTable from "./pages/admin/UserTable";
import CasesList from "./pages/admin/CasesList";
import FeedbackList from "./pages/admin/FeedbackList";

//Lawyer routes
import LawyerVideoCon from "./pages/lawyer/LawyerVideoCon";

const App = () => {
  const { user, dispatch } = useAuthContext();

  return ( 
    <Router>

        {user ? <Navbar2/> : null}
        {user ? null : <Navbar />}
        {user ? <Sidebar /> : null}

          <Routes>
            {/* Landing route */}
            <Route path="/" element={<LandingPage/>} />

                {/* Search routes */}
                <Route path="/search" element={<Search />} />
                <Route path="/search/result" element={<SearchResults />} />

                {/* Components routes */}
                {user ? null : <Route path="/login" element={<Login />} />}
                {user ? null : <Route path="/signup" element={<Signup />} />}
                {user ? <Route path="/profile" element={<Profile />} /> : null}
                <Route path="/chat" element={<Chat />} />
                <Route path="/terms" element={<Terms />} />

                {/* Admin routes */}  
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/signup-admin-lawyer" element={<SignupAdminAndLawyer />} />
                <Route path="/admin/user-table" element={<UserTable />} />
                <Route path="/admin/cases" element={<CasesList />} />
                <Route path="/admin/feedbacks" element={<FeedbackList />} />

                {/* Lawyer route */}
                <Route path="/lawyer" element={<LawyerVideoCon />} />

                {/* 404 route */}
                {/* <Route path="*" element={<PageNotFound />} /> */}

            </Routes>
      
      {user ? null : <Footer />}

    </Router>
  );
};

export default App;
