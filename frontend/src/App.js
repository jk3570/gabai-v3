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
import UserList from "./pages/admin/UserList";
import CasesList from "./pages/admin/CasesList";
import FeedbacksList from "./pages/admin/FeedbackList";

//Lawyer routes
import LawyerVideoCon from "./pages/lawyer/LawyerVideoCon";

const App = () => {
  const { user, dispatch } = useAuthContext();

  return (
    <Router>
      {/* {user ? null : <Navbar />}
      {user ? <Navbar2 /> : null} */}
      <Sidebar />
      <Navbar2 />
      
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
        {/* {user ? <Route path="/admin" element={<AdminDashboard />} /> : <Route path="*" element={<PageNotFound />} />} */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/cases" element={<CasesList />} />
        <Route path="/admin/feedbacks" element={<FeedbacksList />} />

        {/* Lawyer route */}
        <Route path="/lawyer" element={<LawyerVideoCon />} />

        {/* 404 route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {user ? null : <Footer />}
    </Router>
  );
};

export default App;
