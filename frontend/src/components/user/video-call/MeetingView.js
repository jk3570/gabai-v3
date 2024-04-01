import React, { useState, useEffect } from "react";
import { useParticipant, useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "./ParticipantView";
import Controls from "./Controls";

const btnStyle = "p-2 rounded-xl bg-azure text-white w-[20em]";

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
      <div>
        <div className="container">
          <div>
            <div className="top-[5rem] left-0 absolute p-4 bg-gray-300 w-screen">
              {/* <h3>Meeting Id: {props.meetingId}</h3>
               <h3>Meeting Id: {props.myId}</h3> */}
            </div>
            {joined && joined === "JOINED" ? (
              <div className="flex flex-row gap-2 justify-center items-center">
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
              <div>
               <b>Reminder: Before joining the video conference. Please be professional...</b>
                <div className="flex flex-row gap-2">
                  <ParticipantView />
                </div>
                <div className="flex flex-row gap-2">
                  <button onClick={joinMeeting} className={btnStyle}>
                    Join
                  </button>{" "}
                </div>
              </div>
            )}
          </div>

          <div className="bottom-0 left-0 flex items-center justify-center absolute bg-gray-300 w-screen h-16">
            {" "}
            <Controls
              className=""
              toggleWebcam={() => toggleWebcam()}
              toggleMic={() => toggleMic()}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default MeetingView;
