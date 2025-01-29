import React from "react";
import { motion } from "framer-motion";

const MessaSection = ({ title, message, style }) => {
  return (
    <motion.div
      style={{ ...baseStyle, ...style }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 style={titleStyle}>{title}</h2>
      <p style={messageStyle}>{message}</p>
    </motion.div>
  );
};

// Estilos base (aplicables a todos)
const baseStyle = {
  margin: "20px auto",
  padding: "20px",
  width: "80%",
  maxWidth: "600px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "10px",
};

const messageStyle = {
  fontSize: "16px",
  lineHeight: "1.5",
};

export default MessaSection;
