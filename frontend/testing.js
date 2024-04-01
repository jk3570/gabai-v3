// video conference

// src > pages > laywer:

// import React, { useState } from "react";
// import JoinScreen from "../../components/lawyer/video-call/JoinScreen"; // Importing JoinScreen component for joining a meeting
// import MeetingView from "../../components/lawyer/video-call/MeetingView"; // Importing MeetingView component for displaying meeting view
// import { MeetingProvider } from "@videosdk.live/react-sdk"; // Importing MeetingProvider from videosdk for managing meeting state
// import { authToken, createMeeting } from "../../API"; // Importing functions for authentication and meeting creation
// import { Helmet } from "react-helmet"; // Importing Helmet for managing document head metadata

// const VideoCon = () => {
//   const [meetingId, setMeetingId] = useState(null); // State for storing meeting ID

//   // Function to get meeting ID and token
//   const getMeetingAndToken = async (id) => {
//     const meetingId =
//       id == null ? await createMeeting({ token: authToken }) : id; // Creating a new meeting if ID is null, otherwise using provided ID
//     setMeetingId(meetingId); // Setting the meeting ID state
//   };

//   // Function to handle leaving a meeting
//   const onMeetingLeave = () => {
//     setMeetingId(null); // Resetting the meeting ID state
//   };

//   // Rendering components based on authentication and meeting ID
//   return authToken && meetingId ? (
//     <MeetingProvider
//       config={{
//         meetingId,
//         micEnabled: true,
//         webcamEnabled: true,
//       }}
//       token={authToken}
//     >
//       <div className="flex flex-row">
//         <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
//       </div>
//     </MeetingProvider>
//   ) : (
//     <JoinScreen getMeetingAndToken={getMeetingAndToken} />
//   );
// };

// // Component for lawyer's video conference page
// const LawyerVideoCon = () => {
//   return (
//     <div className=" py-20 px-auto flex justify-center items-center h-screen">
//       <Helmet>
//         <title>Video Chat - GabAi</title> {/* Setting document title */}
//       </Helmet>
//       <VideoCon /> {/* Rendering the VideoCon component */}
//     </div>
//   );
// };

// export default LawyerVideoCon; // Exporting LawyerVideoCon component


// ------------------------------------------
// ------------------------------------------
// ------------------------------------------

// src > components > lawyer > video-call:

// Controls.js:
// import React, { useState } from "react";
// import { useParticipant, useMeeting } from "@videosdk.live/react-sdk";
// import { MdCallEnd } from "react-icons/md";
// import { IoIosMic, IoIosMicOff } from "react-icons/io";
// import { HiMiniVideoCamera, HiMiniVideoCameraSlash } from "react-icons/hi2";

// const leaveBtnStyle =
//   "bg-red-500 p-3 h-10 w-10 rounded-full text-white text-center hover:bg-red-300 transition-all duration-150";
// const btnStyle =
//   "bg-azure p-3 h-10 w-10 rounded-full text-white text-center hover:bg-azure-300 transition-all duration-150";
// const disabledBtnStyle =
//   "bg-gray-500 p-3 h-10 w-10 rounded-full text-white text-center hover:bg-gray-300 transition-all duration-150";

// function Controls(props) {
//   // Get participant data and meeting functions from the SDK
//   const { webcamStream, micStream, isLocal } = useParticipant(
//     props.participantId
//   );
//   const { leave, toggleMic, toggleWebcam, enableWebcam, disableWebcam } =
//     useMeeting();

//   // State variables to keep track of mic and webcam state
//   const [micOn, setMicOn] = useState(true);
//   const [webcamOn, setWebcamOn] = useState(true);

//   // Function to toggle microphone state
//   const handleMicToggle = () => {
//     toggleMic(); // Call SDK function to toggle microphone
//     setMicOn((prevState) => !prevState); // Toggle micOn state
//   };

//   // Function to toggle webcam state
//   const handleWebcamToggle = () => {
//     toggleWebcam(); // Call SDK function to toggle webcam
//     // Enable or disable webcam based on state
//     setWebcamOn((prevState) => !prevState);

//     // Toggle webcamOn state
//   };

//   const leaveBtn = () => {
//     // Display a confirmation dialog using alert
//     if (window.confirm("Do you want to leave the meeting?")) {
//       alert("You've left the meeting");
//       leave(); // Call the leave function if user confirms
//     }
//   };

//   return (
//     <div className="flex flex-row gap-2">
//       {/* Button to leave the meeting */}
//       <button className={leaveBtnStyle} onClick={leaveBtn}>
//         <MdCallEnd />
//       </button>
//       {/* Button to toggle microphone */}
//       <button
//         className={micOn ? btnStyle : disabledBtnStyle}
//         onClick={handleMicToggle}
//       >
//         {micOn ? <IoIosMic /> : <IoIosMicOff />}
//       </button>
//       {/* Button to toggle webcam */}
//       <button
//         className={webcamOn ? btnStyle : disabledBtnStyle}
//         onClick={handleWebcamToggle}
//       >
//         {webcamOn ? <HiMiniVideoCamera /> : <HiMiniVideoCameraSlash />}
//       </button>
//     </div>
//   );
// }

// export default Controls;

// ------------------------------------------
// ------------------------------------------
// ------------------------------------------

// JoinScreen.js:
// import React, { useState } from "react";

// // Styles for buttons and input fields
// const btnStyle = "p-2 rounded-xl bg-azure text-white"; // Button style
// const inputStyle = "border-2 rounded-xl p-2 w-[15rem]"; // Input field style

// function JoinScreen({ getMeetingAndToken }) {
//   const [meetingId, setMeetingId] = useState(null); // State for storing meeting ID

//   // Function to handle joining a meeting
//   const onJoinClick = async () => {
//     if (!meetingId) {
//       alert("Please enter a meeting ID");
//       return;
//     }

//     try {
//       const meetingInfo = await getMeetingAndToken(meetingId);
//       if (!meetingInfo || !meetingInfo.participantCount) {
//         throw new Error("Meeting information is invalid");
//       }

//       if (meetingInfo.participantCount >= 2) {
//         alert("The meeting is full. You cannot join.");
//         return;
//       }
//     } catch (error) {
//       console.error("Error joining meeting:", error);
//       alert("Error joining meeting. Please try again.");
//     }
//   };
//   // Function to handle creating a meeting
//   const onCreateClick = async () => {
//     // Implement your logic for creating a meeting
//     await getMeetingAndToken(meetingId);
//   };

//   return (
//     <div>
//       <h1 className="text-[2.55rem]">
//         <b>Hello, attorney!</b> {/* Greeting message */}
//       </h1>
//       <br />
//       <div className="flex flex-row gap-2">
//         {/* Flex container for input field and buttons */}
//         <input
//           type="text"
//           className={inputStyle} // Applying input field style
//           placeholder="Enter Meeting ID" // Placeholder text
//           value={meetingId} // Set input value to state value
//           onChange={(e) => {
//             setMeetingId(e.target.value); // Updating meetingId state with entered value
//           }}
//           required // Making input field required
//         />
//         <div>
//           <button
//             onClick={onJoinClick}
//             className={btnStyle}
//             // Disable button if input is blank
//           >
//             {/* Join button */}
//             Join
//           </button>
//           {" or "} {/* Text separator */}
//           <button onClick={onCreateClick} className={btnStyle}>
//             {/* Create Meeting button */}
//             Create Meeting
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JoinScreen; // Exporting JoinScreen component

// ------------------------------------------
// ------------------------------------------
// ------------------------------------------

// MeetingView.js:
// import React, { useState, useEffect } from "react";
// import { useParticipant, useMeeting } from "@videosdk.live/react-sdk";
// import ParticipantView from "./ParticipantView";
// import Controls from "./Controls";

// const btnStyle = "p-2 rounded-xl bg-azure text-white w-[20em]";

// function MeetingView(props) {
//   const [joined, setJoined] = useState(null);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [participantCount, setParticipantCount] = useState(0);

//   const { join, participants, toggleWebcam, toggleMic } = useMeeting({
//     onMeetingJoined: () => {
//       setJoined("JOINED");
//     },
//     onMeetingLeft: () => {
//       props.onMeetingLeave();
//     },
//   });

//   useEffect(() => {
//     const requestMediaStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: false,
//           audio: false,
//         });
//         setMediaStream(stream);
//       } catch (error) {
//         console.error("Error accessing media devices:", error);
//       }
//     };

//     requestMediaStream();

//     return () => {
//       if (mediaStream) {
//         mediaStream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   useEffect(() => {
//     setParticipantCount(participants.size);
//   }, [participants]);

//   const joinMeeting = () => {
//     if (participantCount >= 2) {
//       alert("The meeting is full. You cannot join.");
//       return; // Prevent further execution
//     }

//     setJoined("JOINING"); // Update joined state to indicate joining
//     join(); // Call the join function from the useMeeting hook
//   };

//   return (
//     <>
//       <div>
//         <div className="container">
//           <div>
//             <div className="top-[5rem] left-0 absolute p-4 bg-gray-300 w-screen">
//               <h3>Meeting Id: {props.meetingId}</h3>
//             </div>
//             {joined && joined === "JOINED" ? (
//               <div className="flex flex-row gap-2 justify-center items-center">
//                 {mediaStream && <div />}
//                 {[...participants.keys()].map((participantId) => (
//                   <div key={participantId} className="flex flex-row gap-2">
//                     <ParticipantView participantId={participantId} />
//                   </div>
//                 ))}
//               </div>
//             ) : joined && joined === "JOINING" ? (
//               <p>Joining the meeting...</p>
//             ) : (
//               <div>
//                 <div className="flex flex-row gap-2">
//                   <ParticipantView />
//                 </div>
//                 <div className="flex flex-row gap-2">
//                   <button onClick={joinMeeting} className={btnStyle}>
//                     Join
//                   </button>{" "}
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="bottom-0 left-0 flex items-center justify-center absolute bg-gray-300 w-screen h-16">
//             {" "}
//             <Controls
//               className=""
//               toggleWebcam={() => toggleWebcam()}
//               toggleMic={() => toggleMic()}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default MeetingView;

// ------------------------------------------
// ------------------------------------------
// ------------------------------------------

// ParticipantView.js:

// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useParticipant } from "@videosdk.live/react-sdk"; // Importing a custom hook to manage participant streams
// import ReactPlayer from "react-player"; // Importing ReactPlayer component for video playback

// function ParticipantView(props) {
//   const micRef = useRef(null); // Creating a ref to hold reference to audio element
//   const { webcamStream, micStream, webcamOn, micOn, isLocal } = useParticipant(
//     props.participantId
//   ); // Destructuring properties from the useParticipant custom hook

//   // Memoized video stream based on webcam status
//   const videoStream = useMemo(() => {
//     if (webcamOn && webcamStream) {

//       // If webcam is on and stream exists
//       const mediaStream = new MediaStream(); // Creating a new MediaStream object
//       mediaStream.addTrack(webcamStream.track); // Adding webcam track to the stream
//       return mediaStream; // Returning the constructed stream
//     }
//   }, [webcamStream, webcamOn]); // Dependency array for memoization

//   // Effect to handle mic stream and playback
//   useEffect(() => {
//     if (micRef.current) {

//       // Checking if the micRef has been initialized
//       if (micOn && micStream) {
        
//         // If mic is on and micStream exists
//         const mediaStream = new MediaStream(); // Creating a new MediaStream object
//         mediaStream.addTrack(micStream.track); // Adding mic track to the stream

//         micRef.current.srcObject = mediaStream; // Setting audio element's srcObject to the constructed stream
//         micRef.current
//           .play()
//           .catch((error) =>
//             console.error("videoElem.current.play() failed", error)
//           ); // Attempting to play the audio element, catching any errors
//       } else {
//         micRef.current.srcObject = null; // Setting audio element's srcObject to null if mic is off or micStream is null
//       }
//     }
//   }, [micStream, micOn]); // Dependency array for mic effect

//   // Effect to ensure re-render when webcamOn changes
//   useEffect(() => {
//     // This effect will run whenever webcamOn changes, ensuring the component re-renders
//   }, [webcamOn]);

//   return (
//     <div className="flex flex-row justify-center items-center">
//       <audio ref={micRef} autoPlay playsInline muted={isLocal} />{" "}
//       {/* Audio element for mic playback */}
//       <div>
//         {/* Conditionally render ReactPlayer or gray background based on webcam status */}
//         {webcamOn ? ( // If webcam is on
//           <div
//             style={{ position: "relative", width: "100%", height: "100%" }}
//             className="bg-gray-700 rounded-xl z-0"
//           >
//             <ReactPlayer
//               style={{ zIndex: "999" }}
//               className="rounded-xl flex"
//               playsinline
//               pip={false}
//               light={false}
//               controls={false}
//               muted={true}
//               playing={true}
//               url={videoStream} // Passing the constructed video stream as URL
//               height={"320px"}
//               width={"480px"}
//               onError={(err) => {
//                 console.log(err, "participant video error");
//               }} // Handling ReactPlayer errors
//             />
//           </div>
//         ) : (
//           // If webcam is off
//           <div className=" bg-gray-700 rounded-xl w-[480px] h-[320px] z-0" /> // Displaying a gray background
//         )}
//       </div>
//     </div>
//   );
// }

// export default ParticipantView; // Exporting the ParticipantView component


