import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Importa los íconos
import { FaPlay, FaPause } from "react-icons/fa";
import { useRef, useState } from "react";


import img1 from "../assets/480_361.jpg";
import img2 from "../assets/480_364.jpg";
import img3 from "../assets/480_366.jpg";
import img4 from "../assets/480_367.jpg";
import img5 from "../assets/480_368.png";
import img6 from "../assets/480_369.png";
import img7 from "../assets/480_370.jpg";
import img8 from "../assets/480_371.png";
import img9 from "../assets/480_372.png";

export const Carousel = () => {
  const swiperRef = useRef(null); // Referencia al carrusel
  const [isPaused, setIsPaused] = useState(false); // Estado de pausa

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPaused) {
        swiperRef.current.autoplay.start(); // Reanuda autoplay
        console.log("autoplay start: ", swiperRef.current);
      } else {
        swiperRef.current.autoplay.stop(); // Detiene autoplay
        console.log("autoplay stop: ", swiperRef.current);
      }
      setIsPaused(!isPaused); // Alterna el estado
    }
  };

  const images = [
    { src: img1, caption: "Recuerdo 1" },
    { src: img2, caption: "Recuerdo 2" },
    { src: img3, caption: "Recuerdo 3" },
    { src: img4, caption: "Recuerdo 4" },
    { src: img5, caption: "Recuerdo 5" },
    { src: img6, caption: "Recuerdo 6" },
    { src: img7, caption: "Recuerdo 7" },
    { src: img8, caption: "Recuerdo 8" },
    { src: img9, caption: "Recuerdo 9" },
  ];

  return (
    <div
      style={{
        maxHeight: "80%",
        overflow: "hidden",
        position: "relative",
        paddingBottom: "10px",
        margin: "0 auto",
        border: "5px solid #ff9a9e",
        borderRadius: "10px",
        background: "rgba(241, 224, 240, 0.6)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div className="custom-cursor-carousel"
        style={{position:"relative"}}
      
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          onSwiper={(swiper) => {
            console.log("Swiper instance:", swiper); // Verifica si se asigna correctamente
            swiperRef.current = swiper;}}
          spaceBetween={30}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{ clickable: true,
                        el: ".swiper-pagination",
           }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          style={{pointerEvents:"auto"}}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div style={{ textAlign: "left" }}>
                <img
                  src={image.src}
                  alt={image.caption}
                  style={{ width: "100%", borderRadius: "3px" }} // Bordes redondeados
                />
                <p style={{ marginTop: "10px", fontSize: "18px", 
                  flex: 1,
                  color: "#333", // Color del texto
                  fontWeight: "bold",
                  
                  paddingLeft: "15px",

                }}>
                  {image.caption}
                </p>
              </div>
            </SwiperSlide>
          ))}
          {/* Flechas personalizadas */}
          <div className="custom-prev">
            <FiChevronLeft size={30} />
          </div>
          <div className="custom-next">
            <FiChevronRight size={30} />
          </div>
        </Swiper>


        {/* empiezan las pruebas */}
        <div
          style={{
            display: "flex",
            alignItems: "center", // Centra verticalmente los elementos
            justifyContent: "space-between", // Alinea el texto, botón y puntos
            position: "relative",
            bottom: "2px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%", // Ajusta el ancho del contenedor
            padding: "30px 55px", // Añade espacio interno
            background: "rgba(255, 255, 255, 0.8)", // Fondo translúcido
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Sombra
          }}
        >
  {/* Nombre del recuerdo */}
  <div
    style={{
      flex: 1,
      textAlign: "left", // Alinea el texto a la izquierda
      fontSize: "16px",
      color: "#333", // Color del texto
      fontWeight: "bold",
    }}
  >
  </div>

  {/* Botón de pausa */}
  <div
    style={{
      flex: 0, // Botón centrado
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div 
    style={{
      position:"absolute",
      zIndex: 15,
      bottom: "-40px",
      left: "50%",
      transform: "translateX(-50%)",

    }}>
      <button
      onClick={() => {
        console.log("Button clicked");
        toggleAutoplay();}}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          padding: "10px",
          left: "50%",
          bottom: "50%",
          transform: "translate(-50%, -40%)",
          border: "0px solid red",
          background: "#ff758c", // Color del botón
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          pointerEvents: "auto",
          zIndex: 15,
        }}
      >
      {isPaused ? <FaPlay /> : <FaPause />}
      {/* {console.log("Button rendered")} */}
    </button>
    /</div>
  </div>

  {/* Puntos de navegación */}
  <div

  >
    <div className="swiper-pagination" />
  </div>
</div>

{/* hasta aqui con las pruebas */}


      </div>
    </div>
  );
};

export default Carousel;
