import React, { useState } from "react";

// Styles for buttons and input fields
const btnStyle = "p-2 rounded-xl bg-azure text-white"; // Button style
const inputStyle = "border-2 rounded-xl p-2 w-[15rem]"; // Input field style

function JoinScreen({ generateMeetingId }) {
  const [meetingId, setMeetingId] = useState(); // State for storing meeting ID

  // Function to handle joining a meeting
  const onJoinClick = async () => {
    if (!meetingId) {
      alert("Please enter a meeting ID");
      return;
    }

    try {
      await generateMeetingId(meetingId);
      console.log(meetingId);
    } catch (error) {
      console.error("Error joining meeting:", error);
      alert("Error joining meeting. Please try again.");
    }
  };

  // // Function to handle creating a meeting
  // const onCreateClick = async () => {
  //   // Implement your logic for creating a meeting
  //   await getMeetingAndToken(meetingId);
  // };

  return (
    <div>
      <h1 className="text-[2.55rem]">
        <b>Reminder: Before joining the video conference. Please be professional...</b> {/* Greeting message */}
      </h1>
      <br />
      <div className="flex flex-row gap-2">
        {/* Flex container for input field and buttons */}
        <input
          type="text"
          // readOnly
          className={inputStyle} // Applying input field style
          value={meetingId} // Set input value to state value
          onChange={(e) => {
            setMeetingId(e.target.value); // Updating meetingId state with entered value
          }}
          required // Making input field required
        />
        <div>
          <button
            onClick={onJoinClick}
            className={btnStyle}
            // Disable button if input is blank
          >
            {/* Join button */}
            Join
          </button>
          {/* {" or "} Text separator
          <button onClick={onCreateClick} className={btnStyle}>
            Create Meeting button
            Create Meeting
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default JoinScreen; // Exporting JoinScreen component
