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

// import PageNotFound from "./components/PageNotFound";



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
    
      <UserNavbar />


          <Routes>
            
                {/* Landing route */}
                <Route path="/" element={<LandingPage/>} />

                {/* Search routes */}
                <Route path="/search" element={<Search />} />
                <Route path="/search/result" element={<SearchResults />} />

                {/* Components routes */}
                {user ? null : <Route path="/login" element={<Login />} />}
                {user ? null : <Route path="/signup" element={<Signup />} />}
                {user ? <Route path="/profile" element={<UserProfile />} /> : null}
                <Route path="/gab/chat" element={<ChatComponent />} />
                <Route path="/gab/chat/:id" element={<ChatComponent />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/request" element={<RequestForm />} />

                {/* Admin routes */}  
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/signup-admin-lawyer" element={<SignupAdminAndLawyer />} />
                <Route path="/admin/user-table" element={<UserTable />} />
                <Route path="/admin/cases" element={<CasesList />} />
                <Route path="/admin/feedbacks" element={<FeedbackList />} />
                <Route path="/admin/admin-archive" element={<AdminArchivedList />} />

                {/* Lawyer route */}
                <Route path="/lawyer" element={<LawyerDashboard />} />
                <Route path="/lawyer/video-conference" element={<LawyerVideoCon />} />
                <Route path="/lawyer/lawyer-request" element={<LawyerRequest />} />
                <Route path="/lawyer/lawyer-schedule" element={<LawyerSchedule />} />
                <Route path="/lawyer/lawyer-archive" element={<LawyerArchives />} />

                {/* 404 route */}
                {/* <Route path="*" element={<PageNotFound />} /> */}


        </Routes>
      

            {! user ? null : <Footer />}

    </Router>
  );
};

export default App;
