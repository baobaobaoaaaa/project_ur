import React,{useRef, useState} from "react";
import "project_ur/src/components/PSPVideoPlayer.css"; // Archivo CSS para estilos
import pspFrame from "project_ur/src/assets/psp_transparente.png"; // Nueva imagen transparente
import video1 from "project_ur/src/assets/video/ervideo.mp4";
import video2 from "project_ur/src/assets/video/eldenring.mp4";
import video3 from "project_ur/src/assets/video/locurabao1.mp4";
import video4 from "project_ur/src/assets/video/locurabao2.mp4";



const PSPVideoPlayer = ({onAchievementUnlock}) => {

      // Logros

    const [playCount, setPlayCount] = useState(0);

    const handleVideoPlay = () => {
      if (onAchievementUnlock) {
        onAchievementUnlock("Primer Recuerdo","Has reproducido tu primer video.");
      }
    }

    const handleVideoEnd = () => {
      const newCount = playCount + 1;
      setPlayCount(newCount);
      if (newCount === 3 && onAchievementUnlock) {
        onAchievementUnlock("Video Master","Has reproducido 3 videos.");
      }
    }
      // Fin logros

    const videos = [
      {
        src: video1,title: "ER Video"
      },
      {
        src: video2,title: "Elden Ring"
      },
      {
        src: video3,title: "Locura Bao 1"
      },
      {
        src: video4,title: "Locura Bao 2"
      }
    ];

      // Estado para manejar el índice del video actual
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    // Función para cambiar al siguiente video
    const nextVideo = () => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === videos.length - 1 ? 0 : prevIndex + 1
      );
    };

    // Función para cambiar al video anterior
    const prevVideo = () => {
      setCurrentVideoIndex((prevIndex) =>
        prevIndex === 0 ? videos.length - 1 : prevIndex - 1
      );
    };

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
        <video loop 
          className="psp-video" 
          ref={videoRef} 
          key={videos[currentVideoIndex].src} 
          onPlay={handleVideoPlay}
          onEnded={handleVideoEnd}
          >
          
          
          <source src={videos[currentVideoIndex].src} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
      {/* Botones */}
      <div className="psp-controls">
        <button className="psp-play-button" onClick={handlePlay} />
        <button className="psp-pause-button" onClick={handlePause}/>
        <button className="psp-left-button" onClick={prevVideo}/>
        <button className="psp-right-button" onClick={nextVideo}/>
        
      </div>
    </div>
  );
};

export default PSPVideoPlayer;
