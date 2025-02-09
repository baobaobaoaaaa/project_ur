import React, { useRef,useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import image1 from '../assets/images/omenchibi.png';
import image2 from '../assets/images/omen2.png';
import image3 from '../assets/images/omen3.png';
import image4 from '../assets/images/raze.png';
import image5 from '../assets/images/raze2.png';
import image6 from '../assets/images/raze3.png';

const KeychainPendulumPointer = ({onAchievementUnlock,startIndex}) => {


  const images = [image1, image2, image3, image4, image5, image6];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[startIndex % images.length];

  // Motion values para la rotación y el desplazamiento vertical
  const rotate = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Para la cadena: la altura se calcula a partir de y (solo se extiende si se mueve hacia abajo)
  const baseChainHeight = 50;
  const chainHeight = useTransform(y, value => value > 0 ? baseChainHeight + value : baseChainHeight);

  // Referencia al contenedor (para obtener el pivote, centro superior)
  const containerRef = useRef(null);

  // Refs para cálculos horizontales (rotación)
  const initialOffsetXRef = useRef(null);
  const lastTimeXRef = useRef(Date.now());
  const lastAngleRef = useRef(0);
  const velocityXRef = useRef(0);

  // Refs para cálculos verticales (movimiento de la imagen)
  const initialPointerYRef = useRef(null);
  const lastTimeYRef = useRef(Date.now());
  const lastYRef = useRef(0);
  const velocityYRef = useRef(0);

  // Al presionar sobre la imagen se capturan las posiciones iniciales (tanto horizontal como vertical)
  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    // Horizontal: calcular la diferencia respecto al pivote (centro superior del contenedor)
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const pivotX = rect.left + rect.width / 2;
      initialOffsetXRef.current = event.clientX - pivotX;
    } else {
      initialOffsetXRef.current = event.clientX;
    }
    lastTimeXRef.current = Date.now();
    lastAngleRef.current = rotate.get();

    // Vertical: guardar la posición inicial del puntero
    initialPointerYRef.current = event.clientY;
    lastTimeYRef.current = Date.now();
    lastYRef.current = y.get();
  };

  // Durante el movimiento se actualizan la rotación (horizontal) y el desplazamiento vertical
  const handlePointerMove = (event) => {
    // --- Rotación (horizontal) ---
    if (initialOffsetXRef.current !== null) {
      let pivotX = 0;
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        pivotX = rect.left + rect.width / 2;
      }
      const currentOffsetX = event.clientX - pivotX;
      const deltaX = currentOffsetX - initialOffsetXRef.current;
      // Factor de conversión: lo multiplicamos por -0.3 para invertir la dirección
      const factor = -0.3;
      // ¡No se aplica clamping para permitir que el ángulo crezca libremente!
      let newAngle = deltaX * factor;
      const nowX = Date.now();
      const dtX = nowX - lastTimeXRef.current;
      const dAngle = newAngle - lastAngleRef.current;
      const velocityX = dtX > 0 ? dAngle / (dtX / 1000) : 0;
      velocityXRef.current = velocityX;
      lastTimeXRef.current = nowX;
      lastAngleRef.current = newAngle;
      rotate.set(newAngle);
    }

    // --- Movimiento vertical ---
    if (initialPointerYRef.current !== null) {
      let deltaY = event.clientY - initialPointerYRef.current;
      // Para extender la cadena solo se consideran movimientos hacia abajo
      if (deltaY < 0) deltaY = 0;
      // Limitar el desplazamiento vertical a, por ejemplo, 50 píxeles
      const maxY = 50;
      if (deltaY > maxY) deltaY = maxY;
      const nowY = Date.now();
      const dtY = nowY - lastTimeYRef.current;
      const dY = deltaY - lastYRef.current;
      const velocityY = dtY > 0 ? dY / (dtY / 1000) : 0;
      velocityYRef.current = velocityY;
      lastTimeYRef.current = nowY;
      lastYRef.current = deltaY;
      y.set(deltaY);
    }
  };

  // Al soltar, se animan ambos valores a 0
  const handlePointerUp = (event) => {
    event.currentTarget.releasePointerCapture(event.pointerId);

    // Para la rotación: si se soltó con alta velocidad, aplicamos una animación de inercia
    const velocityThreshold = 50; // umbral en grados/segundo (ajusta según lo deseado)
    if (Math.abs(velocityXRef.current) > velocityThreshold) {
      // Animación de inercia que permite continuar girando varias vueltas
      const inertiaControls = animate(rotate, {
        type: 'inertia',
        velocity: velocityXRef.current,
        power: 0.8,
        timeConstant: 700,
        restDelta: 0.5
      });
      // Cuando la animación de inercia termina, se aplica una animación spring para estabilizar en 0
      inertiaControls.finished.then(() => {
        animate(rotate, 0, {
          type: 'spring',
          stiffness: 300,
          damping: 10
        });
      });
    } else {
      animate(rotate, 0, {
        type: 'spring',
        stiffness: 300,
        damping: 10,
        velocity: velocityXRef.current,
      });
    }

    // Para el movimiento vertical, se vuelve a 0 con spring
    animate(y, 0, {
      type: 'spring',
      stiffness: 300,
      damping: 10,
      velocity: velocityYRef.current,
    });

    initialOffsetXRef.current = null;
    initialPointerYRef.current = null;

    // logro
    if(onAchievementUnlock){
      onAchievementUnlock("keychain", "LLavero", "Has movido el llavero por primera vez .");
    }
  };




  return (
    <div
      ref={containerRef}
      style={{
        height: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        userSelect: 'none'
      }}
    >
      {/* Contenedor que rota (horizontal) alrededor del anclaje */}
      <motion.div
        style={{
          rotate: rotate,
          transformOrigin: 'top center'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Cadena cuya altura se ajusta dinámicamente */}
          {/* Cadena estilizada y dinámica */}
          <motion.div
            style={{
              width: '10px',
              height: chainHeight,
              background: 'repeating-linear-gradient(180deg, #8B5E3C, #8B5E3C 3px, #C8AD7F 3px, #C8AD7F 6px)',
              borderRadius: '2px',
              boxShadow: 'inset 0 0 3px rgba(0, 0, 0, 0.3)'
            }}
          />

          {/* Imagen del llavero: se captura el puntero para arrastrarla directamente */}
          <motion.img
            src={currentImage}
            alt="Llavero"
            draggable={false}
            style={{
              width: '100px',
              height: 'auto',
              cursor: 'grab',
              userSelect: 'none',
              WebkitUserDrag: 'none',
              y: y  // se mueve verticalmente según el motion value y
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default KeychainPendulumPointer;
