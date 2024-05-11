import React, { useState, useEffect } from "react";
import { useParticipant, useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "./ParticipantView";
import Controls from "./Controls";

const btnStyle = "p-3 rounded-xl bg-azure text-white w-full flex justify-center items-center";

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);

  const { join, participants, toggleWebcam, toggleMic } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  useEffect(() => {
    const requestMediaStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: false,
        });
        setMediaStream(stream);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    requestMediaStream();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const joinMeeting = () => {
    setJoined("JOINING"); // Update joined state to indicate joining
    join(); // Call the join function from the useMeeting hook
  };

  return (
    <>
      <div className="container flex w-full h-full justify-center items-center">
          <div className="flex w-full h-full justify-center items-center p-5">
            <div className="top-[5rem] left-0 absolute bg-bkg w-screen justify-center items-center">
              {/* <h3>Meeting Id: {props.meetingId}</h3>
               <h3>Meeting Id: {props.myId}</h3> */}
            </div>
            {joined && joined === "JOINED" ? (
              <div className="relative flex flex-col md:flex-row gap-2 justify-center items-center h-full w-full">
                {mediaStream && <div />}
                {[...participants.keys()].map((participantId) => (
                  <div key={participantId} className="flex flex-row gap-2">
                    <ParticipantView participantId={participantId} />
                  </div>
                ))}
              </div>
            ) : joined && joined === "JOINING" ? (
              <p>Joining the meeting...</p>
            ) : (
              <div className="flex flex-col gap-3 max-w-[480px]">
                <p className="relative w-[480px] text-sm text-center">
                Just a friendly reminder about your meeting today. Please ensure all necessary things are prepared and accessible. Thank you!
                </p>
                <div className="relative flex w-full h-full justify-center">
                  <div className="relative flex w-[240px] h-[160px] flex-row">
                      <ParticipantView />
                  </div>
                </div>              
                <div clas
                sName="flex flex-row gap-2 w-full">
                  <button onClick={joinMeeting} className={btnStyle}>
                    Join
                  </button>{" "}
                </div>
              </div>
            )}
          </div>

          <div className="bottom-0 left-0 flex items-center justify-center absolute bg-gray-400 bg-opacity-60 w-screen h-24">
            {" "}
            <Controls
              className=""
              toggleWebcam={() => toggleWebcam()}
              toggleMic={() => toggleMic()}
            />
          </div>
        </div>
    </>
  );
}

export default MeetingView;
