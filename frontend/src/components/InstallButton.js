import React, { useState, useEffect } from "react";
import { MdOutlineInstallDesktop } from "react-icons/md";

const InstallBtn = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
    }
  };

  return (
    <div>
      {deferredPrompt && (
        <button
          onClick={handleInstallClick}
          className="bg-azure p-2  rounded-lg flex flex-row items-center justify-center gap-2 text-white w-[10rem]"
        >
          <MdOutlineInstallDesktop></MdOutlineInstallDesktop>
          Install App
        </button>
      )}
    </div>
  );
};

export default InstallBtn;
