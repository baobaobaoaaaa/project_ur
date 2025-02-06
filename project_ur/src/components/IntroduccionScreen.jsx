import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toroImage from "project_ur/src/assets/presentation/toroinouesilueta.png";

const IntroductionScreen = ({ onFinish }) => {
  const messages = [
    "¡Hola! Soy Toro.",
    "Espero que disfrutes esta página.",
    "Está hecha con mucho cariño para ti.",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);
  const [showCurtains, setShowCurtains] = useState(false);

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];
    if (!currentMessage) return;
  
    console.log("Mensaje actual:", currentMessage);
  
    // Reinicia el texto y el índice al cambiar de mensaje
    setDisplayedText("");
    setLetterIndex(0);
  
    const intervalId = setInterval(() => {
      setLetterIndex((prevIndex) => {
        if (prevIndex < currentMessage.length) {
          // Evita acumulación incorrecta del texto
          setDisplayedText(currentMessage.slice(0, prevIndex + 1));
          return prevIndex + 1;
        } else {
          clearInterval(intervalId);
          return prevIndex;
        }
      });
    }, 50);
  
    return () => clearInterval(intervalId);
  }, [currentMessageIndex]);
  

  const handleNextMessage = () => {
    if (currentMessageIndex < messages.length - 1) {
      console.log("Mostrando siguiente mensaje...");
      setCurrentMessageIndex((prev) => prev + 1);
    } else {
      console.log("Mostrando cortinas...");
      setShowCurtains(true);
      setTimeout(() => {
        console.log("Llamando a onFinish...");
        onFinish();
      }, 2000);
    }
  };

  return (
    <>
      {showCurtains && (
        <>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              backgroundColor: "#000",
              zIndex: 3000,
            }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              backgroundColor: "#000",
              zIndex: 3000,
            }}
          />
        </>
      )}

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#FFB6C1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000,
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "white",
            padding: "15px 20px",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            maxWidth: "300px",
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
          }}
        >
          <p style={{ margin: 0 }}>{displayedText}</p>
          <div
            style={{
              content: "''",
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "10px solid white",
            }}
          ></div>
        </div>

        <img
          src={toroImage}
          alt="Toro Inoue"
          style={{ width: "150px", marginBottom: "20px" }}
        />

        <button
          onClick={handleNextMessage}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FF69B4",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {currentMessageIndex < messages.length - 1 ? "Siguiente" : "Empezar"}
        </button>
      </motion.div>
    </>
  );
};

export default IntroductionScreen;
