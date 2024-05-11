import React, { useState } from "react";
import JoinScreen from "../../components/lawyer/video-call/JoinScreen"; // Importing JoinScreen component for joining a meeting
import MeetingView from "../../components/lawyer/video-call/MeetingView"; // Importing MeetingView component for displaying meeting view
import { MeetingProvider } from "@videosdk.live/react-sdk"; // Importing MeetingProvider from videosdk for managing meeting state
import { authToken, createMeeting } from "../../API"; // Importing functions for authentication and meeting creation
import { Helmet } from "react-helmet"; // Importing Helmet for managing document head metadata
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";



// videocon component
const VideoCon = () => {
  const button = "p-3 rounded-xl bg-azure text-white w-full flex justify-center items-center";


    // Function to handle creating a meeting

const params = useParams(); // Get all parameters from the URL
const { id } = params; // Destructure the id property from params
// console.log(id); // This will log the value of id
  

  const [meetingId, setMeetingId] = useState(id); // State for storing meeting ID
  const [myId, setMyId] = useState(null); // State for storing myId

  // Function to generate a meeting ID directly
  const generateMeetingId = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id; // Creating a new meeting if ID is null, otherwise using provided ID
      setMeetingId(meetingId); // Setting the meeting ID state
      setMyId(meetingId); // Setting myId based on meetingId
      return meetingId;
  };

  // // Function to get meeting ID and token
  // const getMeetingAndToken = async (id) => {
  //   const meetingId =
  //     id == null ? await createMeeting({ token: authToken }) : id; // Creating a new meeting if ID is null, otherwise using provided ID
  //     setMeetingId(meetingId); // Setting the meeting ID state
  //     setMyId(meetingId); // Setting myId based on meetingId
  // };

    const onCreateClick = async () => {
      const meetingId = await generateMeetingId();
      setMeetingId(meetingId);
      setMyId(meetingId);
    };

  // Function to handle leaving a meeting
  const onMeetingLeave = () => {
    setMeetingId(null); // Resetting the meeting ID state
  };

  // Rendering components based on authentication and meeting ID
  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
      }}
      token={authToken}
    >
      <div className="flex w-full h-full justify-center items-center max-w-5xl">
        <MeetingView meetingId={id} myId={myId} params={params} onMeetingLeave={onMeetingLeave} />
      </div>
    </MeetingProvider>
  ) : (
    <div className="flex flex-col gap-2 justify-center items-center">
    <h1 className="text-2xl my-0">Your meeting has ended</h1>
    <p className="text-sm max-w-md text-center">If this is a mistake and you want to return to the Case meeting, open <b>Scheduled Cases</b> again, navigate to the Case you want to return to, then click <b>View Case</b> then <b>Join</b>.</p>
    <Link to="/lawyer" className={button}>Return to home</Link>
    </div>
    
  );
  
};

// Component for lawyer's video conference page
const LawyerVideoCon = () => {

  
  return (
    <div className=" py-20 px-auto flex justify-center items-center bg-bkg h-screen text-content">
      <Helmet>
        <title>Video Chat - GabAi</title> {/* Setting document title */}
      </Helmet>
      
      <VideoCon /> {/* Rendering the VideoCon component */}
      
    </div>
  );
};

export default LawyerVideoCon; // Exporting LawyerVideoCon component
