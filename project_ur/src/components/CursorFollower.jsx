import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CursorFlower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setClicked(true);

      // Generar partículas
      const newParticles = Array.from({ length: 10 }).map(() => ({
        x: position.x,
        y: position.y,
        id: Math.random(),
      }));
      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => setClicked(false), 300);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [position]);

  return (
    <>
      {/* Partículas */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            opacity: 1,
            scale: 1,
            x: particle.x + 30,
            y: particle.y + 30,
          }}
          animate={{
            opacity: 0,
            scale: 0.5,
            x: particle.x + (Math.random() * 50 + 25), // Movimiento aleatorio horizontal
            y: particle.y + (Math.random() * 50 - 25), // Movimiento hacia abajo
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          style={{
            position: "fixed",
            width: "6px",
            height: "6px",
            backgroundColor:  "#758cff",
            borderRadius: "90%",
            pointerEvents: "none",
            zIndex: 9998,
          }}
          onAnimationComplete={() =>
            setParticles((prev) => prev.filter((p) => p.id !== particle.id))
          }
        />
      ))}

      {/* Cursor con flor */}
      <motion.div
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: "20px",
          height: "20px",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
        animate={{ scale: clicked ? 1.3 : 1 }}
        transition={{
          type: "spring",
          stiffness: 2010,
          damping: 115,
        }}
      >
        {/* Flor */}
        <div
          style={{
            position: "relative",
            width: "20px",
            height: "20px",
            backgroundColor: "transparent",
          }}
        >
          {/* Pétalos */}
          {[0, 90, 180, 270].map((angle) => (
            <motion.div
              key={angle}
              style={{
                position: "absolute",
                width: "8px",
                height: "8px",
                backgroundColor: "#FF85A2",
                borderRadius: "100%",
                top: "24px",
                left: "24px",
                transform: `rotate(${angle}deg) translate(0, -6px)`,
              }}
            />
          ))}
          {/* Centro de la flor */}
          <div
            style={{
              position: "absolute",
              width: "6px",
              height: "6px",
              backgroundColor: "white",
              borderRadius: "100%",
              top: "25px",
              left: "25px",
            }}
          ></div>
        </div>
      </motion.div>
    </>
  );
};

export default CursorFlower;
