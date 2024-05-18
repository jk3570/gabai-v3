import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import videoDemo from "../../img/videoDemo.mp4";

const VideoDemoTutorial = () => {
  const playerRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (playerRef.current) {
        playerRef.current.seekTo(0);
        playerRef.current.getInternalPlayer().play().catch((error) => {
          console.error("Auto-play was prevented:", error);
        });
      }
    };

    const handleMouseLeave = () => {
      if (playerRef.current) {
        playerRef.current.getInternalPlayer().pause();
      }
    };

    const videoContainer = videoContainerRef.current;
    if (videoContainer) {
      videoContainer.addEventListener("mouseenter", handleMouseEnter);
      videoContainer.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (videoContainer) {
        videoContainer.removeEventListener("mouseenter", handleMouseEnter);
        videoContainer.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-center items-center h-fit w-full pb-20 py-10 md:px-5">
      <h1 className="justify-center text-center my-5 text-3xl md:text-4xl font-bold">
        How to get started...
      </h1>

      <div
        className="relative z-20 bg-gray-700 rounded-lg shadow-2xl flex flex-col justify-around items-center max-md:px-2"
        ref={videoContainerRef}
      >
        <div className="relative z-0 justify-center items-center bg-gray-700 rounded-xl md:w-full md:h-full w-[320px] h-[180px] flex flex-col md:flex-row overflow-clip">
          <ReactPlayer
            ref={playerRef}
            className="rounded-xl flex md:w-full md:h-full md:scale-[100%] scale-[50%]"
            style={{ width: '100%', height: '100%' }}
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={false}
            playing={false}
            loop={true}
            url={videoDemo}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoDemoTutorial;
