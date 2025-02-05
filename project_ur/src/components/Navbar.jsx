import React, { useState } from "react";
import { motion } from "framer-motion";

const Navbar = ({ unlockedAchievements }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const hasAchievements = unlockedAchievements.length > 0; // Verificar si hay logros

  return (
    <nav style={navbarStyle}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NavButton
          text="🌸 Carrusel"
          onClick={() => document.getElementById("carrusel").scrollIntoView()}
        />
        <NavButton
          text="🎶 Reproductor"
          onClick={() => document.getElementById("player").scrollIntoView()}
        />
        <NavButton
          text="📞 Contacto"
          onClick={() => document.getElementById("footer").scrollIntoView()}
        />

        {/* Botón de Logros Condicionado */}
        {hasAchievements && (
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button style={buttonStyle}>Logros</button>

            {/* Menú Desplegable */}
            {isDropdownOpen && (
              <div style={dropdownStyle}>
                {unlockedAchievements.map((achievement, index) => (
                  <div key={index} style={dropdownItemStyle}>
                    <div style={iconStyle}>
                      <img
                        src={achievement.icon}
                        alt={achievement.title}
                        style={{ width: "24px", height: "24px" }}
                      />
                    </div>
                    <div>
                      <strong style={{ fontSize: "1rem", color: "#333" }}>
                        {achievement.title}
                      </strong>
                      <p style={{ margin: "5px 0 0", fontSize: "0.9rem", color: "#555" }}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const NavButton = ({ text, onClick }) => (
  <motion.button
    whileHover={{
      scale: 1.1,
      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 300 }}
    style={buttonStyle}
    onClick={onClick}
  >
    {text}
  </motion.button>
);

const navbarStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  background: "rgba(255, 255, 255, 0.2)",
  padding: "10px 0",
  textAlign: "center",
  zIndex: 10,
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
};

const buttonStyle = {
  margin: "0 15px",
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "25px",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  background: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  cursor: "pointer",
  outline: "none",
  transition: "background-color 0.3s, transform 0.3s",
};

const dropdownStyle = {
  position: "absolute",
  top: "40px",
  right: 0,
  background: "rgba(255, 255, 255, 0.9)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  width: "300px",
  zIndex: 20,
  overflowY: "auto",
  maxHeight: "300px",
  padding: "10px",
};

const dropdownItemStyle = {
  display: "flex",
  alignItems: "center",
  padding: "10px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  color: "#333",
  gap: "15px",
};

const iconStyle = {
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(240, 240, 240, 0.5)",
  borderRadius: "50%",
};

export default Navbar;
