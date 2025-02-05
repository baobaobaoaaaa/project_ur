import "./App.css";
import ParticlesBackground from "./components/ParticlesBackground";
import Carousel from "./components/Carousel";
import Player from "./components/Player";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import MessageSection from "./components/MessageSection";
import { useRef, useState, useEffect } from "react";
import PSPVideoPlayer from "./components/PSPVideoPlayer";
import ShootingStars from "./components/ShootingStars";
import iconCarrusel from "project_ur/src/components/icons/cinema.png";
import iconMusic from "project_ur/src/components/icons/music-player.png";
import iconGame from "project_ur/src/components/icons/game-controller.png";

function App() {
  // Logros
  const unlockedAchievements = useRef(new Set()); // Evita duplicados

  const [songAchievements, setSongAchievements] = useState([]);
  const [videoAchievements, setVideoAchievements] = useState([]);
  const [carruselAchievements, setCarruselAchievements] = useState([]);
  const [achievementQueue, setAchievementQueue] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState(null);

  const achievementStyles = {
    song: {
      background: "linear-gradient(135deg, #ffb7c5, #ffc4d6)", // Fondo rosado cálido
      color: "#4f004e", // Texto oscuro
    },
    video: {
      background: "linear-gradient(135deg, #ff97b7, #ffa4ce)", // Rosado más intenso
      color: "#4a004a", // Texto oscuro
    },
    carrusel: {
      background: "linear-gradient(135deg, #ffd4e5, #ffdeef)", // Pastel suave
      color: "#5e0059", // Texto oscuro con un toque de contraste
    },
  };

  const removeAchievement = (type, id) => {
    if (type === "song") {
      setSongAchievements((prev) =>
        prev.filter((achievement) => achievement.id !== id)
      );
    } else if (type === "video") {
      setVideoAchievements((prev) =>
        prev.filter((achievement) => achievement.id !== id)
      );
    } else if (type === "carrusel") {
      setCarruselAchievements((prev) =>
        prev.filter((achievement) => achievement.id !== id)
      );
    }
  };

  const onAchievementUnlock = (type, title, description) => {
    if (!unlockedAchievements.current.has(`${type}-${title}`)) {
      unlockedAchievements.current.add(`${type}-${title}`);

      enqueueAchievement({
        type,
        title,
        description,
        id: `${type}-${title}-${Date.now()}`,
      });
    }
  };

  const enqueueAchievement = (achievement) => {
    setAchievementQueue((prev) => [...prev, achievement]);
  };

  useEffect(() => {
    if (!currentAchievement && achievementQueue.length > 0) {
      // Sacar el primer logro de la cola
      const nextAchievement = achievementQueue[0];
      setCurrentAchievement(nextAchievement);

      // Removerlo de la cola después de mostrarlo
      setAchievementQueue((prev) => prev.slice(1));

      // Ocultar el logro después de 5 segundos
      setTimeout(() => {
        setCurrentAchievement(null);
      }, 5000); // Ajusta el tiempo según tu preferencia
    }
  }, [achievementQueue, currentAchievement]);

  // Fin logros

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}
    >
      {/* Navbar */}

      <div>
        {!isModalOpen && (
          <div className="navbar">
            <Navbar />
          </div>
        )}
      </div>

      {/* Fin Navbar */}
      <div style={{ zIndex: -1 }}>
        {/* Fondo animado */}
        <ParticlesBackground />
        <ShootingStars />
      </div>
      {/* Contenido principal */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "20px 10px",
          marginTop: "80px", // Espaciado para evitar que el Navbar tape el contenido
        }}
      >
        {/* Título */}
        <header
          className="App-header"
          style={{ textAlign: "center", color: "white", marginBottom: "20px" }}
          id="carrusel"
        >
          <motion.h1
            style={{ textAlign: "center", color: "white" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            Recuerdos
          </motion.h1>
        </header>

        {/* Carrusel */}
        <div>
          <section style={{ marginBottom: "50px" }}>
            <Carousel
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              onAchievementUnlock={onAchievementUnlock}
            />
          </section>
        </div>
        {/* Seccion de mensajes de prueba */}
        <section>
          <MessageSection
            title="Mensaje 1"
            message="Este es un mensaje especial que quiero compartir contigo."
            style={{
              background: "linear-gradient(135deg, #f6d365, #fda085)", // Degradado cálido
              color: "white",
            }}
          />
          <MessageSection
            title="Deseo para el Futuro"
            message="Espero que esta página te haga sonreír cada vez que la veas."
            style={{
              background: "linear-gradient(135deg, #ff9a9e, #fecfef)", // Rosa pastel degradado
              color: "#6a0572",
            }}
          />
          <MessageSection
            title="Pequeña Nota"
            message="Eres una persona increíble. Nunca olvides lo especial que eres para mí."
            style={{
              background: "rgba(255, 255, 255, 0.9)", // Blanco translúcido
              color: "#333",
              border: "1px solid #ccc",
            }}
          />
        </section>

        {/* Reproductor */}
        <div id="player">
          <section style={{ textAlign: "center", padding: "20px 0" }}>
            <h1 style={{ color: "white", marginBottom: "20px" }}>Lorem psi</h1>
            <Player onAchievementUnlock={onAchievementUnlock} />
          </section>
        </div>

        {/* PSP */}
        <section style={{ textAlign: "center", padding: "20px 0" }}>
          <h1 style={{ color: "white", marginBottom: "20px" }}>PSP</h1>
          <PSPVideoPlayer onAchievementUnlock={onAchievementUnlock} />
        </section>

        {/* Logros */}
        {/* Achievements Section */}
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "10px",
            zIndex: 9999,
          }}
        >
          {/* Logro actual visible */}
          {currentAchievement && (
            <motion.div
              key={currentAchievement.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                ...achievementStyles[currentAchievement.type],
                padding: "15px 20px",
                margin: "10px 0",
                borderRadius: "15px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Icono del logro */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <img
                  src={
                    currentAchievement.type === "song"
                      ? iconMusic
                      : currentAchievement.type === "video"
                      ? iconGame
                      : iconCarrusel
                  }
                  alt={`Icono de ${currentAchievement.type}`}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
              </div>

              {/* Texto del logro */}
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    marginBottom: "5px",
                    color: "#ffcc00", // Color dorado
                    textShadow: `
                      1px 1px 3px rgba(0, 0, 0, 0.6), 
                      2px 2px 6px rgba(0, 0, 0, 0.4), 
                      0px 0px 10px rgba(255, 204, 0, 0.8)
                    `, // Sombra negra con brillo dorado
                    textAlign: "left",
                  }}
                >
                  Logro desbloqueado
                </div>
                <strong style={{ fontSize: "1.1rem", display: "block" }}>
                  {currentAchievement.title}
                </strong>
                <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
                  {currentAchievement.description}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
