import React, { useState, useEffect } from "react";
import { useParticipant, useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "./ParticipantView";
import Controls from "./Controls";

const btnStyle = "p-2 rounded-xl bg-azure text-white";

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  const [mediaStream, setMediaStream] = useState(null); // State to hold media stream

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
          video: true,
          audio: true,
        });
        setMediaStream(stream); // Set the media stream to state
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
    setJoined("JOINING");
    join();
  };

  return (
    <div>
      <div className="container">
        <h3>Meeting Id: {props.meetingId}</h3>
        {joined && joined === "JOINED" ? (
          <div>
            <Controls
              toggleWebcam={() => toggleWebcam()}
              toggleMic={() => toggleMic()}
            />
            {/* Display preview of user's webcam and microphone */}
            {mediaStream && (
              <div className="flex justify-center">
                <video
                  className="w-1/2"
                  autoPlay
                  playsInline
                  muted
                  ref={(video) => {
                    if (video && mediaStream) {
                      video.srcObject = mediaStream;
                    }
                  }}
                />
              </div>
            )}
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
        ) : joined && joined === "JOINING" ? (
          <p>Joining the meeting...</p>
        ) : (
          <button onClick={joinMeeting} className={btnStyle}>
            Join
          </button>
        )}
      </div>
    </div>
  );
}

export default MeetingView;
