/*
  LISTA DE VÍDEOS DE LA GALERÍA
  ─────────────────────────────
  Para añadir un vídeo nuevo:
    1. Copia el archivo .mp4 a la carpeta "videos/".
    2. (Opcional) Copia una imagen de portada .jpg a la carpeta "img/".
    3. Añade un bloque { ... } más abajo, copiando uno de los que ya hay.
  El primero de la lista es el que sale destacado.
*/
window.VIDEOS = [
  {
    title: "Criba · Tráiler",
    subtitle: "Tráiler de presentación con música original",
    description: "Tráiler de Criba, una web que ayuda a las empresas a leer currículums con IA. Banda sonora compuesta y sincronizada con cada momento del vídeo.",
    video: "videos/criba-trailer.mp4",
    poster: "img/criba-trailer.jpg",
    tags: ["Tráiler", "Edición", "Motion"],
    date: "Octubre 2026",
  },
  {
    title: "Criba · Demo de la web",
    subtitle: "Recorrido completo por la aplicación",
    description: "Registro, creación de una vacante, análisis real de currículums con Gemini, ranking de candidatos, informe, comparativa y borrado. Hecho con React, Spring Boot y PostgreSQL.",
    video: "videos/criba-demo.mp4",
    poster: "img/criba-demo.jpg",
    tags: ["Web", "React", "Spring Boot", "IA"],
    date: "Octubre 2026",
  },
];
