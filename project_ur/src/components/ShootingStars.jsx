import React, { useEffect, useState } from "react";
import "project_ur/src/star-fall.css";

const ShootingStars = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generar una estrella fugaz cada 2 segundos
    const interval = setInterval(() => {
      setStars((prevStars) => [
        ...prevStars,
        {
          id: Date.now(),
          left: Math.random() * 100 + "vw", // Posición inicial aleatoria
          top: Math.random() * 50 + "vh", // Comienza desde un rango alto
        },
      ]);

      // Eliminar estrellas viejas después de 2 segundos
      setTimeout(() => {
        setStars((prevStars) =>
          prevStars.filter((star) => star.id !== prevStars[0]?.id)
        );
      }, 3000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shooting-stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: star.left,
            top: star.top,
            animationDuration: `${Math.random() * 2 + 1}s`, // Duración aleatoria
          }}
        ></div>
      ))}
    </div>
  );
};

export default ShootingStars;
