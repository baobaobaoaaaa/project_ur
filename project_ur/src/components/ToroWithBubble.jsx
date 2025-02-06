import React, { useState, useEffect, useRef } from "react";
import toroimagenpres from "project_ur/src/assets/presentation/toroinouesilueta.png";

const ToroWithBubble = ({ currentAchievement }) => {
  const [currentText, setCurrentText] = useState(
    "¡Bienvenido! Explora todo lo que esta página tiene para ti."
  );

  const observer = useRef(null);

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
      default:
        return null; // No mostrar mensaje si no se puede generar uno específico
    }
  };

  useEffect(() => {
    let timeoutId = null;

    console.log("Componente montado");

    // Crear IntersectionObserver
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.id;
            console.log(`Sección visible: "${sectionName}"`);

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
        console.log(`Sección observada: ${id}`);
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

  // Estilos
  const containerStyle = {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  };

  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>
        <p>{currentText}</p>
        <div style={bubbleArrowStyle}></div>
      </div>
      <img src={toroimagenpres} alt="Toro Inoue" style={toroStyle} />
    </div>
  );
};

export default ToroWithBubble;
