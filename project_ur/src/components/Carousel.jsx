import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCube,
  EffectCoverflow,
  EffectFlip,
  EffectFade,
} from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaPlay, FaPause, FaDownload, FaTimes } from "react-icons/fa";
import "project_ur/src/CarrouselStyles.css";
import ScrollProgressWheel from "./ScrollProgressWheel";
import { AnimatePresence, motion } from "framer-motion";

import img1 from "../assets/480_361.jpg";
import img2 from "../assets/480_364.jpg";
import img3 from "../assets/480_366.jpg";
import img4 from "../assets/480_367.jpg";
import img5 from "../assets/480_368.png";
import img6 from "../assets/480_369.png";
import img7 from "../assets/480_370.jpg";
import img8 from "../assets/480_371.png";
import img9 from "../assets/480_372.png";

export const Carousel = ({
  setIsModalOpen,
  isModalOpen,
  onAchievementUnlock,
}) => {
  // console.log("onAchievementUnlock recibido en Carousel.jsx:", onAchievementUnlock);
  const swiperRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [slideChangeCount, setSlideChangeCount] = useState(0);
  const [hasPausedCarousel, setHasPausedCarousel] = useState(false);
  const [modalOpenCount, setModalOpenCount] = useState(0); //contador de veces que se abrio el modal
  const [hasLoggedManualChange, setHasLoggedManualChange] = useState(false);
  const [manualSlideChangeCount, setManualSlideChangeCount] = useState(0);

  const calculateProgress = () => {
    return activeIndex / (images.length - 1);
  };

  const images = [
    { src: img1, caption: "Raft" },
    { src: img2, caption: "Raft" },
    { src: img3, caption: "Raft" },
    { src: img4, caption: "Raft " },
    { src: img5, caption: "Raft" },
    { src: img6, caption: "Raft" },
    { src: img7, caption: "Elden Ring" },
    { src: img8, caption: "Momento mágico en Elden Ring" },
    { src: img9, caption: "Elden Ring" },
  ];

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPaused) {
        swiperRef.current.autoplay.start();
      } else {
        swiperRef.current.autoplay.stop();
        // logro pausar manualmente
        if (!hasPausedCarousel && onAchievementUnlock) {
          onAchievementUnlock(
            "carrusel",
            "Momento de Reflexion",
            "Has pausado las imagenes por primera vez."
          );
          setHasPausedCarousel(true);
        }
      }
      setIsPaused(!isPaused);
    }
  };
  const handleSlideChange = (swiper) => {
    if (!swiper.params.autoplay.enabled) {
      // Cambio manual detectado
      handleManualSlideChange();
    } else {
    }
  };
  const handleTransitionStart = () => {
    console.log("Transición iniciada");
  };

  const handleManualSlideChange = () => {
    setManualSlideChangeCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount === 1 && !hasLoggedManualChange) {
        onAchievementUnlock(
          "carrusel",
          "Cambio Manual",
          "Has cambiado la imagen manualmente por primera vez."
        );
        setHasLoggedManualChange(true);
      }

      if (newCount === 5) {
        onAchievementUnlock(
          "carrusel",
          "Cinco Cambios Manuales",
          "Has cambiado la imagen manualmente 5 veces."
        );
      }

      if (newCount === 10) {
        onAchievementUnlock(
          "carrusel",
          "Diez Cambios Manuales",
          "Has cambiado la imagen manualmente 10 veces."
        );
      }

      return newCount;
    });
  };

  useEffect(() => {
    const nextButton = document.querySelector(".custom-next");
    const prevButton = document.querySelector(".custom-prev");

    if (nextButton) {
      nextButton.addEventListener("click", handleManualSlideChange);
    }

    if (prevButton) {
      prevButton.addEventListener("click", handleManualSlideChange);
    }

    return () => {
      if (nextButton) {
        nextButton.removeEventListener("click", handleManualSlideChange);
      }

      if (prevButton) {
        prevButton.removeEventListener("click", handleManualSlideChange);
      }
    };
  }, []);

  const openModal = (src) => {
    setCurrentImage(src);
    setIsModalOpen(true);
    setModalOpenCount((prev) => {
      const newCount = prev + 1;
      // console.log("contador de veces que se abrio el modal",newCount);
      if (newCount === 1 && onAchievementUnlock) {
        // console.log("primer recuerdo");
        onAchievementUnlock(
          "carrusel",
          "Primer Recuerdo",
          "Has abierto el primer recuerdo."
        );
      }
      if (newCount === 3 && onAchievementUnlock) {
        // console.log("tercer recuerdo");
        onAchievementUnlock(
          "carrusel",
          "Tercer Recuerdo",
          "Has abierto 3 recuerdos."
        );
      }
      if (newCount === 5 && onAchievementUnlock) {
        // console.log("quinto recuerdo");
        onAchievementUnlock(
          "carrusel",
          "Viajera Inalcanzable",
          "Has abierto 5 recuerdos."
        );
      }
      return newCount;
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage("");
  };

  return (
    <div
      style={{
        width: "90%",
        height: "90%",
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
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Autoplay,
          EffectCoverflow,
          EffectCube,
          EffectFlip,
          EffectFade,
        ]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onTransitionStart={handleTransitionStart}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex);
          handleSlideChange(swiper);
        }}
        spaceBetween={30}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect="coverflow"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} style={{ width: "100%", height: "100%" }}>
            <motdiv style={{ textAlign: "left" }}>
              <img
                src={image.src}
                alt={image.caption}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "10px",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onClick={() => openModal(image.src)}
              />
              {/* Boton de descarga dentro del carrusel */}
              <a
                href={image.src}
                download={`imagen-${index + 1}.jpg`}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "#ff758c",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "3px",
                  textDecoration: "none",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                <FaDownload />
              </a>
            </motdiv>
          </SwiperSlide>
        ))}
        <div className="custom-prev">
          <FiChevronLeft size={30} />
        </div>
        <div className="custom-next">
          <FiChevronRight size={30} />
        </div>
      </Swiper>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          bottom: "-2px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          height: "90%",
          padding: "30px 55px",
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <AnimatePresence mode="wait">
  <motion.div
    key={activeIndex} // La clave única asegura que se re-renderice
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    style={{
      flex: 1,
      textAlign: "left",
      fontSize: "40px",
      color: "#ff758c",
      fontWeight: "bold",
      fontFamily: "'Pacifico', cursive",
      overflow: "hidden",
      display: "inline-block",
    }}
  >
    {images[activeIndex].caption.split(" ").map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: "100%" }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: "-100%" }}
        transition={{
          duration: 0.25,
          delay: index * 0.01, // Retraso para el efecto de ola
          ease: "easeOut",
        }}
        style={{
          display: "inline-block",
          whiteSpace: char === " " ? "pre" : "normal", // Mantenimiento del espacio
        }}
      >
        {char === " " ? "\u00A0" : char} {/* Espacio no envolvente */}
      </motion.span>
    ))}
  </motion.div>
</AnimatePresence>


        <div
          style={{
            flex: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.button
            onClick={toggleAutoplay}
            whileHover={{ scale: 1.1 }}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "none",
              background: "#ff758c",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            {isPaused ? <FaPlay /> : <FaPause />}
          </motion.button>
        </div>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxHeight: "90%",
              maxWidth: "1700px",
              width: "100%",
              padding: "30px",
            }}
          >
            <img
              src={currentImage}
              alt="Modal"
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                borderRadius: "10px",
                boxShadow: "0 8px 20px rgba(255, 255, 255, 0.5)",
              }}
            />
            {/* Boton de descarga dentro del Modal */}
            <a
              href={currentImage}
              download={`imagen-${activeIndex + 1}.jpg`}
              style={{
                position: "absolute",
                top: "50px",
                right: "130px",
                background: "#ff758c",
                color: "white",
                padding: "5px 10px",
                borderRadius: "3px",
                textDecoration: "none",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              <FaDownload /> Descargar
            </a>
            {/* Boton de cerrar en el modal */}
            <a
              style={{
                position: "absolute",
                top: "50px",
                left: "140px",
                background: "#ff758c",
                color: "white",
                padding: "5px 10px",
                borderRadius: "71px",
                textDecoration: "none",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <FaTimes />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
