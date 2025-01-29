import { motion } from "framer-motion";
import Carousel from "./Carousel";
import "project_ur/src/CarrouselStyles.css";

const AnimatedCarousel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} // Aparece más pequeño y transparente
      animate={{ opacity: 1, scale: 1 }} // Se hace visible con tamaño normal
      transition={{ duration: 0.2, ease: "easeOut" }} // Ajuste de duración y transición
    >
      <Carousel />
    </motion.div>
  );
};

export default AnimatedCarousel;
