import React from "react";
import "project_ur/src/components/PSPVideoPlayer.css"; // Archivo CSS para estilos
import videoSrc from "project_ur/src/assets/video/ELDEN RING™ 2025-01-06 00-15-39.mp4";
import pspFrame from "project_ur/src/assets/psp_transparente.png"; // Nueva imagen transparente

const PSPVideoPlayer = () => {
  return (
    <div className="psp-container">
      {/* Marco de la PSP */}
      <img src={pspFrame} alt="PSP Frame" className="psp-frame" />

      {/* Video dentro del marco */}
      <div className="psp-video-container">
        <video controls className="psp-video">
          <source src={videoSrc} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
};

export default PSPVideoPlayer;
