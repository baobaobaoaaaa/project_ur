import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import song1 from "../audio/For the First Time.mp3";
import song2 from "../audio/song2.mp3";
import song3 from "../audio/Boku Wa Chotto.mp3";
import caratula1 from "../assets/music/caratula1.jpg";
import caratula2 from "../assets/music/caratula2.jpg";
import caratula3 from "../assets/music/caratula3.jpg";
import { motion } from "framer-motion";

export const Player = ({ onAchievementUnlock }) => {
  // console.log("onAchievementUnlock recibido en player.jsx:", onAchievementUnlock);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasPlayedFirstSong, setHasPlayedFirstSong] = useState(false);
  const [hasChangedFirstSong, setHasChangedFirstSong] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [hasChangedVolume, setHasChangedVolume] = useState(false);

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

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;

    if (!hasChangedVolume && onAchievementUnlock) {
      onAchievementUnlock(
        "song",
        "Volumen Ajustado",
        "Has ajustado el volumen por primera vez."
      );
      setHasChangedVolume(true);
    }
    
  };

  useEffect(() => {
    if(audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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
      onAchievementUnlock(
        "song",
        "Melómano",
        "Has cambiado de canción por primera vez."
      );
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
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div //fondo del reproductor
      style={{
        background: "rgba(255, 255, 255, 0.2)", // Fondo translúcido
        backdropFilter: "blur(10px)", // Efecto de desenfoque
        border: "1px solid rgba(255, 255, 255, 0.3)", // Borde sutil
        padding: "10px",
        borderRadius: "10px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.5)", // Sombra para profundidad
        textAlign: "center",
        maxWidth: "400px",
        margin: "20px auto",
        color: "#fff",
      }}
    >
      <motion.div
        style={{
          borderRadius: "10px",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          background: "linear-gradient(90deg, #ff758c, #758cff)",
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          color: ["#fff", "#fbc4c4"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", marginBottom: "15px", color: "#fff" }}>
          Reproductor de Música
        </h2>
        <motion.img
          src={songs[currentIndex].cover}
          alt="Carátula"
          style={{
            width: "95%",
            borderRadius: "15px",
            marginBottom: "15px",
          }}
          animate={{
            boxShadow: [
              "0 10px 20px rgba(255, 117, 140, 0.4)",
              "0 10px 20px rgba(117, 140, 255, 0.4)",
            ], // Cambia la sombra
          }}
          whileHover={{ scale: 1.05 }} // Efecto de zoom al pasar el cursor
          transition={{ duration: 0.1 }}
          drag // Permite arrastrar la imagen
          dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }} // Limita el movimiento
        />
        <motion.h3
          animate={{
            color: ["#ff758c", "#fbc4c4", "#ff758c"], // Ciclo de colores
            backgroundPosition: ["110% 110%", "100% 110%", "10% 110%"], // Animación de
          }}
          transition={{
            duration: 3,
            repeat: Infinity, // Loop infinito
            ease: "easeInOut",
          }}
          style={{
            fontSize: "1.2rem",
            marginBottom: "5px",
            backgroundSize: "200% 200%",
          }}
        >
          {songs[currentIndex].title}
        </motion.h3>
        <p style={{ fontSize: "1rem", marginBottom: "15px", color: "#ffffff" }}>
          {songs[currentIndex].artist}
        </p>
        <audio ref={audioRef} src={songs[currentIndex].src}></audio>
        {/* barrra de tiempo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
          }}
        >
          <span style={{ fontSize: "0.9rem", color: "#ffffff" }}>
            {formatTime(currentTime)}
          </span>
          <motion.input
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
          <span style={{ fontSize: "0.9rem", color: "#ffffff" }}>
            {formatTime(duration)}
          </span>
        </div>
        {/* fin barra de tiempo */}

        {/* control de volumen */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "15px",
            gap:"1px"
          }}
        >
          <span style={{ fontSize: "1.3rem", color: "#ffffff",margin:"0" ,marginBottom:"15px"}}>🔈</span>
          <motion.input
            type="range"
            min="0"
            max="100"
            value={volume * 100} // Convertir de 0-1 a 0-100
            onChange={handleVolumeChange}
            style={{
              flex: "none",
              width: "140px",
              margin: "0 px",
              cursor: "pointer",
              background: "linear-gradient(90deg, #758cff, #ff758c)", // Degradado
              borderRadius: "5px",
              height: "8px",
              outline: "none",
              appearance: "none",
              accentColor: "#758cff",
              marginBottom: "15px",
            }}
          />
          <span style={{ fontSize: "1.3rem", color: "#ffffff" ,margin:"0", marginBottom:"15px"}}>🔊</span>
        </div>

        {/* fin control volumen */}

        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <motion.button
            onClick={prevSongHandler}
            style={buttonStyle}
            whileTap={{ scale: 0.9, rotate: -155 }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.2 }}
            damping={17}
          >
            <FaStepBackward />
          </motion.button>
          <motion.button
            onClick={playPauseHandler}
            style={buttonStyle}
            whileTap={{ scale: 2, rotate: 100 }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.2 }}
            damping={17}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </motion.button>
          <motion.button
            onClick={nextSongHandler}
            style={buttonStyle}
            whileTap={{ scale: 2, rotate: 155 }}
            transition={{ duration: 0.1 }}
            whileHover={{ scale: 1.2 }}
            damping={17}
          >
            <FaStepForward />
          </motion.button>
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
