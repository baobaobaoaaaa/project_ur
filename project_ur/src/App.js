import './App.css';
import ParticlesBackground from './components/ParticlesBackground';
import Carousel from './components/Carousel';
import Player from './components/Player';
import { motion } from "framer-motion";
import Navbar from './components/Navbar';
import MessageSection from './components/MessageSection';
import { useRef, useState } from 'react';
import PSPVideoPlayer from './components/PSPVideoPlayer';
import ShootingStars from './components/ShootingStars';
import "project_ur/src/components/achievementsData.js"

import iconCarrusel from "project_ur/src/components/icons/cinema.png"
import iconMusic from "project_ur/src/components/icons/music-player.png"
import iconGame from "project_ur/src/components/icons/game-controller.png"

function App() {


  // Logros
  // Logros
    const [achievements, setAchievements] = useState([]);
    const unlockedAchievements = useRef(new Set()); // Evita duplicados

    const [songAchievements, setSongAchievements] = useState([]);
    const [videoAchievements, setVideoAchievements] = useState([]);
    const [carruselAchievements, setCarruselAchievements] = useState([]);



    const onAchievementUnlock = (type, title, description) => {
      console.log(`¡Logro desbloqueado!: ${title} - ${description}`);
      console.log("Estado actual de unlockedAchievements:", unlockedAchievements.current);
      if (!unlockedAchievements.current.has(`${type}-${title}`)) {
        console.log(`¡Logro desbloqueado!: ${type} - ${title} - ${description}`);
        unlockedAchievements.current.add(`${type}-${title}`) // Evita duplicados
    
        const newAchievement = {
          title,
          description,
          id: `${type}-${title}-${Date.now()}`, // ID único para animaciones independientes
        };
    
        if (type === "song") {
          setSongAchievements((prev) => [...prev, newAchievement]);
          // Remueve el logro visualmente después de 5 segundos
          setTimeout(() => {
            setSongAchievements((prev) =>
              prev.filter((ach) => ach.id !== newAchievement.id)
            );
          }, 5000);
        } else if (type === "video") {
          setVideoAchievements((prev) => [...prev, newAchievement]);
          setTimeout(() => {
            setVideoAchievements((prev) =>
              prev.filter((ach) => ach.id !== newAchievement.id)
            );
          }, 5000);
        } else if (type === "carrusel") {
          setCarruselAchievements((prev) => [...prev, newAchievement]);
          setTimeout(() => {
            setCarruselAchievements((prev) =>
              prev.filter((ach) => ach.id !== newAchievement.id)
            );
          }, 5000);

        }
      }          
    };
  
    
    


  // Fin logros

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Navbar */}

      <div
       
        >
        {!isModalOpen &&(
            <div className='navbar'>
          <Navbar />
        </div>
        )}  
      </div>
      

      {/* Fin Navbar */}
      <div style={{zIndex: -1}}>
      {/* Fondo animado */}
      <ParticlesBackground />
      <ShootingStars />
      </div>
      {/* Contenido principal */}
      <div style={{ 
        position: "relative", 
        zIndex: 1, 
        padding: "20px 10px", 
        marginTop: "80px" // Espaciado para evitar que el Navbar tape el contenido
      }}>
        {/* Título */}
        <header className="App-header" style={{ textAlign: "center", color: "white", marginBottom: "20px" }} id='carrusel'>
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
            <Carousel setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} onAchievementUnlock={onAchievementUnlock}/>
          </section>
        </div>
        {/* Seccion de mensajes de prueba */}
        <section>
          <MessageSection title="Mensaje 1"
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
            <Player onAchievementUnlock={onAchievementUnlock}/>
          </section>
        </div>

        {/* PSP */}
        <section style={{ textAlign: "center", padding: "20px 0" }}>
          <h1 style={{ color: "white", marginBottom: "20px" }}>PSP</h1>
          <PSPVideoPlayer onAchievementUnlock={onAchievementUnlock}/>
        </section>

        {/* Logros */}
        {/* Logros */}
     {/* Achievements Section */}
<div style={{ position: "fixed", top: "80px", right: "10px", zIndex: 9999 }}>
  {/* Song Achievements */}
  {songAchievements.map((achievement) => (
    <motion.div
      key={achievement.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(135deg, #9be15d, #00e3ae)", // Degradado verde
        color: "#fff",
        padding: "15px 20px",
        margin: "10px 0",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
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
          src={iconMusic}
          alt='Icono de musica'
          style={
            {width: "30px",
            height: "30px",
            marginRigth: "10px",}
          }
        />
      </div>
      <div>
        <strong style={{ fontSize: "1.1rem" }}>{achievement.title}</strong>
        <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
          {achievement.description}
        </p>
      </div>
    </motion.div>
  ))}

  {/* PSP Video Achievements */}
  {videoAchievements.map((achievement) => (
    <motion.div
      key={achievement.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(135deg, #ff758c, #ff7eb3)", // Degradado rosado
        color: "#fff",
        padding: "15px 20px",
        margin: "10px 0",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
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
          src={iconGame}
          alt='Icono de PSP'
          style={
            {width: "30px",
            height: "30px",
            marginRigth: "10px",}
          }
        />
      </div>
      <div>
        <strong style={{ fontSize: "1.1rem" }}>{achievement.title}</strong>
        <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
          {achievement.description}
        </p>
      </div>
    </motion.div>
  ))}

  {/* Carrusel Achievements */}
  {carruselAchievements.map((achievement) => (
    <motion.div
      key={achievement.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      style={{
        background: "linear-gradient(135deg, #85d8ce, #a7ffeb)", // Degradado azul claro
        color: "#004d40",
        padding: "15px 20px",
        margin: "10px 0",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
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
          src={iconCarrusel}
          alt='Icono de carrusel'
          style={
            {width: "30px",
            height: "30px",
            marginRigth: "10px",}
          }
        />
      </div>
      <div>
        <strong style={{ fontSize: "1.1rem" }}>{achievement.title}</strong>
        <p style={{ margin: "5px 0", fontSize: "0.9rem" }}>
          {achievement.description}
        </p>
      </div>
    </motion.div>
  ))}
</div>

      </div>
    </div>
  );
}

export default App;
