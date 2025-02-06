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
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const currentMessage = messages[currentMessageIndex];
    if (!currentMessage) return;

    setDisplayedText("");
    setLetterIndex(0);

    const intervalId = setInterval(() => {
      setLetterIndex((prevIndex) => {
        if (prevIndex < currentMessage.length) {
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
      setCurrentMessageIndex((prev) => prev + 1);
    } else {
      setShowCurtains(true);
      setTimeout(() => {
        setFadeIn(true);
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            onFinish();
          }, 1000);
        }, 3000);
      }, 1500);
    }
  };

  return (
    <>
      {/* Cortinas cerrándose */}
      {showCurtains && (
        <>
          {/* Cortina izquierda */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              background: "linear-gradient(135deg, #FF85A2, #FF99B5)", // Rosado fuerte
              zIndex: 3000,
            }}
          />
          {/* Cortina derecha */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              background: "linear-gradient(135deg, #FF99B5, #FF85A2)", // Rosado inverso
              zIndex: 3000,
            }}
          />
        </>
      )}

      {/* Fondo de fade-in y fade-out */}
      {fadeIn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{ duration: 1 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#FFADC4", // Rosado vibrante pero suave
            zIndex: 4000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "2.5rem",
              textShadow: "0px 2px 5px rgba(0, 0, 0, 0.3)",
            }}
          >
            ¡Bienvenida a Proyecto UR!
          </h1>
        </motion.div>
      )}

      {!showCurtains && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{ duration: fadeOut ? 1 : 0.5 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#FFADC4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
            flexDirection: "column",
          }}
        >
          {/* Globo de texto */}
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

          {/* Imagen del toro */}
          <img
            src={toroImage}
            alt="Toro Inoue"
            style={{ width: "150px", marginBottom: "20px" }}
            zIndex={3000}
          />

          {/* Botón para avanzar */}
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
      )}
    </>
  );
};

export default IntroductionScreen;
