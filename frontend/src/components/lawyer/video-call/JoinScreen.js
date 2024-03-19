import React, { useState } from "react";
import addNotification from "react-push-notification";
import { useNavigate } from "react-router";

// Styles for buttons and input fields
const btnStyle = "p-2 rounded-xl bg-azure text-white"; // Button style
const inputStyle = "border-2 rounded-xl p-2 w-[15rem]"; // Input field style

function JoinScreen({ getMeetingAndToken }, props) {
  const [meetingId, setMeetingId] = useState(null); // State for storing meeting ID
  const navigate = useNavigate();

  // Function to handle joining a meeting

  const onJoinClick = async () => {
    if (!meetingId) {
      alert("Please enter a meeting ID"); // Alert if meeting ID is empty
      return;
    }
    await getMeetingAndToken(meetingId); // Calling the getMeetingAndToken function with the entered meeting ID
  };

  // Added missing arrow function
  const onCreateClick = async () => {
    await getMeetingAndToken(meetingId); // Adjust this line based on your actual implementation
  };

  return (
    <div>
      <h1 className="text-[2.55rem]">
        <b>Hello, attorney!</b> {/* Greeting message */}
      </h1>
      <br />
      <div className="flex flex-row gap-2">
        {/* Flex container for input field and buttons */}
        <input
          type="text"
          className={inputStyle} // Applying input field style
          placeholder="Enter Meeting ID" // Placeholder text
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
          {" or "} {/* Text separator */}
          <button onClick={onCreateClick} className={btnStyle}>
            {/* Create Meeting button */}
            Create Meeting
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinScreen; // Exporting JoinScreen component
