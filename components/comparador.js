export function renderComparisonRows(selectedA, selectedB) {
  if (!selectedA || !selectedB) {
    return `<tr><td colspan="3" class="empty-row">Selecciona dos candidatos para comparar</td></tr>`;
  }
  const categories = [
    { key: "economia", label: "Economía" },
    { key: "educacion", label: "Educación" },
    { key: "salud", label: "Salud" },
    { key: "seguridad", label: "Seguridad" },
    { key: "tecnologia", label: "Tecnología" },
    { key: "empleo", label: "Empleo" },
    { key: "medioambiente", label: "Medio ambiente" }
  ];

  return categories.map(({ key, label }) => `
    <tr>
      <td>${label}</td>
      <td>${selectedA.scores[key] ?? "N/A"}</td>
      <td>${selectedB.scores[key] ?? "N/A"}</td>
    </tr>
  `).join('');
}

export function renderComparisonSummary(selectedA, selectedB) {
  if (!selectedA || !selectedB) {
    return `
      <div class="compare-hint">Elige dos candidatos para ver una comparación clara y neutral.</div>
    `;
  }
  return `
    <div class="compare-hint compare-active">
      Comparando <strong>${selectedA.name}</strong> y <strong>${selectedB.name}</strong> en siete temas clave.
    </div>
  `;
}
