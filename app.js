AOS.init({ once: true, duration: 600, offset: 60 });

const DATA = {
  keiko: {
    name: 'Keiko Fujimori',
    party: 'Fuerza Popular',
    badge: 'K',
    cls: 'mk',
    topics: {
      trabajo:   { body: 'Promoverá la inversión privada y créditos para emprendedores y MYPE.', focus: 'Más empresas = más empleo' },
      educacion: { body: 'Más inversión en colegios técnicos y universitarios. Alianza con empresas para prácticas.', focus: 'Educación conectada con el mercado' },
      seguridad: { body: 'Más policías en las calles, tecnología y mano dura contra delincuentes.', focus: 'Orden y autoridad para tu seguridad' },
      salud:     { body: 'Fortalecerá servicios de salud mental en colegios y universidades.', focus: 'Prevención y atención accesible' },
      vivienda:  { body: 'Créditos hipotecarios más accesibles y programas para vivienda joven.', focus: 'Facilitar la compra de tu primera vivienda' },
      ambiente:  { body: 'Promoverá energías limpias, gestión de residuos y más áreas verdes.', focus: 'Desarrollo sostenible con inversión' },
    },
  },
  castillo: {
    name: 'José Pedro Castillo',
    party: 'Juntos por el Perú',
    badge: 'JP',
    cls: 'mjp',
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

const TOPIC_LABELS = {
  trabajo:   '💼 Trabajo',
  educacion: '📚 Educación',
  seguridad: '🛡️ Seguridad',
  salud:     '❤️ Salud',
  vivienda:  '🏠 Vivienda',
  ambiente:  '🌱 Planeta',
};

const FULL_DATA = {
  keiko: [
    { icon: '💼', title: 'Empleo y Emprendimiento', body: 'Promoverá la inversión privada y facilitará créditos para emprendedores y MYPE.', focus: 'Más empresas = más empleo' },
    { icon: '📚', title: 'Educación', body: 'Más inversión en colegios técnicos y universitarios públicos. Alianza con empresas para prácticas.', focus: 'Educación conectada con el mercado' },
    { icon: '❤️', title: 'Salud Mental', body: 'Fortalecerá servicios de salud mental en colegios y universidades. Más centros de atención.', focus: 'Prevención y atención accesible' },
    { icon: '🏠', title: 'Vivienda', body: 'Créditos hipotecarios más accesibles y programas para vivienda joven.', focus: 'Facilitar compra de tu primera vivienda' },
    { icon: '🛡️', title: 'Seguridad Ciudadana', body: 'Más policías en las calles, tecnología y mano dura contra delincuentes.', focus: 'Orden y autoridad para tu seguridad' },
    { icon: '🌱', title: 'Medio Ambiente', body: 'Promoverá energías limpias y gestión de residuos. Más áreas verdes en ciudades.', focus: 'Desarrollo sostenible con inversión' },
  ],
  castillo: [
    { icon: '🏗️', title: 'Empleo y Emprendimiento', body: 'Impulsará empleo joven en obras públicas, agricultura y MYPE con compras del Estado.', focus: 'El Estado genera empleo directo' },
    { icon: '🎓', title: 'Educación', body: 'Universidad pública gratuita y de calidad. Más presupuesto para educación básica.', focus: 'Educación como derecho, sin costo' },
    { icon: '❤️', title: 'Salud Mental', body: 'Salud mental como prioridad nacional. Más psicólogos en colegios y centros de salud.', focus: 'Salud mental para todos y gratuita' },
    { icon: '🏘️', title: 'Vivienda', body: 'Construcción de viviendas populares y regulación de alquileres justos.', focus: 'Vivienda digna como derecho' },
    { icon: '🛡️', title: 'Seguridad Ciudadana', body: 'Prevención del delito con inclusión social, deporte y educación.', focus: 'Atacar las causas, no solo castigar' },
    { icon: '🌍', title: 'Medio Ambiente', body: 'Transición ecológica y protección de recursos naturales. Más fiscalización ambiental.', focus: 'Cuidar el planeta y las comunidades' },
  ],
};

function buildModal(candidateKey) {
  const c = DATA[candidateKey];
  const full = FULL_DATA[candidateKey];
  const rows = full.map(t => `
    <div class="modal-topic ${c.cls}">
      <div class="modal-topic-title">${t.icon} ${t.title}</div>
      <div class="modal-topic-body">${t.body}</div>
      <div class="modal-topic-focus">Enfoque: ${t.focus}</div>
    </div>
  `).join('');
  return `
    <div class="modal-header">
      <div class="party-badge badge-${candidateKey === 'keiko' ? 'k' : 'jp'}">${c.badge}</div>
      <div class="card-info">
        <h3>${c.name}</h3>
        <span class="party-name">${c.party}</span>
      </div>
    </div>
    <div class="modal-topics">${rows}</div>
  `;
}

const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.candidate-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.candidate;
    modalContent.innerHTML = buildModal(key);
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') card.click();
  });
});

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function closeModal() {
  overlay.classList.add('hidden');
  document.body.style.overflow = '';
}

function animateBars() {
  document.querySelectorAll('.bar-fill').forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
}

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateBars();
      barObserver.disconnect();
    }
  });
}, { threshold: 0.2 });

const compareTable = document.querySelector('.compare-table');
if (compareTable) barObserver.observe(compareTable);

const topicBtns = document.querySelectorAll('.topic-btn');
const resultBox = document.getElementById('result-box');
const resultInner = document.getElementById('result-inner');
const btnReset = document.getElementById('btn-reset');

topicBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const topic = btn.dataset.topic;
    topicBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    showResult(topic);
  });
});

btnReset.addEventListener('click', () => {
  topicBtns.forEach(b => b.classList.remove('active'));
  resultBox.classList.add('hidden');
});

function showResult(topic) {
  const k  = DATA.keiko.topics[topic];
  const jp = DATA.castillo.topics[topic];
  const label = TOPIC_LABELS[topic];

  resultInner.innerHTML = `
    <p style="text-align:center;color:var(--muted);font-size:.85rem;margin-bottom:1rem;">Propuestas sobre <strong style="color:var(--text)">${label}</strong></p>
    <div class="result-cards">
      <div class="result-card rk">
        <div class="result-card-name"><span class="dot-k"></span> Fuerza Popular</div>
        <div class="result-card-body">${k.body}</div>
        <div class="result-card-focus">→ ${k.focus}</div>
      </div>
      <div class="result-card rjp">
        <div class="result-card-name"><span class="dot-jp"></span> Juntos por el Perú</div>
        <div class="result-card-body">${jp.body}</div>
        <div class="result-card-focus">→ ${jp.focus}</div>
      </div>
    </div>
  `;

  resultBox.classList.remove('hidden');
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

document.getElementById('btn-share').addEventListener('click', async () => {
  const shareData = {
    title: 'Tu Voto Vale · Infórmate',
    text: 'Conoce a los candidatos en menos de 2 minutos antes de votar.',
    url: window.location.href,
  };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch (_) {}
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const btn = document.getElementById('btn-share');
      const prev = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> ¡Copiado!';
      setTimeout(() => { btn.innerHTML = prev; }, 2000);
    } catch (_) {}
  }
});
