export function renderCandidateCards(candidates) {
  return candidates.map(candidate => `
    <article class="candidate-card glass-card" data-aos="fade-up" data-aos-delay="100">
      <div class="candidate-header">
        <img src="${candidate.portrait}" alt="Retrato de ${candidate.name}" loading="lazy" class="candidate-image" />
        <div>
          <span class="badge">${candidate.party}</span>
          <h3>${candidate.name}</h3>
          <p class="text-xs text-slate-400">${candidate.age} años · ${candidate.experience}</p>
        </div>
      </div>
      <div class="candidate-score-grid">
        ${renderScorePills(candidate.scores)}
      </div>
      <ul class="proposal-list">
        ${candidate.proposals.map(proposal => `<li><i class="fa-solid fa-circle-check"></i>${proposal}</li>`).join('')}
      </ul>
    </article>
  `).join('');
}

function renderScorePills(scores) {
  return Object.entries(scores)
    .filter(([key]) => ["economia", "educacion", "seguridad", "tecnologia", "empleo"].includes(key))
    .map(([key, score]) => `
      <span class="pill">${formatCategory(key)}<strong>${score}</strong></span>
    `).join('');
}

function formatCategory(key) {
  const labelMap = {
    economia: "Economía",
    educacion: "Educación",
    seguridad: "Seguridad",
    tecnologia: "Tecnología",
    empleo: "Empleo"
  };
  return labelMap[key] || key;
}

export function renderCandidateOptions(candidates) {
  return candidates.map(candidate => `
    <option value="${candidate.id}">${candidate.name}</option>
  `).join('');
}

export function renderPlanAccordions(candidates) {
  return candidates.map(candidate => `
    <div class="accordion-item glass-card" data-aos="fade-right" data-aos-delay="150">
      <button class="accordion-button" type="button" aria-expanded="false">
        <span>${candidate.name}</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-panel">
        <p class="plan-summary">${candidate.plan.summary}</p>
        <div class="plan-grid">
          ${Object.entries(candidate.plan.topics).map(([topic, detail]) => `
            <div class="plan-box">
              <h4>${formatTopicLabel(topic)}</h4>
              <p>${detail}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function formatTopicLabel(topic) {
  const map = {
    economia: "Economía",
    educacion: "Educación",
    salud: "Salud",
    seguridad: "Seguridad",
    tecnologia: "Tecnología",
    empleo: "Empleo",
    medioambiente: "Medio ambiente"
  };
  return map[topic] || topic;
}
