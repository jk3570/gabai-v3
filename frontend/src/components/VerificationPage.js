// // Frontend - VerificationPage component
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// const VerificationPage = () => {
//   const navigate = useNavigate(); // Initialize useNavigate hook
//   const [verificationStatus, setVerificationStatus] = useState('Verifying...');

//   useEffect(() => {
//     const verifyEmail = async () => {
//     // Extract the verification token from the URL path
//     const token = window.location.pathname.split('/').pop();
    
//     try {
//         // Make a GET request to the backend route with the token
//         await axios.get(`http://localhost:4000/account/verify/${token}`);
//         console.log(token)
        
//         // Update the verification status
//         setVerificationStatus('Verification successful. You can now log in.');
        
//         // Navigate to the success page
//         navigate('/success');
//     } catch (error) {
//         // Handle errors
//         console.error('Error verifying email:', error);
//         setVerificationStatus('Error verifying email. Please try again later.');
//     }
// };




//     verifyEmail();
//   }, [navigate]); // Add navigate to dependency array

//   return (
//     <div>
//         <div>{verificationStatus}</div>
//     </div>
//   );
// };

// export default VerificationPage;
