const co2Data = [
    { land: "Deutschland", unternehmen: "EcoTech GmbH", branche: "Energie", jahr: 2024, co2: 1200 },
    { land: "Deutschland", unternehmen: "GreenSteel AG", branche: "Industrie", jahr: 2024, co2: 3400 },
    { land: "Deutschland", unternehmen: "NordLogistik", branche: "Transport", jahr: 2024, co2: 2100 },
  
    { land: "Frankreich", unternehmen: "Solaris SA", branche: "Energie", jahr: 2024, co2: 900 },
    { land: "Frankreich", unternehmen: "MetroBuild", branche: "Bau", jahr: 2024, co2: 1600 },
  
    { land: "Spanien", unternehmen: "AquaFoods", branche: "Lebensmittel", jahr: 2024, co2: 700 },
    { land: "Spanien", unternehmen: "IberCement", branche: "Industrie", jahr: 2024, co2: 2500 },
  
    { land: "USA", unternehmen: "CloudCore Inc.", branche: "IT", jahr: 2024, co2: 2800 },
    { land: "USA", unternehmen: "Atlantic Freight", branche: "Transport", jahr: 2024, co2: 3900 },
  
    { land: "Japan", unternehmen: "NeoMotors", branche: "Automobil", jahr: 2024, co2: 4100 },
    { land: "Japan", unternehmen: "Kibo Electronics", branche: "Elektronik", jahr: 2024, co2: 1900 },
  
    { land: "Indien", unternehmen: "SunWeave Textiles", branche: "Textil", jahr: 2024, co2: 2300 },
  ];
  
  const tbody = document.querySelector("#co2-tbody");

function renderTable(rows) {
  tbody.innerHTML = "";

  for (const r of rows) {
    const tr = document.createElement("tr");

    const tdLand = document.createElement("td");
    tdLand.textContent = r.land;

    const tdUnternehmen = document.createElement("td");
    tdUnternehmen.textContent = r.unternehmen;

    const tdBranche = document.createElement("td");
    tdBranche.textContent = r.branche;

    const tdJahr = document.createElement("td");
    tdJahr.textContent = String(r.jahr);

    const tdCo2 = document.createElement("td");
    tdCo2.textContent = String(r.co2);

    tr.append(tdLand, tdUnternehmen, tdBranche, tdJahr, tdCo2);
    tbody.appendChild(tr);
  }
}

const filterLand = document.querySelector("#filter-land");

function fillLandDropdown(data) {
  const lands = Array.from(new Set(data.map(d => d.land)))
    .sort((a, b) => a.localeCompare(b, "de"));

  for (const l of lands) {
    const opt = document.createElement("option");
    opt.value = l;
    opt.textContent = l;
    filterLand.appendChild(opt);
  }
}

const filterCompany = document.querySelector("#filter-company");

function applyFilter(data) {
  const landValue = filterLand.value;
  const companyValue = filterCompany.value.trim().toLowerCase();

  return data.filter(d => {
    const landOk = !landValue || d.land === landValue;
    const companyOk = !companyValue || d.unternehmen.toLowerCase().includes(companyValue);
    return landOk && companyOk;
  });
}
const sortBy = document.querySelector("#sort-by");
const sortDir = document.querySelector("#sort-dir");

function applySort(data) {
  const key = sortBy.value;
  const dir = sortDir.value;

  const sorted = [...data].sort((a, b) => {
    if (key === "co2") return a.co2 - b.co2;
    return String(a[key]).localeCompare(String(b[key]), "de");
  });

  if (dir === "desc") sorted.reverse();
  return sorted;
}

function updateView() {
    const filtered = applyFilter(co2Data);
    const sorted = applySort(filtered);
    renderTable(sorted);
  }
  
  fillLandDropdown(co2Data);
  updateView();
  
  filterLand.addEventListener("change", updateView);
  filterCompany.addEventListener("input", updateView);
  sortBy.addEventListener("change", updateView);
  sortDir.addEventListener("change", updateView);
  