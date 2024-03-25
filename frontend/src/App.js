import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/App.css";
import "animate.css";

//AuthContext provider
import { useAuthContext } from "./hooks/useAuthContext";

//Navbars and Sidebars
import Navbar from "./components/landingpage/Navbar.js";
import UserNavbar from "./components/user/UserNavbar.js";
import UserSidebar from "./components/user/UserSidebar.js";
import AdminNavbar from "./components/admin/AdminNavbar.js";
import AdminSidebar from "./components/admin/AdminSidebar.js";
import LawyerNavbar from "./components/lawyer/LawyerNavbar.js";
import LawyerSidebar from "./pages/lawyer/LawyerSidebar.js";


//Components routes
import Footer from "./components/landingpage/Footer.js";
import Terms from "./components/Terms";
import Login from "./components/Login";
import Signup from "./components/Signup";

import SignupAdminAndLawyer from "./components/SignupAdminAndLawyer";
import ChatComponent from "./components/user/Chat";
import UserProfile from "./components/user/UserProfile";

import PageNotFound from "./components/PageNotFound";



//Landing route
import LandingPage from "./pages/LandingPage";

//Search routes
import SearchResults from "./pages/search/SearchResults";
import Search from "./pages/search/Search";

//User route
import UserLandingPage from "./pages/user/UserLanding.js";

//Admin routes
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserTable from "./pages/admin/UserTable";
import CasesList from "./pages/admin/CasesList";
import FeedbackList from "./pages/admin/FeedbackList";
import AdminArchivedList from "./pages/admin/AdminArchivedList";

//Lawyer routes
import LawyerDashboard from "./pages/lawyer/LawyerDashboard.js";
import LawyerRequest from "./pages/lawyer/LawyerRequest.js";
import LawyerSchedule from "./pages/lawyer/LawyerSchedule.js";
import LawyerArchives from "./components/lawyer/LawyerArchives.js";
import LawyerVideoCon from "./pages/lawyer/LawyerVideoCon";
import RequestForm from "./components/RequestForm.js";


const App = () => {
  const { user, dispatch } = useAuthContext();

  return ( 
    <Router>
      {/* Navbars */}
      {user ? ( user.role === 'user' ? (
            <UserNavbar />
          ) : user.role === 'admin' ? (
            <AdminNavbar />
          ) : user.role === 'lawyer' ? (
            <LawyerNavbar /> 
          ) : (
            <Navbar />
          )
        ) : (
          <Navbar />
        )}



          <Routes>
            
                {/* Landing route */}
                {!user || (user.role !== 'admin' && user.role !== 'lawyer' && user.role !== 'user') && (
                  <Route path="/" element={<LandingPage/>} />
                )}


                {/* Search routes */}
                <Route path="/search" element={<Search />} />
                <Route path="/search/result" element={<SearchResults />} />

                {/* Components routes */}
                {!user && ( <Route path="/login" element={<Login />} />)} {/* Render if any user doesnt exist */}

                {!user ? ( <Route path="/signup" element={<Signup />} />) : user.role ? null : (
                      <Route path="/signup" element={<Signup />} />)}         {/* Render if any user doesnt exist */}


                {user && user.role && ( <Route path="/profile" element={<UserProfile />} />)}
                
                        {/* Lawyers and admins cant access */}
                {(!user || (user.role !== 'admin' && user.role !== 'lawyer')) && (
                     <Route path="/gab/chat" element={<ChatComponent />} />)}
                {(!user || (user.role !== 'admin' && user.role !== 'lawyer')) && (
                      <Route path="/gab/chat/:id" element={<ChatComponent />} />)}                     
                <Route path="/terms" element={<Terms />} />

                {/* User route */} {/* only user can access */}
                {user && user.role === 'user' && (
                      <Route path="/user/user-landingpage" element={<UserLandingPage />} />)}


                {/* Lawyer route */} {/* only lawyer can access */}
                {user && user.role === 'lawyer' && (
                  <>
                    <Route path="/lawyer" element={<LawyerDashboard />} />
                    <Route path="/lawyer/lawyer-request" element={<LawyerRequest />} />
                    <Route path="/lawyer/lawyer-schedule" element={<LawyerSchedule />} />
                    <Route path="/lawyer/lawyer-archive" element={<LawyerArchives />} />
                    <Route path="/lawyer" element={<LawyerVideoCon />} />
                  </>
                )}

                {/* Admin routes */}  
                {user && user.role === 'admin' && (
                  <>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/signup-admin-lawyer" element={<SignupAdminAndLawyer />} />
                    <Route path="/admin/user-table" element={<UserTable />} />
                    <Route path="/admin/cases" element={<CasesList />} />
                    <Route path="/admin/feedbacks" element={<FeedbackList />} />
                    <Route path="/admin/admin-archive" element={<AdminArchivedList />} />
                  </>
                )}


                {/* 404 route */}
                <Route path="*" element={<PageNotFound />} />




        </Routes>
      

        {user && (user.role === 'admin' || user.role === 'lawyer' || user.role === 'user') ? null : <Footer />}


    </Router>
  );
};

export default App;
