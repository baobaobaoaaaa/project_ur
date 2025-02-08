import React from "react";
import { motion } from "framer-motion";

const Title = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{
        position: "relative",
        textAlign: "center",
        margin: "20px 0",
      }}
    >
      {/* Título con estilo */}
      <motion.h1
        whileHover={{ scale: 1.1 }}
        style={{
            fontSize: "4rem", // Tamaño grande y claro
            fontWeight: "bold",
            textShadow: "0px 2px 3px rgba(0, 0, 0, 0.5)", // Sombra más clara y nítida
            color: "#F5F5F5", // Color de respaldo sólido
            margin: "0 auto",
            fontFamily: "'Pacifico', cursive", // Fuente cursiva y elegante
            
          }}
      >
        {text}
      </motion.h1>


    </motion.div>
      
  );
};

export default Title;
