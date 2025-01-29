import { motion } from "framer-motion";
import Player from "./Player";

const AnimatedPlayer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Comienza invisible y desplazado hacia abajo
      whileInView={{ opacity: 1, y: 0 }} // Se anima cuando entra en la vista
      viewport={{ once: true }} // Solo se anima la primera vez que entra en la vista
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Player />
    </motion.div>
  );
};

export default AnimatedPlayer;
