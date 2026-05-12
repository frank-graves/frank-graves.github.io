export function buildOverviewChart(targetId, candidates) {
  const ctx = document.getElementById(targetId);
  if (!ctx) return;

  const labels = ["Economía", "Educación", "Seguridad", "Tecnología", "Empleo", "Salud", "Medio ambiente"];
  const dataset = candidates.map(candidate => ({
    label: candidate.name,
    data: [
      candidate.scores.economia,
      candidate.scores.educacion,
      candidate.scores.seguridad,
      candidate.scores.tecnologia,
      candidate.scores.empleo,
      candidate.scores.salud,
      candidate.scores.medioambiente
    ],
    borderWidth: 2,
    fill: false,
    tension: 0.4,
    pointRadius: 4
  }));

  return new Chart(ctx, {
    type: "radar",
    data: {
      labels,
      datasets: dataset
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top", labels: { color: "#e2e8f0", boxWidth: 14, boxHeight: 14 } },
        tooltip: { backgroundColor: "rgba(15, 23, 42, 0.95)", bodyColor: "#f8fafc" }
      },
      scales: {
        r: {
          pointLabels: { color: "#94a3b8", font: { size: 12 } },
          grid: { color: "rgba(148, 163, 184, 0.35)" },
          angleLines: { color: "rgba(148, 163, 184, 0.5)" },
          suggestedMin: 0,
          suggestedMax: 10,
          ticks: { display: false }
        }
      }
    }
  });
}

export function buildTopicBarChart(targetId, candidate) {
  const ctx = document.getElementById(targetId);
  if (!ctx || !candidate) return;

  const labels = ["Economía", "Educación", "Seguridad", "Tecnología", "Empleo", "Salud", "Medio ambiente"];
  const values = labels.map(label => {
    const key = label.toLowerCase().replace(/ /g, "");
    return candidate.scores[key] ?? 0;
  });

  return new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: `${candidate.name} · Puntaje por tema",
        data: values,
        backgroundColor: "rgba(56, 189, 248, 0.65)",
        borderColor: "rgba(56, 189, 248, 1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: "rgba(15, 23, 42, 0.95)", bodyColor: "#f8fafc" }
      },
      scales: {
        x: { ticks: { color: "#cbd5e1" }, grid: { display: false } },
        y: { beginAtZero: true, max: 10, ticks: { color: "#cbd5e1", stepSize: 2 }, grid: { color: "rgba(148, 163, 184, 0.35)" } }
      }
    }
  });
}
