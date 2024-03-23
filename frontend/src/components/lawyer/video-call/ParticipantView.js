import React, { useEffect, useMemo, useRef } from "react";
import { useParticipant } from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";

function ParticipantView(props) {
  const micRef = useRef(null);
  const {
    webcamStream,
    micStream,
    webcamOn,
    micOn,
    isLocal,
    totalParticipants,
  } = useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  useEffect(() => {}, [webcamOn]);

  return (
    <div className="flex flex-row justify-center items-center">
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      <div>
        {webcamOn ? (
          <div
            style={{ position: "relative", width: "100%", height: "100%" }}
            className="bg-gray-700 rounded-xl z-0"
          >
            <ReactPlayer
              style={{ zIndex: "999" }}
              className={"rounded-xl flex shrink  w-[20rem] h-[15rem]"}
              playsinline
              pip={false}
              light={false}
              controls={false}
              muted={true}
              playing={true}
              url={videoStream} // Adjusted width conditionally
              onError={(err) => {
                console.log(err, "participant video error");
              }}
            />
          </div>
        ) : (
          <div className="bg-gray-700 rounded-xl w-[20rem] h-[15rem] z-0" />
        )}
      </div>
    </div>
  );
}

export default ParticipantView;
