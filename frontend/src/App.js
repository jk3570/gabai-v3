import React, { useState } from "react";
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
import Home from "./pages/Home";
import SuccessPage from "./pages/SuccessPage";

// Search routes
import SearchResults from "./pages/search/SearchResults";
import Search from "./pages/search/Search";

// User route
import UserLandingPage from "./pages/user/UserLanding";
import UserVideoCon from "./pages/user/UserVideoCon";

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
// import JoinScreen from "../src/components/lawyer/video-call/JoinScreen";
import RequestForm from "./components/RequestForm";

const App = () => {
  const { user, dispatch } = useAuthContext();

  /* console.log("Userahahha:", user); // Log the value of user for debugging */

  return (
    <Router>
                    
      {user ? ( user.role === 'user' ? (<UserNavbar />) 
              : user.role === 'lawyer' ? (<LawyerNavbar />) 
              : user.role === 'admin' ? (<AdminNavbar />) 
              : (<Navbar />)) : (<Navbar />)}
      <Routes>
        <Route path="/home" element={<Home />} />
        
        <Route path="/verify/success" element={<SuccessPage />} />

        {user ? ( user.role === 'user' ? (<Route path="/user-landingpage" element={<UserLandingPage />} />) 
                : user.role === 'lawyer' ? (<Route path="/lawyer" element={<LawyerDashboard />} />) 
                : user.role === 'admin' ? (<Route path="/admin" element={<AdminDashboard />} />) 
                : (<Route path="/" element={<LandingPage />} />)) : (<Route path="/" element={<LandingPage />} />)}       

          {/* Landing route */}
          {user ? null : <Route path="/" element={<LandingPage />} />}

          {/* Search routes */}
          <Route path="/search" element={<Search />} />
          <Route path="/search/result" element={<SearchResults />} />

          {/* Components routes */}


          {user ? null : <Route path="/#login" element={<Login />} />}
          {user ? null : <Route path="/#signup" element={<Signup />} />}
          {user ? <Route path="/profile" element={<UserProfile />} /> : null}
          <Route path="/request" element={<RequestForm />} />


          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<UserProfile />} /> */}

          {/* Lawyers and admins can't access */}
          <Route path="/gab/chat" element={<ChatComponent />} />
          <Route path="/gab/chat/:id" element={<ChatComponent />} />
          <Route path="/terms" element={<Terms />} />

          {/* User route */}
          {user && user.role === 'user' ? <Route path="/user-landingpage" element={<UserLandingPage />} /> : null}
          {user && user.role === 'user' ? <Route path="/user/video-conference/:id" element={<UserVideoCon />} /> : null}

          {/* Lawyer route */}
          {user && user.role === 'lawyer' ? <Route path="/lawyer" element={<LawyerDashboard />} /> : null}
          {user && user.role === 'lawyer' ? <Route path="/lawyer/lawyer-request" element={<LawyerRequestTable />} /> : null}
          {user && user.role === 'lawyer' ? <Route path="/lawyer/lawyer-schedule" element={<LawyerSchedule />} /> : null}
          {user && user.role === 'lawyer' ? <Route path="/lawyer/lawyer-archive" element={<LawyerArchives />} /> : null}
          {user && user.role === 'lawyer' ? <Route path="/lawyer/video-conference/:id" element={<LawyerVideoCon />} /> : null}
          
          
          {/* <Route path="/lawyer/join" element={<JoinScreen />} /> */}


          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          {user && user.role === 'admin' ? <Route path="/admin/signup-admin-lawyer" element={<SignupAdminAndLawyer />} /> : null}        
          {user && user.role === 'admin' ? <Route path="/admin/user-table" element={<UserTable />} /> : null}        
          {user && user.role === 'admin' ? <Route path="/admin/cases" element={<CasesList />} /> : null}        
          {user && user.role === 'admin' ? <Route path="/admin/feedbacks" element={<FeedbackList />} /> : null}
          {user && user.role === 'admin' ? <Route path="/admin/admin-archive" element={<AdminArchivedList />} /> : null}
          

          {/* 404 route */}
          {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>

      {user ? null : <Footer />}
    </Router>
  );
};

export default App;
