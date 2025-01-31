import React,{useRef} from "react";
import "project_ur/src/components/PSPVideoPlayer.css"; // Archivo CSS para estilos
import videoSrc from "project_ur/src/assets/video/ervideo.mp4";
import pspFrame from "project_ur/src/assets/psp_transparente.png"; // Nueva imagen transparente

import playButton from "project_ur/src/assets/psp_transparente_equis.png"
import pauseButton from "project_ur/src/assets/psp_transparente_tri.png"

const PSPVideoPlayer = () => {

    const videoRef = useRef(null);

    // Función para reproducir el video
    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    // Función para pausar el video
    const handlePause = () => {
        if (videoRef.current) {
        videoRef.current.pause();
        }
    };



  return (
    <div className="psp-container">
      {/* Marco de la PSP */}
      <img src={pspFrame} alt="PSP Frame" className="psp-frame" />

      {/* Video dentro del marco */}
      <div className="psp-video-container">
        <video loop autoplay className="psp-video" ref={videoRef}>
          <source src={videoSrc} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
      {/* Botones */}
      <div className="psp-controls">
        <button className="psp-play-button" onClick={handlePlay} >
        </button>
        <button className="psp-pause-button" onClick={handlePause}>
        
        </button>
      </div>
    </div>
  );
};

export default PSPVideoPlayer;
