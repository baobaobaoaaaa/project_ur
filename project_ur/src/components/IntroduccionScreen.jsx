import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toroImage from "project_ur/src/assets/presentation/toroinouesilueta.png";


const IntroductionScreen = ({ onFinish }) => {
  const messages = [
    "¡Hola Bao! Soy Toro.",
    "Espero que disfrutes esta página.",
    "Está hecha con mucho cariño para ti.",
    "Solo queria darte una indicación antes de empezar.",
    "Haz click en todo lo que veas, ¡pueden haber muchas sorpresas!",
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
      skipIntro(); // Usa la lógica de "Saltar Introducción" al final
    }
  };

  // Función para saltar la introducción y asegurarse de que las cortinas se animan
  const skipIntro = () => {
    setShowCurtains(true); // Activa las cortinas

    // Deja que las cortinas se animen antes de finalizar la introducción
    setTimeout(() => {
      setFadeIn(true); // Desaparece la introducción con fade-in
      setTimeout(() => {
        setFadeOut(true); // Hace fade-out y llama a onFinish
        setTimeout(() => {
          onFinish(); // Finaliza la introducción
        }, 300); // Tiempo suficiente para el fade-out
      }, 1500); // Tiempo suficiente para el fade-in
    }, 1500); // Tiempo suficiente para la animación de las cortinas
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
              background: "linear-gradient(135deg, #FF85A2, #FF99B5)",
              zIndex: 2000,
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
              background: "linear-gradient(135deg, #FF99B5, #FF85A2)",
              zIndex: 2000,
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
          backgroundColor: "#FFADC4",
          zIndex: 3000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              color: "white",
              fontSize: "2.5rem",
              fontWeight: "bold",
              padding: "20px 40px",
              borderRadius: "15px",
              textAlign: "center",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <p style={{margin:0}}>¡Bienvenida a Proyecto UR!</p>
            
          </motion.h1>
        </motion.div>
      )}

      {!fadeOut && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{ duration: fadeOut ? 1 : 1 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#FF85A2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1500,
            flexDirection: "column",
          }}
        >
          {/* Botón "Saltar Introducción" en la parte superior derecha */}
          <motion.button
            onClick={skipIntro}
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor: "rgba(255, 105, 180, 0.8)",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
              fontWeight: "bold",
            }}
          >
            Saltar Introducción
          </motion.button>

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
          <motion.img
            src={toroImage}
            alt="Toro Inoue"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ width: "150px", marginBottom: "20px" }}
            whileHover={{ scale: 1.1 }}
          />

          {/* Botón "Siguiente" */}
          <motion.button
            onClick={handleNextMessage}
            whileHover={{ scale: 1.1, rotate: -3 }}
            whileTap={{ scale: 0.9 }}
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg, #FF69B4, #FF85A2)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
            }}
          >
            {currentMessageIndex < messages.length - 1 ? "Siguiente" : "Empezar"}
          </motion.button>
        </motion.div>
      )}
    </>
  );
};

export default IntroductionScreen;
