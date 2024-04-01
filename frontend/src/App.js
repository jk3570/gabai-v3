import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/App.css";
import "animate.css";

// AuthContext provider
import { useAuthContext } from "./hooks/useAuthContext";

// Navbars and Sidebars
import Navbar from "./components/landingpage/Navbar";
import UserNavbar from "./components/user/UserNavbar";
import UserSidebar from "./components/user/UserSidebar";
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminSidebar from "./components/admin/AdminSidebar";
import LawyerNavbar from "./components/lawyer/LawyerNavbar";
import LawyerSidebar from "./pages/lawyer/LawyerSidebar";

// Components routes
import Footer from "./components/landingpage/Footer";
import Terms from "./components/Terms";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SignupAdminAndLawyer from "./components/SignupAdminAndLawyer";
import ChatComponent from "./components/user/Chat";
import UserProfile from "./components/user/UserProfile";
import PageNotFound from "./components/PageNotFound";

// Landing route
import LandingPage from "./pages/LandingPage";

// Search routes
import SearchResults from "./pages/search/SearchResults";
import Search from "./pages/search/Search";

// User route
import UserLandingPage from "./pages/user/UserLanding";

// Admin routes
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserTable from "./pages/admin/UserTable";
import CasesList from "./pages/admin/CasesList";
import FeedbackList from "./pages/admin/FeedbackList";
import AdminArchivedList from "./pages/admin/AdminArchivedList";

// Lawyer routes
import LawyerDashboard from "./pages/lawyer/LawyerDashboard";
import LawyerRequestTable from "./pages/lawyer/LawyerRequestTable";
import LawyerSchedule from "./pages/lawyer/LawyerSchedule";
import LawyerArchives from "./components/lawyer/LawyerArchives";
import LawyerVideoCon from "./pages/lawyer/LawyerVideoCon";
import RequestForm from "./components/RequestForm";

const App = () => {
  const { user, dispatch } = useAuthContext();

  return (
    <Router>
      {/* <Navbar /> */}
        {/* <UserNavbar /> */} 
          {/* <AdminNavbar /> */} 
            <LawyerNavbar /> 
                    

         

      <Routes>

        {/* Landing route */}
        <Route path="/" element={<LandingPage />} />

        {/* Search routes */}
        <Route path="/search" element={<Search />} />
        <Route path="/search/result" element={<SearchResults />} />

        {/* Components routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/request" element={<RequestForm />} />

        {/* Lawyers and admins can't access */}
        <Route path="/gab/chat" element={<ChatComponent />} />
        <Route path="/gab/chat/:id" element={<ChatComponent />} />
        <Route path="/terms" element={<Terms />} />

        {/* User route */}
        <Route path="/user-landingpage" element={<UserLandingPage />} />

        {/* Lawyer route */}
        <Route path="/lawyer" element={<LawyerDashboard />} />
        <Route path="/lawyer/lawyer-request" element={<LawyerRequestTable />} />
        <Route path="/lawyer/lawyer-schedule" element={<LawyerSchedule />} />
        <Route path="/lawyer/lawyer-archive" element={<LawyerArchives />} />
        <Route path="/lawyer/video" element={<LawyerVideoCon />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/signup-admin-lawyer" element={<SignupAdminAndLawyer />} />
        <Route path="/admin/user-table" element={<UserTable />} />
        <Route path="/admin/cases" element={<CasesList />} />
        <Route path="/admin/feedbacks" element={<FeedbackList />} />
        <Route path="/admin/admin-archive" element={<AdminArchivedList />} />

        {/* 404 route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default App;
