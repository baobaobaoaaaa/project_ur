import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faCamera,faMusic, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          text={<FontAwesomeIcon icon={faCamera} /> }
          onClick={() => document.getElementById("carrusel").scrollIntoView()}
        />
        <NavButton
          text={<FontAwesomeIcon icon={faMusic} />}
          onClick={() => document.getElementById("player").scrollIntoView()}
        />
        <NavButton
          text={<FontAwesomeIcon icon={faVideo} />}
          onClick={() => document.getElementById("videos").scrollIntoView()}
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
              whileHover={{ scale: 1.05 ,backgroundColor:"#D70654"}}
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
  width: "350px",
  height: "100vh",
  background: "#F72C5B", // Rosa claro a rosa intenso
  color: "#ffffff", // Texto blanco
  padding: "20px",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  gap: "20px",
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
  flexDirection: "column",
  alignItems: "center",
  gap: "5px", // Espaciado entre elementos
  background: "#FF748B", // Gradiente rosa pastel a púrpura claro
  borderRadius: "20px",
  padding: "5px",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)", // Sombra suave
  textAlign: "center", // Centra todo el contenido
  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Animaciones suaves
  cursor: "pointer",
};

achievementItemStyle[':hover'] = {
  transform: "scale(1.05)", // Aumenta el tamaño en hover
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)", // Más profundidad
};



const iconStyle = {
  width: "80px", // Tamaño del icono
  height: "80px",
  background: "linear-gradient(135deg,rgb(20, 20, 44),rgb(99, 59, 207))", // Gradiente púrpura oscuro
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "36px", // Tamaño del icono
  color: "#ffffff", // Blanco para contraste
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Sombra suave
};



const achievementTitleStyle = {
  fontSize: "1.2rem", // Tamaño grande para el título
  fontWeight: "bold",
  color: "#ffffff", // Blanco para contraste
  textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", // Sombra ligera para destacar
};

const achievementDescriptionStyle = {
  fontSize: "0.9rem", // Más pequeño para la descripción
  color: "#white", // Azul medio para buen contraste
};

const closeButtonStyle = {
  padding: "10px 25px",
  fontSize: "16px",
  borderRadius: "30px",
  border: "2px solid #8b3d78", // Púrpura oscuro
  background: "#FFFDEC", // Gradiente rosa
  color: "#FBB4A5", // Texto blanco
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease",
};






const achievementsTitleStyle = {
  fontSize: "1.8rem",
  color: "#FFEFC8", // Verde menta
  textAlign: "center",
  marginBottom: "20px",
};


export default Navbar;
