import React, { useState } from "react";
import JoinScreen from "../../components/lawyer/video-call/JoinScreen"; // Importing JoinScreen component for joining a meeting
import MeetingView from "../../components/lawyer/video-call/MeetingView"; // Importing MeetingView component for displaying meeting view
import { MeetingProvider } from "@videosdk.live/react-sdk"; // Importing MeetingProvider from videosdk for managing meeting state
import { authToken, createMeeting } from "../../API"; // Importing functions for authentication and meeting creation
import { Helmet } from "react-helmet"; // Importing Helmet for managing document head metadata

const VideoCon = () => {
  const [meetingId, setMeetingId] = useState(null); // State for storing meeting ID

  // Function to get meeting ID and token
  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id; // Creating a new meeting if ID is null, otherwise using provided ID
    setMeetingId(meetingId); // Setting the meeting ID state
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
        <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
      </div>
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
};

// Component for lawyer's video conference page
const LawyerVideoCon = () => {
  return (
    <div className=" py-20 px-auto flex justify-center items-center h-screen">
      <Helmet>
        <title>Video Chat - GabAI</title> {/* Setting document title */}
      </Helmet>
      <VideoCon /> {/* Rendering the VideoCon component */}
    </div>
  );
};

export default LawyerVideoCon; // Exporting LawyerVideoCon component
