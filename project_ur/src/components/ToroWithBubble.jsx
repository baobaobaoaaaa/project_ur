import React, { useState, useEffect, useRef } from "react";
import toroimagenpres from "project_ur/src/assets/presentation/toroinouesilueta.png";
import toro1 from "../assets/presentation/toro1an.png"
import toro2 from "../assets/presentation/toro2an.png"
import toro3 from "../assets/presentation/toro3an.png"
import { motion } from "framer-motion";

const ToroWithBubble = ({ currentAchievement,onAchievementUnlock }) => {
  const [currentText, setCurrentText] = useState(
    "¡Bienvenida! Explora todoooo lo que hay en la página."
  );


  const images = [toro1, toro2, toro3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const observer = useRef(null);

  const handleToroClick = () => {
    if (onAchievementUnlock) {
      onAchievementUnlock(
        "toro",
        "Primer toque",
        "Has interactuado con Toro por primera vez."
      );
    }
  };

  // Generar mensajes según el tipo de logro
  const generateAchievementMessage = (achievement) => {
    if (!achievement) return null;

    switch (achievement.type) {
      case "song":
        return "¡Qué buen gusto musical! Sigue explorando canciones.";
      case "video":
        return "¡Un cinéfilo en acción! Mira más videos.";
      case "carrusel":
        return "¡Explora tus recuerdos en el carrusel!";
      case "toro":
        return "Me has tocado. ¡Gracias!";
      case "polaroid":
        return "Has movido mis fotos, salgo muy guapo la verdad :)";
      case "postit":
        return "Necesito anotar que debo comprar leche"
      
      default:
        return null; // No mostrar mensaje si no se puede generar uno específico
    }
  };

  useEffect(() => {
    let timeoutId = null;

    // Crear IntersectionObserver
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.id;

            // Mostrar mensaje de sección
            switch (sectionName) {
              case "carrusel":
                setCurrentText("¡Esto es el carrusel! Explora tus recuerdos.");
                break;
              case "player":
                setCurrentText("¡Aquí puedes reproducir tus canciones favoritas!");
                break;
              case "videos":
                setCurrentText("¡Explora videos y revive momentos especiales!");
                break;
              default:
                setCurrentText("¡Bienvenido! Explora todo lo que esta página tiene para ti.");
            }

            // Restablecer el mensaje general después de unos segundos
            if (timeoutId) clearTimeout(timeoutId); // Limpiar cualquier temporizador previo
            timeoutId = setTimeout(() => {
              setCurrentText("¡Bienvenido! Explora todo lo que esta página tiene para ti.");
            }, 5000); // Tiempo en milisegundos
          }
        });
      },
      {
        threshold: 0.5, // El 50% de visibilidad activa el evento
      }
    );

    // Observar las secciones
    const sectionIds = ["carrusel", "player", "videos"];
    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        observer.current.observe(section);
      }
    });

    // Limpieza al desmontar el componente
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      if (timeoutId) {
        clearTimeout(timeoutId); // Limpiar el temporizador al desmontar
      }
    };
  }, []);

  useEffect(() => {
    if (currentAchievement) {
      const message = generateAchievementMessage(currentAchievement);
      if (message) {
        setCurrentText(message);
      }
    }
  }, [currentAchievement]);

  useEffect(() => {
    // Cambiar el modelo cada 3 segundos
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [images.length]);

  // Estilos
  const containerStyle = {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation:"fade-in 1s ease-in-out",
    zIndex: 1000,
  };

  const bubbleStyle = {
    position: "relative",
    background: "white",
    padding: "10px 15px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "10px",
    color: "#333",
    maxWidth: "200px",
  };

  const bubbleArrowStyle = {
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
  };

  const toroStyle = {
    width: "100px",
    height: "auto",
    dragable: "false",
    userSelect: "none",
    cursor: "pointer",
    
  };

  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>
        <p>{currentText}</p>
        <div style={bubbleArrowStyle}></div>
      </div>
      <motion.img src={images[currentIndex]} alt="Toro Inoue" onClick={handleToroClick} style={toroStyle}/>
    </div>
  );
};

export default ToroWithBubble;
