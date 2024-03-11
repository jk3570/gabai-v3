import React, { useState } from "react";
import JoinScreen from "../../components/lawyer/video-call/joinScreen";
import MeetingView from "../../components/lawyer/video-call/meetingView";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "../../API";
import { Helmet } from "react-helmet";

function VideoCon() {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

const App = () => {
  return (
    <div className=" py-20 px-auto flex justify-center items-center h-screen">
      <Helmet>
        <title>Video Chat - GabAI</title>
      </Helmet>
      <VideoCon />
    </div>
  );
};

export default App;
