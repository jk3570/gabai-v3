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
          className="w-48 p-2 gap-2 justify-center items-center flex bg-azure text-white rounded-md text-sm hover:bg-azure-300"
        >
          <MdOutlineInstallDesktop></MdOutlineInstallDesktop>
          Install App
        </button>
      )}
    </div>
  );
};

export default InstallBtn;
