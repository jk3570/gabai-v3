import React, { useState } from "react";
import JoinScreen from "../../components/user/video-call/JoinScreen"; // Importing JoinScreen component for joining a meeting
import MeetingView from "../../components/user/video-call/MeetingView"; // Importing MeetingView component for displaying meeting view
import { MeetingProvider } from "@videosdk.live/react-sdk"; // Importing MeetingProvider from videosdk for managing meeting state
import { authToken, createMeeting } from "../../API"; // Importing functions for authentication and meeting creation
import { Helmet } from "react-helmet"; // Importing Helmet for managing document head metadata
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom"



// videocon component
const VideoCon = () => {

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
      <div className="flex flex-row">
        <MeetingView meetingId={id} myId={myId} params={params} onMeetingLeave={onMeetingLeave} />
      </div>
    </MeetingProvider>
  ) : (
    <div>
        <JoinScreen generateMeetingId={generateMeetingId} myId={myId} params={params} meetingId={id} />
    </div>
  );
  
};

// Component for lawyer's video conference page
const UserVideoCon = () => {

  
  return (
    <div className="px-auto flex justify-center items-center h-screen bg-bkg text-content">
      <Helmet>
        <title>Video Chat - GabAi</title> {/* Setting document title */}
      </Helmet>
      
      <VideoCon /> {/* Rendering the VideoCon component */}
      
    </div>
  );
};

export default UserVideoCon; // Exporting LawyerVideoCon component
