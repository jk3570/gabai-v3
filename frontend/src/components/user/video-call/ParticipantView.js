import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParticipant,  useMeeting } from "@videosdk.live/react-sdk"; // Importing a custom hook to manage participant streams
import ReactPlayer from "react-player"; // Importing ReactPlayer component for video playback

function ParticipantView(props) {
  const micRef = useRef(null); // Creating a ref to hold reference to audio element
  const { webcamStream, micStream, webcamOn, micOn, isLocal } = useParticipant(
    props.participantId
  ); // Destructuring properties from the useParticipant custom hook
  

  // Memoized video stream based on webcam status
  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {

      // If webcam is on and stream exists
      const mediaStream = new MediaStream(); // Creating a new MediaStream object
      mediaStream.addTrack(webcamStream.track); // Adding webcam track to the stream
      return mediaStream; // Returning the constructed stream
    }
  }, [webcamStream, webcamOn]); // Dependency array for memoization

  // Effect to handle mic stream and playback
  useEffect(() => {
    if (micRef.current) {

      // Checking if the micRef has been initialized
      if (micOn && micStream) {
        
        // If mic is on and micStream exists
        const mediaStream = new MediaStream(); // Creating a new MediaStream object
        mediaStream.addTrack(micStream.track); // Adding mic track to the stream

        micRef.current.srcObject = mediaStream; // Setting audio element's srcObject to the constructed stream
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          ); // Attempting to play the audio element, catching any errors
      } else {
        micRef.current.srcObject = null; // Setting audio element's srcObject to null if mic is off or micStream is null
      }
    }
  }, [micStream, micOn]); // Dependency array for mic effect

  // Effect to ensure re-render when webcamOn changes
  useEffect(() => {
    // This effect will run whenever webcamOn changes, ensuring the component re-renders
  }, [webcamOn]);

  //Active Speaker Indication
  const {
    /** Methods */
  } = useMeeting({
    onSpeakerChanged: (activeSpeakerId) => {
      console.log("Active Speaker participantId", activeSpeakerId);
    },
  });

  

  return (
    <div className="flex flex-col md:flex-row justify-center items-center">
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />{" "}
      {/* Audio element for mic playback */}
        {/* Conditionally render ReactPlayer or gray background based on webcam status */}
        {webcamOn ? ( // If webcam is on
          isLocal ? (
            <div className="absolute bottom-0 right-0 z-10 bg-gray-700 rounded-xl w-[240px] h-[160px] flex flex-col md:flex-row overflow-clip">
              <ReactPlayer
                className="rounded-xl flex w-full h-full"
                playsinline
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                url={videoStream}
                height={"160px"}
                width={"240px"}
                onError={(err) => {
                  console.log(err, "participant video error");
                }}
              />
            </div>
          ) : (
            <div className="relative z-0 bg-gray-700 rounded-xl w-full h-full flex flex-col md:flex-row overflow-clip">
              <ReactPlayer
                className="rounded-xl flex w-full h-full"
                playsinline
                pip={false}
                light={false}
                controls={false}
                muted={true}
                playing={true}
                url={videoStream}
                onError={(err) => {
                  console.log(err, "participant video error");
                }}
              />
            </div>
          )
        ) : (
          // If webcam is off
          isLocal ? (
          <div className="absolute bottom-0 right-0 bg-gray-700 rounded-xl w-[240px] h-[160px] z-10" />
          ) : (
          <div className="relative bg-gray-700 rounded-xl w-full h-full z-0" />  
          )
        )}
      
    </div>
  );
}

export default ParticipantView; // Exporting the ParticipantView component
