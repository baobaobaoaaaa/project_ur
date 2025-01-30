import './App.css';
import ParticlesBackground from './components/ParticlesBackground';
import AnimatedCarousel from './components/AnimatedCarrousel';
import AnimatedPlayer from './components/AnimatedPlayer';
import { motion } from "framer-motion";
import Navbar from './components/Navbar';
import MessageSection from './components/MessageSection';
import { useState } from 'react';
import PSPVideoPlayer from './components/PSPVideoPlayer';

function App() {

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
      <div>
      {/* Fondo animado */}
      <ParticlesBackground />
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
            <AnimatedCarousel setIsModalOpen={setIsModalOpen} />
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
            <AnimatedPlayer />
          </section>
        </div>

        {/* PSP */}
        <section style={{ textAlign: "center", padding: "20px 0" }}>
          <h1 style={{ color: "white", marginBottom: "20px" }}>PSP</h1>
          <PSPVideoPlayer />
        </section>
      </div>
    </div>
  );
}

export default App;
