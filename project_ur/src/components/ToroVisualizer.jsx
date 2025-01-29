import React, { useEffect } from "react";

const drawToroDetailed = (ctx, earMovement, mouthMovement) => {
  // Limpiar canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Cabeza
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(200, 200, 120, 0, Math.PI * 2); // Cabeza redonda
  ctx.fill();

  // Orejas
  ctx.fillStyle = "#f0e68c"; // Interior amarillo de las orejas
  ctx.beginPath();
  ctx.moveTo(120, 80 - earMovement); // Oreja izquierda
  ctx.lineTo(160, 130 - earMovement / 2);
  ctx.lineTo(140, 130 - earMovement / 2);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(280, 80 - earMovement); // Oreja derecha
  ctx.lineTo(240, 130 - earMovement / 2);
  ctx.lineTo(260, 130 - earMovement / 2);
  ctx.closePath();
  ctx.fill();

  // Rostro
  ctx.fillStyle = "#000"; // Ojos y boca en negro
  ctx.beginPath();
  ctx.arc(170, 200, 10, 0, Math.PI * 2); // Ojo izquierdo
  ctx.arc(230, 200, 10, 0, Math.PI * 2); // Ojo derecho
  ctx.fill();

  // Mejillas
  ctx.fillStyle = "#ffcccc"; // Color rosado para las mejillas
  ctx.beginPath();
  ctx.arc(150, 230, 10, 0, Math.PI * 2); // Mejilla izquierda
  ctx.arc(250, 230, 10, 0, Math.PI * 2); // Mejilla derecha
  ctx.fill();

  // Boca
  ctx.beginPath();
  ctx.moveTo(180, 260);
  ctx.quadraticCurveTo(200, 260 + mouthMovement, 220, 260); // Curva animada de la boca
  ctx.stroke();
};

const visualizeAudioDetailed = (analyser, ctx) => {
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  const draw = () => {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    // Dinamismo basado en frecuencias
    const earMovement = (dataArray[5] / 255) * 30; // Movimiento de orejas basado en frecuencias bajas
    const mouthMovement = (dataArray[15] / 255) * 10; // Movimiento de la boca basado en frecuencias medias

    drawToroDetailed(ctx, earMovement, mouthMovement);
  };

  draw();
};

const ToroVisualizer = ({ audioRef }) => {
  useEffect(() => {
    const canvas = document.getElementById("audio-visualizer-detailed");
    const ctx = canvas.getContext("2d");

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256; // Tamaño del análisis FFT
    const source = audioCtx.createMediaElementSource(audioRef.current);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    visualizeAudioDetailed(analyser, ctx);
  }, [audioRef]);

  return (
    <canvas
      id="audio-visualizer-detailed"
      width="400"
      height="400"
      style={{
        display: "block",
        margin: "0 auto",
        borderRadius: "20px",
        backgroundColor: "#eaeaea",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
      }}
    ></canvas>
  );
};

export default ToroVisualizer;
