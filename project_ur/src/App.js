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
import IntroductionScreen from "./components/IntroduccionScreen";
import ToroWithBubble from "./components/ToroWithBubble";
import CursorFollower from "./components/CursorFollower";
import PostIt from "./components/Post-it";
import Title from "./components/Title";
import KeychainPendulum from "./components/KeychainPendulum";


function App() {
  // Logros
  const unlockedAchievements = useRef(new Set()); // Evita duplicados

  const [songAchievements, setSongAchievements] = useState([]);
  const [videoAchievements, setVideoAchievements] = useState([]);
  const [carruselAchievements, setCarruselAchievements] = useState([]);
  const [achievementQueue, setAchievementQueue] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [achievements, setAchievements] = useState([]);

  const [showIntroduction, setShowIntroduction] = useState(true);
  const handleFinishIntroduction = () => {
    console.log("cambiando showIntroduction a false");
    setShowIntroduction(false);
  };
  


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

  const unlockedAchievementsQueue = []; // Cola global de logros
  let isAchievementVisible = false;
  
  const onAchievementUnlock = (type, title, description) => {
    const achievementId = `${type}-${title}`;
  
    if (!unlockedAchievements.current.has(achievementId)) {
      unlockedAchievements.current.add(achievementId);
      // Seleccionar el icono según el tipo de logro
      const icons = {
        song: "🎵", // Emoji para canciones
        video: "🎮", // Emoji para videos
        carrusel: "📷"
      };

  
      // Crear un nuevo logro
      const newAchievement = {
        type,
        title,
        description,
        id: `${type}-${title}-${Date.now()}`,
        icon: icons[type],
      };
  
      unlockedAchievementsQueue.push(newAchievement);
  
      // Actualizar logros con un pequeño retraso
      setTimeout(() => {
        setAchievements((prev) => [...prev, newAchievement]);
      }, 0);
  
      if (!isAchievementVisible) {
        showNextAchievement();
      }
    }
  };
  
  
  const showNextAchievement = () => {
    if (unlockedAchievementsQueue.length === 0) {
      isAchievementVisible = false;
      return;
    }
  
    isAchievementVisible = true;
    const nextAchievement = unlockedAchievementsQueue.shift();
  
    // Actualizar el estado del logro actual
    setCurrentAchievement(nextAchievement);
  
    // Ocultar el logro después de 5 segundos y mostrar el siguiente de la cola
    setTimeout(() => {
      setCurrentAchievement(null);
      showNextAchievement();
    }, 5000); // Ajusta el tiempo según tus necesidades
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
    <>
      {/* Pantalla de introducción */}
      {showIntroduction ? (
        <IntroductionScreen onFinish={handleFinishIntroduction} />
      ) : (
        <div
          style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}
        >
          {/* Navbar */}
          
          <div>
            {!isModalOpen && (
              <div className="navbar">
                <Navbar unlockedAchievements={achievements} />
              </div>
            )}
          </div>

          {/* Fin Navbar */}


          {/* Presentacion */}
          <ToroWithBubble currentText="Bienvenido a la pagina xddd" currentAchievement={currentAchievement}/>
          {/* Fin presentacion */}

          {/* CursorFollowe */}
          <CursorFollower />
          {/* Fin CursorFollower */}
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
                <Title text="Recuerdos" />
              </motion.h1>
            </header>

            {/* Carrusel */}
            <div id="carrusel">
              <section style={{ marginBottom: "50px" }}>
                <Carousel
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                  onAchievementUnlock={onAchievementUnlock}
                />
              </section>
            </div>
            {/* postit */}
            <section>
              <PostIt message="Este es un mensaje especial para ti. ¡Espero que te guste!" />
            </section>

            {/* LLAVERO */}
            <div style={{ position:"absolute",top:"966px",left:"450px" }}>
              <KeychainPendulum />
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
              
            </section>

            {/* Reproductor */}
            <div id="player">
              <section style={{ textAlign: "center", padding: "20px 0" }}>
                <h1 style={{ color: "white", marginBottom: "20px" }}>Lorem psi</h1>
                <Player onAchievementUnlock={onAchievementUnlock} />
              </section>
            </div>

            <MessageSection
                title="Pequeña Nota"
                message="Eres una persona increíble. Nunca olvides lo especial que eres para mí."
                style={{
                  background: "rgba(255, 255, 255, 0.9)", // Blanco translúcido
                  color: "#333",
                  border: "1px solid #ccc",
                }}
              />

            {/* PSP */}
            <section style={{ textAlign: "center"}} id="videos">
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
                    padding: "20px 20px",
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
                      flexShrink: 0,
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
                        marginRight: "0px",
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
      )}
    </>
  );
}

export default App;
