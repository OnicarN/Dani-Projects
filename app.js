(() => {
  const videos = window.VIDEOS || [];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  $('year').textContent = new Date().getFullYear();
  $('count').textContent = `${videos.length} ${videos.length === 1 ? 'vídeo' : 'vídeos'}`;

  /* ---------- Rejilla de proyectos ---------- */
  const projects = window.PROJECTS || [];
  const projGrid = $('projGrid');
  if (projGrid) {
    projGrid.innerHTML = projects.map((p, i) => `
      <article class="proj-card reveal" style="transition-delay:${(i % 3) * 0.08}s">
        <span class="proj-num">${String(i + 1).padStart(2, '0')}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <div class="tags">${(p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
        <a class="proj-link" href="${esc(p.link)}" ${p.link?.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>${esc(p.linkLabel || 'Ver más')}</a>
      </article>`).join('');
  }

  /* ---------- Título 3D que sigue al ratón ---------- */
  const title = $('title3d');
  if (!reduced) {
    window.addEventListener('pointermove', (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      title.style.transform = `rotateY(${x * 22}deg) rotateX(${-y * 18}deg)`;
    });
  }

  /* ---------- Reproductor ---------- */
  const dialog = $('player');
  const video = $('video');
  let lastFocus = null;

  function openVideo(i) {
    const v = videos[i];
    if (!v) return;
    lastFocus = document.activeElement;
    video.src = v.video;
    if (v.poster) video.poster = v.poster; else video.removeAttribute('poster');
    $('pTitle').textContent = v.title;
    $('pDesc').textContent = v.description || v.subtitle || '';
    $('pTags').innerHTML = (v.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('');
    dialog.classList.remove('closing');
    dialog.showModal();
    video.play().catch(() => {});
  }

  function closeVideo() {
    if (!dialog.open) return;
    video.pause();
    if (reduced) { finishClose(); return; }
    dialog.classList.add('closing');
    setTimeout(finishClose, 380);
  }
  function finishClose() {
    dialog.classList.remove('closing');
    dialog.close();
    video.removeAttribute('src');
    video.load();
    lastFocus?.focus();
  }
  $('close').addEventListener('click', closeVideo);
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); closeVideo(); });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) closeVideo(); });

  /* ---------- Carrusel 3D ---------- */
  const stage = $('cfStage');
  const dots = $('dots');
  let active = 0;

  stage.innerHTML = videos.map((v, i) => `
    <button class="cf-card" data-i="${i}" aria-label="Ver ${esc(v.title)}">
      <img src="${esc(v.poster)}" alt="" loading="lazy" draggable="false" />
      <span class="shade"></span>
      <span class="play" aria-hidden="true"></span>
      <span class="label"><strong>${esc(v.title)}</strong><span>${esc(v.subtitle)}</span></span>
    </button>`).join('');
  dots.innerHTML = videos.map((v, i) => `<button role="tab" aria-label="${esc(v.title)}" data-i="${i}"></button>`).join('');
  const cards = [...stage.children];

  function layout() {
    cards.forEach((card, i) => {
      const o = i - active;
      const a = Math.abs(o);
      const x = o * Math.min(window.innerWidth * 0.34, 420);
      const z = -a * 260;
      const ry = o === 0 ? 0 : -Math.sign(o) * Math.min(55, 38 + a * 6);
      card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${ry}deg)`;
      card.style.opacity = a > 2 ? 0 : 1 - a * 0.25;
      card.style.filter = o === 0 ? 'none' : `brightness(${0.6 - a * 0.1})`;
      card.style.zIndex = 100 - a;
      card.classList.toggle('active', o === 0);
      card.tabIndex = o === 0 ? 0 : -1;
    });
    [...dots.children].forEach((d, i) => d.setAttribute('aria-selected', String(i === active)));
    const v = videos[active];
    $('cfInfo').innerHTML = v ? `<b>${esc(v.title)}</b> · ${esc(v.date || '')}` : '';
  }
  function go(i) { active = (i + videos.length) % videos.length; layout(); }

  cards.forEach((card) => card.addEventListener('click', () => {
    const i = Number(card.dataset.i);
    if (moved) return;
    if (i === active) openVideo(i); else go(i);
  }));
  dots.addEventListener('click', (e) => { if (e.target.dataset.i) go(Number(e.target.dataset.i)); });
  $('prev').addEventListener('click', () => go(active - 1));
  $('next').addEventListener('click', () => go(active + 1));
  $('coverflow').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') go(active - 1);
    if (e.key === 'ArrowRight') go(active + 1);
  });

  // Arrastrar con ratón o dedo
  let startX = null, moved = false;
  const cf = $('coverflow');
  cf.addEventListener('pointerdown', (e) => { startX = e.clientX; moved = false; });
  window.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) { moved = true; go(active + (dx < 0 ? 1 : -1)); setTimeout(() => { moved = false; }, 50); }
    startX = null;
  });
  window.addEventListener('resize', layout);
  layout();

  /* ---------- Rejilla con inclinación 3D ---------- */
  const grid = $('grid');
  grid.innerHTML = videos.map((v, i) => `
    <button class="card reveal" data-i="${i}" style="transition-delay:${(i % 3) * 0.08}s">
      <span class="thumb">
        <img src="${esc(v.poster)}" alt="" loading="lazy" />
        <span class="play" aria-hidden="true"></span>
      </span>
      <span class="body">
        <span class="ctitle">${esc(v.title)}</span>
        <span class="csub">${esc(v.subtitle)}</span>
        <span class="meta">
          <span class="tags">${(v.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</span>
          <span class="date">${esc(v.date || '')}</span>
        </span>
      </span>
      <span class="glare" aria-hidden="true"></span>
    </button>`).join('');

  grid.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => openVideo(Number(card.dataset.i)));
    if (reduced) return;
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.transform = `rotateY(${(px - 0.5) * 16}deg) rotateX(${(0.5 - py) * 14}deg) translateZ(10px)`;
      card.style.setProperty('--gx', `${px * 100}%`);
      card.style.setProperty('--gy', `${py * 100}%`);
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  /* ---------- Aparición al hacer scroll ---------- */
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) {
      const el = en.target;
      el.classList.add('in');
      io.unobserve(el);
      setTimeout(() => { el.style.transitionDelay = '0s'; el.classList.add('done'); }, 1300);
    }
  }), { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
})();
