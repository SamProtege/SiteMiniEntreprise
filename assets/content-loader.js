async function loadContent(section, titleId, bodyId) {
  try {
    const response = await fetch(`content/${section}.json`);
    const data = await response.json();

    if (titleId) document.getElementById(titleId).textContent = data.title;
    if (bodyId) document.getElementById(bodyId).innerHTML = marked.parse(data.body);
  } catch (error) {
    console.error(`Erreur chargement section ${section} :`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadContent("about", "about-title", "about-body");
  loadContent("kit", "kit-title", "kit-body");
  loadContent("valeurs", "valeurs-title", "valeurs-body");
  loadContent("equipe", "equipe-title", "equipe-body");
  loadContent("contact", "contact-title", "contact-body");
});
