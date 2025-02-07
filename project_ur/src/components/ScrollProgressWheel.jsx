import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ScrollProgressWheel = ({ progress }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        border: "5px solid rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          border: "5px solid #ff758c",
          transformOrigin: "center",
        }}
        animate={{
          rotate: `${progress * 360}deg`, // Progreso basado en las diapositivas
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default ScrollProgressWheel;
