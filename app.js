AOS.init({ once: true, duration: 650, offset: 50, easing: 'ease-out-cubic' });

const DATA = {
  keiko: {
    name: 'Keiko Fujimori', party: 'Fuerza Popular',
    av: 'K', avCls: 'cav-k', itemCls: 'mk-item',
    topics: {
      trabajo:   { body: 'Promoverá la inversión privada y créditos para emprendedores y MYPE.', focus: 'Más empresas = más empleo' },
      educacion: { body: 'Más inversión en colegios técnicos y universitarios. Alianza con empresas para prácticas.', focus: 'Educación conectada con el mercado' },
      seguridad: { body: 'Más policías en las calles, tecnología y mano dura contra la delincuencia.', focus: 'Orden y autoridad para tu seguridad' },
      salud:     { body: 'Fortalecerá servicios de salud mental en colegios y universidades. Más centros de atención.', focus: 'Prevención y atención accesible' },
      vivienda:  { body: 'Créditos hipotecarios más accesibles y programas para vivienda joven.', focus: 'Facilitar la compra de tu primera vivienda' },
      ambiente:  { body: 'Promoverá energías limpias, gestión de residuos y más áreas verdes en ciudades.', focus: 'Desarrollo sostenible con inversión' },
    },
  },
  castillo: {
    name: 'Pedro Castillo', party: 'Juntos por el Perú',
    av: 'JP', avCls: 'cav-jp', itemCls: 'mjp-item',
    topics: {
      trabajo:   { body: 'Impulsará empleo joven en obras públicas, agricultura y MYPE con compras del Estado.', focus: 'El Estado genera empleo directo' },
      educacion: { body: 'Universidad pública gratuita y de calidad. Más presupuesto para educación básica.', focus: 'Educación como derecho, sin costo' },
      seguridad: { body: 'Prevención del delito con inclusión social, deporte y educación comunitaria.', focus: 'Atacar las causas, no solo castigar' },
      salud:     { body: 'Salud mental como prioridad nacional. Más psicólogos en colegios y centros de salud.', focus: 'Salud mental para todos y gratuita' },
      vivienda:  { body: 'Construcción de viviendas populares y regulación de alquileres justos.', focus: 'Vivienda digna como derecho' },
      ambiente:  { body: 'Transición ecológica, protección de recursos naturales y más fiscalización ambiental.', focus: 'Cuidar el planeta y las comunidades' },
    },
  },
};

const FULL = {
  keiko: [
    { icon: '💼', title: 'Empleo y Emprendimiento', body: 'Promoverá la inversión privada y facilitará créditos para emprendedores y MYPE.', focus: 'Más empresas = más empleo' },
    { icon: '📚', title: 'Educación', body: 'Más inversión en colegios técnicos y universitarios públicos. Alianza con empresas para prácticas.', focus: 'Educación conectada con el mercado' },
    { icon: '❤️', title: 'Salud Mental y Bienestar', body: 'Fortalecerá servicios de salud mental en colegios y universidades. Más centros de atención.', focus: 'Prevención y atención accesible' },
    { icon: '🏠', title: 'Vivienda y Alquileres', body: 'Créditos hipotecarios más accesibles y programas para vivienda joven.', focus: 'Facilitar compra de tu primera vivienda' },
    { icon: '🛡️', title: 'Seguridad Ciudadana', body: 'Más policías en las calles, tecnología y mano dura contra delincuentes.', focus: 'Orden y autoridad para tu seguridad' },
    { icon: '🌱', title: 'Medio Ambiente y Futuro', body: 'Promoverá energías limpias y gestión de residuos. Más áreas verdes en ciudades.', focus: 'Desarrollo sostenible con inversión' },
  ],
  castillo: [
    { icon: '🏗️', title: 'Empleo y Emprendimiento', body: 'Impulsará empleo joven en obras públicas, agricultura y MYPE con compras del Estado.', focus: 'El Estado genera empleo directo' },
    { icon: '🎓', title: 'Educación', body: 'Universidad pública gratuita y de calidad. Más presupuesto para educación básica.', focus: 'Educación como derecho, sin costo' },
    { icon: '❤️', title: 'Salud Mental y Bienestar', body: 'Salud mental como prioridad nacional. Más psicólogos en colegios y centros de salud.', focus: 'Salud mental para todos y gratuita' },
    { icon: '🏘️', title: 'Vivienda y Alquileres', body: 'Construcción de viviendas populares y regulación de alquileres justos.', focus: 'Vivienda digna como derecho' },
    { icon: '🛡️', title: 'Seguridad Ciudadana', body: 'Prevención del delito con inclusión social, deporte y educación.', focus: 'Atacar las causas, no solo castigar' },
    { icon: '🌍', title: 'Medio Ambiente y Futuro', body: 'Transición ecológica y protección de recursos naturales. Más fiscalización ambiental.', focus: 'Cuidar el planeta y las comunidades' },
  ],
};

const TOPIC_LABEL = {
  trabajo: '💼 Trabajo', educacion: '📚 Educación', seguridad: '🛡️ Seguridad',
  salud: '❤️ Salud', vivienda: '🏠 Vivienda', ambiente: '🌱 Planeta',
};

/* ── NAV scroll tint ──────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60
    ? 'rgba(8,10,16,.95)' : 'rgba(8,10,16,.8)';
}, { passive: true });

/* ── MODAL ───────────────────────────────────────────── */
const modal = document.getElementById('modal');
const modalBg = document.getElementById('modal-bg');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

function openModal(key) {
  const c = DATA[key];
  const items = FULL[key].map(t => `
    <div class="modal-item ${c.itemCls}">
      <div class="modal-item-title">${t.icon} ${t.title}</div>
      <div class="modal-item-body">${t.body}</div>
      <div class="modal-item-focus">→ ${t.focus}</div>
    </div>
  `).join('');
  modalContent.innerHTML = `
    <div class="modal-hero">
      <div class="cav ${c.avCls}">${c.av}</div>
      <div><h3>${c.name}</h3><span>${c.party}</span></div>
    </div>
    <div class="modal-items">${items}</div>
  `;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.ccard').forEach(card => {
  card.addEventListener('click', () => openModal(card.dataset.candidate));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(card.dataset.candidate); } });
});
modalClose.addEventListener('click', closeModal);
modalBg.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── COMPARADOR bars ─────────────────────────────────── */
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  barsAnimated = true;
  document.querySelectorAll('.comp-item').forEach(item => {
    const k  = item.dataset.k;
    const jp = item.dataset.jp;
    const fills = item.querySelectorAll('.comp-fill');
    fills[0].style.width = k  + '%';
    fills[1].style.width = jp + '%';
  });
}
const compObs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) animateBars();
}, { threshold: .2 });
const compGrid = document.querySelector('.comp-grid');
if (compGrid) compObs.observe(compGrid);

/* ── INTERACTIVO ─────────────────────────────────────── */
const resultArea = document.getElementById('result-area');

document.querySelectorAll('.tpill').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tpill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderResult(btn.dataset.t);
    resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});

function renderResult(topic) {
  const k  = DATA.keiko.topics[topic];
  const jp = DATA.castillo.topics[topic];
  resultArea.innerHTML = `
    <p style="font-size:.82rem;color:#6b7280;margin-bottom:1rem;">Propuestas sobre <strong style="color:#eef0f6">${TOPIC_LABEL[topic]}</strong></p>
    <div class="result-cards">
      <div class="result-card rk">
        <div class="rc-head"><span class="rc-dot"></span><span>Fuerza Popular</span></div>
        <div class="rc-body">${k.body}</div>
        <div class="rc-focus">→ ${k.focus}</div>
      </div>
      <div class="result-card rjp">
        <div class="rc-head"><span class="rc-dot"></span><span>Juntos por el Perú</span></div>
        <div class="rc-body">${jp.body}</div>
        <div class="rc-focus">→ ${jp.focus}</div>
      </div>
    </div>
    <button class="result-reset" id="btn-reset">
      <i class="fa-solid fa-rotate-left"></i> Elegir otro tema
    </button>
  `;
  document.getElementById('btn-reset').addEventListener('click', () => {
    document.querySelectorAll('.tpill').forEach(b => b.classList.remove('active'));
    resultArea.innerHTML = '';
  });
}

/* ── SHARE ───────────────────────────────────────────── */
document.getElementById('btn-share').addEventListener('click', async () => {
  const shareData = {
    title: 'Tu Voto Vale · Infórmate',
    text: 'Conoce a los candidatos en menos de 2 minutos antes de votar.',
    url: window.location.href,
  };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch (_) {}
    return;
  }
  try {
    await navigator.clipboard.writeText(window.location.href);
    const btn = document.getElementById('btn-share');
    const prev = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Enlace copiado!';
    setTimeout(() => { btn.innerHTML = prev; }, 2200);
  } catch (_) {}
});
