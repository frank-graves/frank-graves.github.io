import { candidatos } from "../data/candidatos.js";
import { initNavbar } from "../../components/navbar.js";
import { renderCandidateCards, renderCandidateOptions, renderPlanAccordions } from "../../components/cards.js";
import { renderComparisonRows, renderComparisonSummary } from "../../components/comparador.js";
import { buildOverviewChart, buildTopicBarChart } from "../../components/charts.js";

const state = {
  selectedA: null,
  selectedB: null,
  currentTopic: "Trabajo"
};

const topicMap = {
  Trabajo: { icon: "fa-briefcase", label: "Trabajo" },
  Educación: { icon: "fa-graduation-cap", label: "Educación" },
  Seguridad: { icon: "fa-shield-halved", label: "Seguridad" },
  Emprendimiento: { icon: "fa-lightbulb", label: "Emprendimiento" },
  Tecnología: { icon: "fa-robot", label: "Tecnología" }
};

window.addEventListener("load", () => {
  document.body.classList.remove("overflow-hidden");
  document.querySelector(".loading-screen").classList.add("fade-out");
  setTimeout(() => document.querySelector(".loading-screen").style.display = "none", 600);
  AOS.init({ duration: 850, once: true, offset: 120 });
  initNavbar();
  initContent();
  initCompare();
  initAccordions();
  initTopics();
  initCharts();
  initQR();
  initBackToTop();
});

function initContent() {
  document.querySelector("#candidates-grid").innerHTML = renderCandidateCards(candidatos);
  document.querySelector("#why-cards").innerHTML = createWhyCards();
  document.querySelector("#plans-list").innerHTML = renderPlanAccordions(candidatos);
}

function createWhyCards() {
  const items = [
    { icon: "fa-users", title: "Participación joven", text: "8 de cada 10 jóvenes buscan información antes de votar en elecciones nacionales." },
    { icon: "fa-chart-line", title: "El poder del dato", text: "Comparar propuestas permite tomar decisiones basadas en hechos y planes reales." },
    { icon: "fa-bolt", title: "Impacto inmediato", text: "La elección define empleo, educación y tecnología en el país en los próximos 5 años." }
  ];
  return items.map((item, index) => `
    <article class="info-card glass-card" data-aos="fade-up" data-aos-delay="${100 + index * 80}">
      <div class="icon-box"><i class="fa-solid ${item.icon}"></i></div>
      <div>
        <h4>${item.title}</h4>
        <p>${item.text}</p>
      </div>
    </article>
  `).join("");
}

function initCompare() {
  const selectA = document.querySelector("#compare-a");
  const selectB = document.querySelector("#compare-b");
  selectA.innerHTML = renderCandidateOptions(candidatos);
  selectB.innerHTML = renderCandidateOptions(candidatos);
  updateComparison();

  selectA.addEventListener("change", () => {
    state.selectedA = candidatos.find(candidate => candidate.id === selectA.value);
    if (state.selectedA && state.selectedB?.id === state.selectedA.id) {
      selectB.value = "";
      state.selectedB = null;
    }
    updateComparison();
  });

  selectB.addEventListener("change", () => {
    state.selectedB = candidatos.find(candidate => candidate.id === selectB.value);
    if (state.selectedB && state.selectedA?.id === state.selectedB.id) {
      selectA.value = "";
      state.selectedA = null;
    }
    updateComparison();
  });
}

function updateComparison() {
  document.querySelector("#compare-summary").innerHTML = renderComparisonSummary(state.selectedA, state.selectedB);
  document.querySelector("#compare-table-body").innerHTML = renderComparisonRows(state.selectedA, state.selectedB);
}

function initAccordions() {
  document.querySelectorAll(".accordion-button").forEach(button => {
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      const expanded = button.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".accordion-button").forEach(btn => {
        btn.setAttribute("aria-expanded", "false");
        btn.nextElementSibling.style.maxHeight = null;
        btn.querySelector(".accordion-icon").textContent = "+";
      });
      if (!expanded) {
        button.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
        button.querySelector(".accordion-icon").textContent = "−";
      }
    });
  });
}

function initTopics() {
  const chipsContainer = document.querySelector("#topic-chips");
  chipsContainer.innerHTML = Object.keys(topicMap).map(topic => `
    <button class="topic-chip" data-topic="${topic}" aria-pressed="false">
      <i class="fa-solid ${topicMap[topic].icon}"></i>${topic}
    </button>
  `).join("");
  chipsContainer.querySelectorAll(".topic-chip").forEach(button => {
    button.addEventListener("click", () => {
      state.currentTopic = button.dataset.topic;
      chipsContainer.querySelectorAll(".topic-chip").forEach(btn => btn.classList.toggle("active", btn === button));
      renderTopicPanel(state.currentTopic);
    });
  });
  renderTopicPanel(state.currentTopic);
}

function renderTopicPanel(topic) {
  const matches = candidatos.filter(candidate => candidate.relatedTopics.includes(topic));
  const target = document.querySelector("#topic-results");
  if (!matches.length) {
    target.innerHTML = `<div class="empty-state">No hay coincidencias para este tema, pero puedes explorar otros temas clave.</div>`;
    return;
  }
  target.innerHTML = matches.map(candidate => `
    <article class="topic-card glass-card" data-aos="fade-up">
      <div>
        <h4>${candidate.name}</h4>
        <span class="badge">${candidate.party}</span>
      </div>
      <p>Propuestas vinculadas a <strong>${topic}</strong>:</p>
      <ul>
        ${candidate.proposals.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </article>
  `).join("");
}

function initCharts() {
  buildOverviewChart("overview-chart", candidatos);
  buildTopicBarChart("topic-bar-chart", candidatos[0]);
}

function initQR() {
  const qrContainer = document.getElementById("qr-code");
  if (window.QRCode && qrContainer) {
    new QRCode(qrContainer, {
      text: window.location.href,
      width: 180,
      height: 180,
      colorDark: "#0ea5e9",
      colorLight: "#0f172a",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  document.querySelector("#share-button").addEventListener("click", async () => {
    const shareData = { title: "Voto joven informado", text: "Explora candidatos y propuestas para votar mejor.", url: window.location.href };
    try {
      await navigator.share?.(shareData);
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Enlace copiado al portapapeles");
    }
  });
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("visible"), 10);
  setTimeout(() => toast.classList.remove("visible"), 2300);
  setTimeout(() => toast.remove(), 2600);
}

function initBackToTop() {
  const button = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    button.classList.toggle("visible", window.scrollY > 550);
  });
  button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
