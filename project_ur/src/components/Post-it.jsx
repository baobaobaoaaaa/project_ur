import React from "react";
import {  motion } from "framer-motion";

const PostIts = () => {
  const messages = [
    "ERES LA MEJOR BAOO <3",
    "Eres una persona increíble 💖",
    "Eres una ratita muy bonita 🎮",
    "No olvides lo especial que eres para mi 🌈",
    "No se te olvide tomar awa 💧",
  ];

  const positions = [
    { top: "-959px", left: "0px" }, // Superior izquierdo
    { top: "-799px", left: "-280px" }, // Medio izquierdo
    { top: "-810px", right: "-280px" }, // Superior derecho
    { top: "-655px", right: "-260px" }, // Medio derecho
    { top: "-500px", right: "-290px" }, // Medio derecho}
  ];
  const rotations = Array.from({ length: messages.length }, () =>
    Math.random() * 15 - 10 // Entre -10 y 10 grados
  );

  const colors = ["#fdfd96", "#ffabab", "#ffc3a0", "#ffcbf2", "#a0c4ff"];
  const textRotations = [-31, 12, -4, 7, 5]; // Rotaciones para el texto
  


  return (
    <div style={{ position: "relative",}}>
      {messages.map((message, index) => (
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          key={index}
          initial={{ rotate:rotations[index], opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          whileHover={{ scale: 1.1 ,rotate: rotations[index] + 5 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            ...positions[index], // Ubicación en los laterales
            width: "150px",
            height: "150px",
            background: colors[index % colors.length], // Color amarillo
            borderRadius: "1px",
            boxShadow: "0 10px 10px rgba(0, 0, 0, 0.3)",
            padding: "10px",
            
            fontFamily: "'Gloria Hallelujah', cursive",
            color: "#333",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `rotate(${rotations[index]}deg)`, // Rotación inicial
            zIndex: 100,
          }}
        >
          <motion.p style={{ fontSize: "14px", margin: 0 ,transform: `rotate(${textRotations[index]}deg)`, lineHeight:"1.4"}}>{message}</motion.p>
        </motion.div>
      ))}
    </div>
  );
};

export default PostIts;
