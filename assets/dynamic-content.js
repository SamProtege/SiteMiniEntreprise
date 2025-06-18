// Utilitaire pour créer un élément HTML
function createElement(tag, className, textContent) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (textContent) el.textContent = textContent;
    return el;
}

// Charge une section depuis son fichier JSON et insère son contenu
async function loadSection(jsonPath, containerId) {
    try {
        const response = await fetch(jsonPath);
        const data = await response.json();
        const container = document.getElementById(containerId);
        if (!container) return;

        if (data.title) {
            const h = createElement("h1", "", data.title);
            container.appendChild(h);
        }

        if (data.subtitle) {
            const h2 = createElement("h2", "", data.subtitle);
            container.appendChild(h2);
        }

        if (data.paragraphs) {
            data.paragraphs.forEach(p => {
                const para = createElement("p", "", p);
                container.appendChild(para);
            });
        }

        if (data.list && Array.isArray(data.list)) {
            const ul = createElement("ul");
            data.list.forEach(item => {
                const li = createElement("li", "", item);
                ul.appendChild(li);
            });
            container.appendChild(ul);
        }

        if (data.values && Array.isArray(data.values)) {
            const grid = createElement("div", "valeurs-grid");
            data.values.forEach(v => {
                const art = createElement("article", "valeur fade-in");
                art.setAttribute("aria-label", `Valeur ${v.titre}`);
                const h3 = createElement("h3", "", v.titre);
                const p = createElement("p", "", v.texte);
                art.appendChild(h3);
                art.appendChild(p);
                grid.appendChild(art);
            });
            container.appendChild(grid);
        }

        if (data.team && Array.isArray(data.team)) {
            const grid = createElement("div", "equipe-grid");
            data.team.forEach(m => {
                const art = createElement("article", "membre fade-in");
                art.setAttribute("aria-label", `Membre ${m.nom}`);
                const h3 = createElement("h3", "", m.nom);
                const p = createElement("p", "", m.texte);
                art.appendChild(h3);
                art.appendChild(p);
                grid.appendChild(art);
            });
            container.appendChild(grid);
        }

    } catch (err) {
        console.error(`Erreur lors du chargement de ${jsonPath} :`, err);
    }
}

// Charger toutes les sections à partir de leurs fichiers JSON
document.addEventListener("DOMContentLoaded", () => {
    loadSection("content/about.json", "accueil-content");
    loadSection("content/kit.json", "kit-content");
    loadSection("content/valeurs.json", "valeurs-content");
    loadSection("content/equipe.json", "equipe-content");
});
