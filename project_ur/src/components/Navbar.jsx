import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ unlockedAchievements }) => {
  const [localAchievements, setLocalAchievements] = useState([]);
  const [isAchievementsMenuOpen, setIsAchievementsMenuOpen] = useState(false);

  // Sincronizar logros con el estado local
  useEffect(() => {
    setLocalAchievements(unlockedAchievements);
    
  }, [unlockedAchievements]);

  const hasAchievements = localAchievements.length > 0;
  

  return (
    
    <nav style={navbarStyle}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* Botones principales */}
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

        {/* Botón de Logros */}
        <button
          onClick={() => setIsAchievementsMenuOpen((prev) => !prev)}
          style={hamburgerButtonStyle}
        >
          ☰
        </button>
      </div>

      {/* Menú móvil de logros */}
      <AnimatePresence>
        {isAchievementsMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300 }}
            style={achievementsMenuStyle}
          >
            <h3 style={achievementsTitleStyle}>🏆 Logros Descubiertos</h3>

            {hasAchievements ? (
              <div style={achievementsContainerStyle}>
                {localAchievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    style={achievementItemStyle}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div key={index} style={achievementItemStyle}>
                      {/* Icono del logro */}
                      <div style={iconStyle}>
                        <span style={{ fontSize: "24px" }}>{achievement.icon}</span> {/* Emoji */}
                      </div>
                      {/* Texto del logro */}
                      <div>
                        <strong style={achievementTitleStyle}>{achievement.title}</strong>
                        <p style={achievementDescriptionStyle}>{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            
            
            ) : (
              <p style={{ color: "#fff", fontStyle: "italic" }}>
                Aún no has desbloqueado logros.
              </p>
            )}

            <motion.button
              onClick={() => setIsAchievementsMenuOpen(false)}
              style={closeButtonStyle}
              whileHover={{ scale: 1.05 ,backgroundColor:"#9ae1d4"}}
              transition={{duration:0.2}}
            >
              Cerrar
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
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

const hamburgerButtonStyle = {
  background: "none",
  border: "none",
  color: "#fff",
  fontSize: "24px",
  cursor: "pointer",
  marginLeft: "20px",
};

const achievementsMenuStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "345px",
  height: "100vh",
  background: "linear-gradient(135deg, #0e4675, #122b5e)", // Gradiente azul oscuro
  color: "#f9d4db", // Rosa pastel para texto principal
  padding: "20px",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: "20px", // Separación entre elementos
};


const achievementsContainerStyle = {
  width: "100%",
  maxHeight: "70vh",
  overflowY: "auto",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  gap: "20px", // Separación entre logros
};

const achievementItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  background: "rgba(255, 255, 255, 0.15)", // Fondo blanco translúcido
  border: "1px solid rgba(255, 255, 255, 0.3)", // Borde blanco translúcido
  borderRadius: "15px",
  padding: "20px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Sombra para dar profundidad
  transition: "transform 0.3s, box-shadow 0.3s", // Animación
  cursor: "pointer",
};


const iconStyle = {
  width: "60px",
  height: "60px",
  background: "rgba(255, 255, 255, 0.2)", // Fondo translúcido
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px", // Tamaño del icono
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)", // Sombra
};


const achievementTitleStyle = {
  fontSize: "1.1rem",
  fontWeight: "bold",
  color: "#ff9690", // Coral claro
  marginBottom: "5px",
};

const achievementDescriptionStyle = {
  fontSize: "0.9rem",
  color: "#ffffff", // Texto blanco para buen contraste
  margin: 0,
};

const closeButtonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  borderRadius: "25px",
  border: "2px solid #9ae1d4", // Verde menta
  background: "rgba(14, 70, 117, 0.8)", // Azul oscuro translúcido
  color: "#fff",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  transition: "background-color 0.3s, transform 0.3s",
};



const achievementsTitleStyle = {
  fontSize: "1.8rem",
  color: "#9ae1d4", // Verde menta
  textAlign: "center",
  marginBottom: "20px",
};


export default Navbar;
