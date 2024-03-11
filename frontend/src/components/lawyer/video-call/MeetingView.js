import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import ParticipantView from "./participantView";
import Controls from "./controls";

const btnStyle = "p-2 rounded-xl bg-azure text-white";

function MeetingView(props) {
  const [joined, setJoined] = useState(null);
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
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
            <Controls />

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
