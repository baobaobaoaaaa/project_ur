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

// imagenes nuevas 22-02-25
import imagebaonueva1 from "../assets/baonueva1.jpg";
import imagebaonueva2 from "../assets/baonueva2.jpg";
import imagebaonueva3 from "../assets/baonueva3.jpg";
import imagebaonueva4 from "../assets/baonueva4.jpg";
import imagebaonueva5 from "../assets/baonueva5.jpg";
import imagebaonueva6 from "../assets/baonueva6.jpg";
import imagebaonueva7 from "../assets/baonueva7.jpg";
import imagebaonueva8 from "../assets/baonueva8.jpg";
import imagebaonueva9 from "../assets/baonueva9.jpg";
import imagebaonueva10 from "../assets/baonueva10.jpg";
import imagebaonueva11 from "../assets/baonueva11.jpg";
import imagebaonueva12 from "../assets/baonueva12.jpg";
import imagebaonueva13 from "../assets/baonueva13.jpg";
import imagebaonueva14 from "../assets/baonueva14.jpg";
import imagebaonueva15 from "../assets/baonueva15.jpg";
import imagebaonueva16 from "../assets/baonueva16.jpg";
import imagebaonueva17 from "../assets/baonueva17.jpg";
import imagebaonueva18 from "../assets/baonueva18.jpg";


import img1 from "../assets/480_361.jpg";
import img2 from "../assets/480_364.jpg";
import img3 from "../assets/480_366.jpg";
import img4 from "../assets/480_367.jpg";
import img5 from "../assets/480_368.png";
import img6 from "../assets/480_369.png";
import img7 from "../assets/480_370.jpg";
import img8 from "../assets/480_371.png";
import img9 from "../assets/480_372.png";
import img10 from "../assets/413150_20250208001208_1.png";
import img11 from "../assets/1245620_20250105231837_1.png";
import img12 from "../assets/1245620_20250106012423_1.png";
import img13 from "../assets/1245620_20250106004759_1.png";
import img14 from "../assets/1245620_20250106012442_1.png";
import img15 from "../assets/1245620_20250106012543_1.png";
import img16 from "../assets/1245620_20250106012549_1.png";
import img17 from "../assets/1245620_20250109021802_1.png";
import img18 from "../assets/1245620_20250109022600_1.png";
import img19 from "../assets/1245620_20250109023252_1.png";
import img20 from "../assets/1245620_20250109023339_1.png";
import img21 from "../assets/1245620_20250109024110_1.png";
import img22 from "../assets/1245620_20250204235624_1.png";

export const Carousel = ({
  setIsModalOpen,
  isModalOpen,
  onAchievementUnlock,
}) => {
  const swiperRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState("");
  const [slideChangeCount, setSlideChangeCount] = useState(0);
  const [hasPausedCarousel, setHasPausedCarousel] = useState(false);
  const [modalOpenCount, setModalOpenCount] = useState(0);
  const [hasLoggedManualChange, setHasLoggedManualChange] = useState(false);
  const [manualSlideChangeCount, setManualSlideChangeCount] = useState(0);

  // Nuevo estado para el progreso del scroll
  const [scrollProgress, setScrollProgress] = useState(0);

  // Función para calcular el progreso del scroll
  const calculateScrollProgress = () => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      const totalSlides = swiper.slides.length;
      const currentSlide = swiper.realIndex + 1; // +1 porque el índice comienza en 0
      const progress = (currentSlide / totalSlides) * 100;
      setScrollProgress(progress);
    }
  };

  // Efecto para calcular el progreso cada vez que cambia el slide
  useEffect(() => {
    calculateScrollProgress();
  }, [activeIndex]);

  const images = [
    // imagenes nuevas 22-02-25
    { src: imagebaonueva1, caption: "Mimiendo" },
    { src: imagebaonueva2, caption: "Con el pipe" },
    { src: imagebaonueva3, caption: "Comiendo" },
    { src: imagebaonueva4, caption: "Juan Guarnizo y un huevo de pascua " },
    { src: imagebaonueva5, caption: "Tutito" },
    { src: imagebaonueva6, caption: "Festival de medusas" },
    { src: imagebaonueva7, caption: "Nuestra primera casita" },
    { src: imagebaonueva8, caption: "Posando" },
    { src: imagebaonueva9, caption: "Bao como conejo en el festival del huevo" },
    { src: imagebaonueva10, caption: "Bao como coneja en el festival del huevo" },
    { src: imagebaonueva11, caption: "Mejorando la foto" },
    { src: imagebaonueva12, caption: "Bailando" },
    { src: imagebaonueva13, caption: "Bailando" },
    { src: imagebaonueva14, caption: "Wenos pasos" },
    { src: imagebaonueva15, caption: "Mas baile" },
    { src: imagebaonueva16, caption: "No nos cansamos de bailar" },
    { src: imagebaonueva17, caption: "Hasta el piso" },
    { src: imagebaonueva18, caption: "Finalmente" },
    { src: img1, caption: "Bajo la luna" },
    { src: img2, caption: "Navegando" },
    { src: img3, caption: "Posando" },
    { src: img4, caption: "Tutito " },
    { src: img5, caption: "Fingiendo trabajar" },
    { src: img6, caption: "Fingiendo trabajar otra vez" },
    { src: img7, caption: "La boda" },
    { src: img8, caption: "Momento mágico <3" },
    { src: img9, caption: "Descanso en Nokron" },
    { src: img10, caption: "Nuestra granjita" },
    { src: img11, caption: "Mejorando armas" },
    { src: img12, caption: "Visitando a Ranni" },
    { src: img13, caption: ":)" },
    { src: img14, caption: "Mostrando el estilo a la Ranni" },
    { src: img15, caption: "Mostrando respeto a la Ranni 1" },
    { src: img16, caption: "Mostrando respeto a la Ranni 2" },
    { src: img17, caption: "Felicidad" },
    { src: img18, caption: "Uuuuh" },
    { src: img19, caption: "Implorandole a los dioses" },
    { src: img20, caption: "Cabezazo bonito" },
    { src: img21, caption: "Wuaja" },
    { src: img22, caption: "Posando en el arbol quemado" },
  ];

  const toggleAutoplay = () => {
    if (swiperRef.current) {
      if (isPaused) {
        swiperRef.current.autoplay.start();
      } else {
        swiperRef.current.autoplay.stop();
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
      handleManualSlideChange();
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
      if (newCount === 1 && onAchievementUnlock) {
        onAchievementUnlock(
          "carrusel",
          "Primer Recuerdo",
          "Has abierto el primer recuerdo."
        );
      }
      if (newCount === 3 && onAchievementUnlock) {
        onAchievementUnlock(
          "carrusel",
          "Tercer Recuerdo",
          "Has abierto 3 recuerdos."
        );
      }
      if (newCount === 5 && onAchievementUnlock) {
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
        border: "25px solid white",
        borderRadius: "1px",
        background: "white",
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
            <div style={{ textAlign: "center" }}>
              <img
                src={image.src}
                alt={image.caption}
                style={{
                  marginTop: "20px",
                  marginBottom: "-10px",
                  height: "100%",
                  width: "100%",
                  borderRadius: "1px",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onClick={() => openModal(image.src)}
              />
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
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-prev">
          <FiChevronLeft size={30} />
        </div>
        <div className="custom-next">
          <FiChevronRight size={30} />
        </div>
      </Swiper>

      {/* Barra de progreso */}
      <div
        style={{
          width: "100%",
          height: "5px",
          backgroundColor: "lightgray",
          borderRadius: "5px",
          marginTop: "10px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${scrollProgress}%`,
            height: "100%",
            backgroundColor: "#ff758c",
            borderRadius: "5px",
            transition: "width 0.3s ease",
          }}
        />
      </div>

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
          borderRadius: "1px",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
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
                  delay: index * 0.01,
                  ease: "easeOut",
                }}
                style={{
                  display: "inline-block",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char === " " ? "\u00A0" : char}
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