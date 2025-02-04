import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import song1 from "../audio/For the First Time.mp3";
import song2 from "../audio/song2.mp3";
import song3 from "../audio/Boku Wa Chotto.mp3";
import caratula1 from "../assets/music/caratula1.jpg";
import caratula2 from "../assets/music/caratula2.jpg";
import caratula3 from "../assets/music/caratula3.jpg";
import { motion } from "framer-motion";

export const Player = ({onAchievementUnlock}) => {
  // console.log("onAchievementUnlock recibido en player.jsx:", onAchievementUnlock);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasPlayedFirstSong, setHasPlayedFirstSong] = useState(false);
  const [hasChangedFirstSong, setHasChangedFirstSong] = useState(false);

  const songs = [
    {
      title: "For the First Time",
      artist: "Mac DeMarco",
      src: song1,
      cover: caratula1,
    },
    {
      title: "Heart to Heart",
      artist: "Mac DeMarco",
      src: song2,
      cover: caratula2,
    },
    {
      title: "Boku Wa Chotto",
      artist: "Mac DeMarco, Haruomi Hosono",
      src: song3,
      cover: caratula3,
    },
  ];

  const playPauseHandler = () => {
    if (!isPlaying && !hasPlayedFirstSong && onAchievementUnlock) {
      onAchievementUnlock(
        "song",
        "Primer Recuerdo",
        "Has reproducido tu primera canción."
      );
      setHasPlayedFirstSong(true);
    }
  
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  

  const changeSongHandler = (index) => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentIndex(index);
    setTimeout(() => {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }, 100);
    // logro cambiar de cancion
    if (!hasChangedFirstSong && onAchievementUnlock) {
      onAchievementUnlock("song","Melómano", "Has cambiado de canción por primera vez.");
      setHasChangedFirstSong(true);
    }
    
    // console.log("Cambiando canción...");
    // console.log("onAchievementUnlock:", onAchievementUnlock);

  };

  const nextSongHandler = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    changeSongHandler(nextIndex);
  };

  const prevSongHandler = () => {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    changeSongHandler(prevIndex);
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    const updateTime = () => {
      setCurrentTime(audioElement.currentTime);
      setDuration(audioElement.duration || 0);
    };

    audioElement.addEventListener("timeupdate", updateTime);
    audioElement.addEventListener("loadedmetadata", updateTime);

    return () => {
      audioElement.removeEventListener("timeupdate", updateTime);
      audioElement.removeEventListener("loadedmetadata", updateTime);
    };
  }, []);

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div  //fondo del reproductor
    style={{
      background: "rgba(255, 255, 255, 0.2)", // Fondo translúcido
      backdropFilter: "blur(10px)", // Efecto de desenfoque
      border: "1px solid rgba(255, 255, 255, 0.3)", // Borde sutil
      padding: "20px",
      borderRadius: "20px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)", // Sombra para profundidad
      textAlign: "center",
      maxWidth: "400px",
      margin: "20px auto",
      color: "#fff",
    }}
    >
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Comienza invisible y desplazado hacia abajo
      whileInView={{ opacity: 1, y: 0 }} // Se anima cuando entra en la vista
      viewport={{ once: true }} // Solo se anima la primera vez que entra en la vista
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h2 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#fff" }}>
        Reproductor de Música
      </h2>
      <img
        src={songs[currentIndex].cover}
        alt="Carátula"
        style={{
          width: "100%",
          borderRadius: "15px",
          marginBottom: "15px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.5)", // Sombra en la imagen
        }}
      />
      <h3 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>{songs[currentIndex].title}</h3>
      <p style={{ fontSize: "1rem", marginBottom: "15px", color: "#ffffff" }}>{songs[currentIndex].artist}</p>
      <audio ref={audioRef} src={songs[currentIndex].src}></audio>
        {/* barrra de tiempo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
        <span style={{ fontSize: "0.9rem", color: "#ffffff" }}>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          style={{
            flex: 1,
            margin: "0 10px",
            cursor: "pointer",
            background: "linear-gradient(90deg, #ff7eb3, #ff758c)", // Degradado aesthetic
            borderRadius: "5px",
            height: "5px",
            outline: "none",
            appearance: "none",
            accentColor: "#ff758c",
          }}
        />
        <span style={{ fontSize: "0.9rem", color: "#ffffff" }}>{formatTime(duration)}</span>
      </div>
      {/* fin barra de tiempo */}


      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={prevSongHandler} style={buttonStyle}>
          <FaStepBackward/>
        </button>
        <button onClick={playPauseHandler} style={buttonStyle}>
          {isPlaying ? <FaPause/> : <FaPlay/>}
        </button>
        <button onClick={nextSongHandler} style={buttonStyle}>
          <FaStepForward/>
        </button>
      </div>
      </motion.div>
    </div>
    
  );
};

const buttonStyle = {
  padding: "15px",
  fontSize: "1.2rem",
  borderRadius: "50%",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  background: "rgba(255, 255, 255, 0.1)", // Fondo translúcido
  color: "#fff",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  transition: "all 0.3s ease",
};

// Efecto hover para los botones
buttonStyle[":hover"] = {
  transform: "scale(1.1)",
  background: "rgba(255, 255, 255, 0.2)", // Cambia a un fondo más claro
};


export default Player;
