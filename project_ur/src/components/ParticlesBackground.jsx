import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main); // Cargar el motor completo de partículas
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: { value: "transparent" }, // Fondo negro
        },
        particles: {
          number: { value: 40, limit:80 }, // Cantidad de partículas
          color: { value: ["#ffffff", "#f4f4f4", "#dcdcdc"], }, // Color de las partículas
          shape: {
            type: "char",
            character: [
              { value: "🌟", font: "Arial", style: "", weight: "400" },
              { value: "✨", font: "Arial", style: "", weight: "400" },
              { value: "🌙", font: "Arial", style: "", weight: "400" },
              { value: "☁️", font: "Arial", style: "", weight: "400" },
              { value: "💫", font: "Arial", style: "", weight: "400" },
              { value: "⭐", font: "Arial", style: "", weight: "400" },
              { value: "🌺", font: "Arial", style: "", weight: "400" },
              { value: "🍄", font: "Arial", style: "", weight: "400" },
              { value: "✿", font: "Arial", style: "", weight: "400" },
              { value: "🔮", font: "Arial", style: "", weight: "400" },
            ],
          },
          opacity: { minimunValuevalue: 0.6,maximumValue:1, random:true }, // Opacidad de las partículas
          size: { value: 20, random:{enable:true, minimunValue:5,maximumValue:30}, // Tamaño de las partículas
              animation:{
                enable:true,
                speed:3,
                sync:true,
              }
        
        }, // Tamaño de las partículas
          move: {
            enable: true,
            speed: {min:0.2,max:2}, // Velocidad de movimiento
            direction: "none",
            outModes: { default: "out" }, // Partículas salen del contenedor
            path:{
              enable: true,
              clamp: false,
              delay: 0.1,
            }
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" }, // Se alejan del mouse
            onClick: { enable: true, mode: "push" }, // Agregar partículas al hacer clic
            resize: true, // Redimensionar el contenedor
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 }, // Distancia y duración al alejarse
            push: { quantity: 5 }, // Cantidad de partículas añadidas al hacer clic
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
