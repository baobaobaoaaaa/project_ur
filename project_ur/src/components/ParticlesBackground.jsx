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
          color: { value: "ff9a9e" }, // Fondo negro
        },
        particles: {
          number: { value: 100 }, // Cantidad de partículas
          color: { value: "#ffffff" }, // Color de las partículas
          shape: { type: "star" }, // Forma de las partículas
          opacity: { value: 0.5 }, // Opacidad de las partículas
          size: { value: 5 }, // Tamaño de las partículas
          move: {
            enable: true,
            speed: 2, // Velocidad de movimiento
            direction: "none",
            outModes: { default: "out" }, // Partículas salen del contenedor
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" }, // Se alejan del mouse
            onClick: { enable: true, mode: "push" }, // Agregar partículas al hacer clic
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 }, // Distancia y duración al alejarse
            push: { quantity: 3 }, // Cantidad de partículas añadidas al hacer clic
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
