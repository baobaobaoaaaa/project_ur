const achievementsData = [
  {
    id: 1,
    titulo: "Primer Recuerdo",
    descripcion: "Has reproducido tu primer video.",
    icono: "🌟",
    desbloqueado: false,
    action: (playCount) => playCount === 1, // Se desbloquea al reproducir el primer video
  },
  {
    id: 2,
    titulo: "Melómano",
    descripcion: "Has escuchado 5 canciones.",
    icono: "🎵",
    desbloqueado: false,
    action: (songCount) => songCount >= 5, // Se desbloquea al escuchar 5 canciones
  },
  {
    id: 3,
    titulo: "Explorador",
    descripcion: "Visitaste todas las secciones de la página.",
    icono: "🗺️",
    desbloqueado: false,
    action: (visitedSections) => visitedSections >= 3, // Visitar todas las secciones
  },
];

export default achievementsData;
