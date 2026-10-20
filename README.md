# Dani Projects

Portfolio con animaciones 3D: una sección de proyectos y una galería de vídeos. Es una web estática (HTML, CSS y JavaScript), sin instalar nada.

## Verla en tu ordenador

Haz doble clic en `index.html`.

## Publicarla gratis con GitHub Pages (unos 5 minutos)

1. Entra en https://github.com y crea una cuenta si no tienes.
2. Pulsa **New repository** (botón verde o el `+` de arriba a la derecha).
   - Nombre: `dani-projects` (o el que quieras).
   - Marca **Public**.
   - Pulsa **Create repository**.
3. En la página del repositorio pulsa **uploading an existing file**.
4. Arrastra **todo el contenido** de esta carpeta (`index.html`, `styles.css`, `app.js`, `videos.js`, `projects.js`, `.nojekyll` y las carpetas `videos` e `img`) y pulsa **Commit changes**.
5. Ve a **Settings → Pages**.
   - En *Source* elige **Deploy from a branch**.
   - En *Branch* elige **main** y la carpeta **/ (root)**. Pulsa **Save**.
6. Espera 1 o 2 minutos y recarga. Arriba saldrá el enlace:
   `https://TU-USUARIO.github.io/dani-projects/`

Ese es el enlace que le pasas a tu profesor.

> Si `.nojekyll` no aparece al arrastrar (los archivos que empiezan por punto a veces se ocultan), no pasa nada: la web funciona igual.

## Añadir un proyecto nuevo

Abre `projects.js` y copia uno de los bloques `{ ... }` cambiando el título, la descripción, las etiquetas y el enlace (a GitHub o a `#galeria`).

## Añadir un vídeo nuevo

1. Copia el vídeo `.mp4` a la carpeta `videos/`.
2. (Opcional) Pon una imagen de portada `.jpg` en `img/`.
3. Abre `videos.js` y copia uno de los bloques `{ ... }` cambiando el título, la descripción y los nombres de archivo.
4. Sube los archivos nuevos a GitHub (**Add file → Upload files**). En un minuto aparecen en la web.

## Límites de GitHub

- Cada archivo puede pesar como máximo **100 MB** (al subirlo desde la web, **25 MB**).
- Si un vídeo pesa más, súbelo a YouTube o Google Drive, o comprímelo con HandBrake.
