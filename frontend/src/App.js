import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/App.css";
import "animate.css";

//Components routes
import Navbar from "./components/Navbar";
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
import Lawyer from "./pages/lawyer/lawyer";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Landing route */}
        <Route path="/" element={<LandingPage />} />

        {/* Search routes */}
        <Route path="/search" element={<Search />} />
        <Route path="/search/result" element={<SearchResults />} />

        {/* Components routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/terms" element={<Terms />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/cases" element={<CasesList />} />
        <Route path="/admin/feedbacks" element={<FeedbacksList />} />

        {/* Lawyer route */}
        <Route path="/lawyer" elements={<Lawyer />} />

        {/* 404 route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
