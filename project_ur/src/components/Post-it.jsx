import React from "react";
import { motion } from "framer-motion";

import globosonido1 from "project_ur/src/audio/effects/zapsplat_cartoon_pop_single_short_classic_001_106551.mp3";
import globosonido2 from "project_ur/src/audio/effects/zapsplat_cartoon_pop_single_short_classic_002_106552.mp3";
import globosonido3 from "project_ur/src/audio/effects/zapsplat_cartoon_pop_single_short_classic_003_106553.mp3";
import globosonido4 from "project_ur/src/audio/effects/zapsplat_cartoon_pop_single_short_classic_004_106554.mp3";
import globosonido5 from "project_ur/src/audio/effects/zapsplat_cartoon_pop_single_short_classic_005_106555.mp3";
import globosonido6 from "project_ur/src/audio/effects/zapsplat_cartoon_pop_single_short_classic_006_106556.mp3";
import globosonido7 from "project_ur/src/audio/effects/zapsplat_cartoon_pop_single_short_classic_007_106557.mp3";

import image1 from "project_ur/src/assets/images/toroxd.jpg"   
import image2 from "project_ur/src/assets/images/toro2.jpg"


const doodles = [
  { emoji: "☁️", top: "50px", left: "150px" },
  { emoji: "⭐", top: "200px", left: "300px" },
  { emoji: "❤️", top: "400px", right: "50px" },
  { emoji: "✨", bottom: "100px", left: "100px" },
  { emoji: "➡️", top: "600px", left: "200px" },
];

const polaroids = [
    { src: image1, caption: "Un día especial", top: "300px", left: "50px" },
    { src: image2, caption: "Recuerdo feliz", top: "500px", right: "100px" },
  ];

const sounds = [
  globosonido1,
  globosonido2,
  globosonido3,
  globosonido4,
  globosonido5,
  globosonido6,
  globosonido7,
];

const playRandomSound = () => {
  const randomIndex = Math.floor(Math.random() * sounds.length);
  const randomSound = sounds[randomIndex];
  new Audio(randomSound).play();
};

const PostIts = () => {
  const messages = [
    "ERES LA MEJOR BAOO <3",
    "Eres una persona increíble 💖",
    "Eres una ratita muy bonita 🎮",
    "No olvides lo especial que eres para mi 🌈",
    "No se te olvide tomar awa 💧",
  ];

  const positions = [
    { top: "-959px", left: "0px" }, // Superior izquierdo
    { top: "-799px", left: "-280px" }, // Medio izquierdo
    { top: "-810px", right: "-280px" }, // Superior derecho
    { top: "-655px", right: "-260px" }, // Medio derecho
    { top: "-500px", right: "-290px" }, // Medio derecho}
  ];
  const rotations = Array.from(
    { length: messages.length },
    () => Math.random() * 15 - 10 // Entre -10 y 10 grados
  );

  const colors = ["#fdfd96", "#ffabab", "#ffc3a0", "#ffcbf2", "#a0c4ff"];
  const textRotations = [-31, 12, -4, 7, 5]; // Rotaciones para el texto

  return (
    <div style={{ position: "relative" }}>
        <div>
        {messages.map((message, index) => (
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            key={index}
            initial={{ rotate: rotations[index], opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: rotations[index] + 5 }}
            whileDrag={playRandomSound}
            onClick={playRandomSound}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              ...positions[index], // Ubicación en los laterales
              width: "150px",
              height: "150px",
              background: colors[index % colors.length], // Color amarillo
              borderRadius: "1px",
              boxShadow: "0 10px 10px rgba(0, 0, 0, 0.3)",
              padding: "10px",

              fontFamily: "'Gloria Hallelujah', cursive",
              color: "#333",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `rotate(${rotations[index]}deg)`, // Rotación inicial
              zIndex: 100,
            }}
          >
            <motion.p
              style={{
                fontSize: "14px",
                margin: 0,
                transform: `rotate(${textRotations[index]}deg)`,
                lineHeight: "1.4",
              }}
            >
              {message}
            </motion.p>
          </motion.div>
        ))}
         </div>
        {/* <div>
        {doodles.map((doodle, index) => (
          <motion.div
            key={index}
            style={{
              position: "absolute",
              ...doodle,
              fontSize: "30px",
              fontFamily: "'Patrick Hand', cursive",
              cursor: "default",
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {doodle.emoji}
          </motion.div>
        ))}
        </div> */}
        <div>
            {polaroids.map((polaroid, index) => (
                <motion.div
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    key={index}
                    whileHover={{ scale: 1.1 ,rotate: 4 || -4}}
                    style={{
                    position: "absolute",
                    ...polaroid,
                    width: "150px",
                    height: "200px",
                    background: "#fff",
                    borderRadius: "2px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                    padding: "10px",
                    transform: `rotate(${Math.random() * 10 - 5}deg)`,
                    }}
                >
                    <img
                    src={polaroid.src}
                    alt={polaroid.caption}
                    style={{
                        width: "100%",
                        height: "80%",
                        objectFit: "cover",
                        borderRadius: "2px",
                    }}
                    />
                    <div style={{ textAlign: "center", fontSize: "12px", marginTop: "5px" }}>
                    {polaroid.caption}
                    </div>
                </motion.div>
                ))}
            </div>
        </div>
  );
};

export default PostIts;
