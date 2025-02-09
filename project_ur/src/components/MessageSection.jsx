import React from "react";
import { color, motion } from "framer-motion";

const MessageSection = ({ title, message, sectionType }) => {
  const styles = getStyles(sectionType);

  return (
    <motion.div
      style={styles.baseStyle}
      // initial={{ opacity: 0, scale: 0.9 }}
      // animate={{ opacity: 1, scale: 1 }}
      // transition={{ duration: 0.6, ease: "easeInOut" }}
      // whileHover={{
      //   scale: 1.02,
      //   boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
      
    >
      <div style={styles.iconStyle}>{styles.icon}</div>
      <h2 style={styles.titleStyle}>{title}</h2>
      <p style={styles.messageStyle}>{message}</p>
    </motion.div>
  );
};

// Función para obtener estilos según el tipo de sección
const getStyles = (sectionType) => {
  const defaultStyles = {
    baseStyle: {
      position: "relative",
      width: "90%",
      maxWidth: "600px",
      margin: "20px auto",
      padding: "20px",
      background: "linear-gradient(135deg, #FFDEE9, #B5FFFC)", // Degradado de fondo
      borderRadius: "10px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)", // Sombra
      textAlign: "center",
      overflow: "hidden", // Para bordes decorativos
    },
    iconStyle: {
      fontSize: "2rem",
      marginBottom: "10px",
    },
    titleStyle: {
      fontSize: "30px",
      fontWeight: "bold",
      marginBottom: "10px",
      fontFamily: "Dancing Script, cursive",
      textShadow: "0px 3px 6px rgba(0, 0, 0, 0.2)",
    },
    messageStyle: {
      fontSize: "30px",
      lineHeight: "1.5",
      fontFamily: "'Dancing Script', cursive",
      textShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
      fontWeight: "bold",
      color: "#333",

      
    },
    icon: "💌", // Icono por defecto
  };

  switch (sectionType) {
    case "music":
      return {
        ...defaultStyles,
        icon: "🎵",
        baseStyle: {
          ...defaultStyles.baseStyle,
          background: "linear-gradient(135deg, #FFD95F, #FFEFC8)", // Verde
        },
      };
    case "dedication":
      return {
        ...defaultStyles,
        icon: "💖",
        baseStyle: {
          ...defaultStyles.baseStyle,
          background: "linear-gradient(135deg, #FF9A9E, #FAD0C4)", // Rosa
        },
      };
    case "reminder":
      return {
        ...defaultStyles,
        icon: "⏰",
        baseStyle: {
          ...defaultStyles.baseStyle,
          background: "linear-gradient(135deg, #84fab0, #8fd3f4)", // Azul-Verde
        },
      };
    default:
      return defaultStyles;
  }
};

export default MessageSection;
