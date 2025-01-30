import React from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <NavButton text="🌸 Carrusel" onClick={() => document.getElementById("carrusel").scrollIntoView()} />
      <NavButton text="🎶 Reproductor" onClick={() => document.getElementById("player").scrollIntoView()} />
      <NavButton text="📞 Contacto" onClick={() => document.getElementById("footer").scrollIntoView()} />
    </nav>
  );
};

const NavButton = ({ text, onClick }) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)", // Sombra al hacer hover
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Fondo translúcido
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={buttonStyle}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
};

const navbarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  background: "rgba(255, 192, 203, 0.6)", // Fondo translúcido
  padding: "10px 0",
  textAlign: "center",
  zIndex: 10,
  backdropFilter: "blur(10px)", // Efecto borroso detrás de la barra
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra sutil debajo
};

const buttonStyle = {
  margin: "0 15px",
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "25px", // Bordes redondeados
  border: "1px solid rgba(255, 255, 255, 0.5)",
  background: "rgba(255, 255, 255, 0.1)", // Fondo translúcido
  color: "#fff",
  cursor: "url('project_ur/src/assets/cursors/kurocursor.cur')",
  outline: "none",
  transition: "background-color 0.3s, transform 0.3s", // Transiciones suaves
  fontFamily: "'Poppins', sans-serif", // Fuente aesthetic
};

export default Navbar;
