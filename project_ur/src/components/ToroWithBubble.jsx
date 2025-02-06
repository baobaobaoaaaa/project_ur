import React,{useState} from "react";
import "project_ur/src/Presenter.css"
import toroimagenpres from "project_ur/src/assets/presentation/toroinouesilueta.png";

const ToroWithBubble = () => {

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const handleNextText = () => {
    setCurrentTextIndex((prev) => (prev + 1) % bubbleTexts.length);
  };

    // Lista de textos para la burbuja
  const bubbleTexts = [
    "Desbloquea logros y explóralos en el menú de Logros.",
    "Haz clic en las imágenes para abrir los recuerdos.",
    "Reproduce música y desbloquea logros musicales.",
    "Explora videos en el reproductor de PSP."
  ];

  const containerStyle = {
    position: "fixed",
    bottom: "20px", // Ajusta según la posición deseada
    left: "20px", // Ajusta según la posición deseada
    display: "flex",
    flexDirection: "column", // Para que el toro esté debajo de la burbuja
    alignItems: "center",
    zIndex: 1000,
  };

  const bubbleStyle = {
    background: "white",
    padding: "10px 15px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "10px", // Espaciado entre la burbuja y el toro
    color: "#333",
    maxWidth: "200px",
  };

  const toroStyle = {
    width: "100px", // Ajusta el tamaño del toro
    height: "auto",
  };

  const buttonStyle = {
    position: "absolute",
    bottom: "-10px",
    right: "-15px",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "10px",
  };
  const bubbleArrowStyle = {
    content: "''",
    top:"113px",
    right:"50px",
    position: "absolute",
    bottom: "-10px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "0",
    height: "0",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: "10px solid white",
  };


  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>
        <p>{bubbleTexts[currentTextIndex]}</p>
        <div style={bubbleArrowStyle}></div>
        <div style={buttonStyle} onClick={handleNextText}>➡</div>
      </div>
      <img
        src={toroimagenpres}
        alt="Toro Inoue"
        style={toroStyle}
      />
    </div>
  );
};

export default ToroWithBubble;
