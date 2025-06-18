document.addEventListener("DOMContentLoaded", () => {
    const sections = [
        { id: "about", file: "about.json", render: renderAbout },
        { id: "kit", file: "kit.json", render: renderKit },
        { id: "valeurs", file: "valeurs.json", render: renderValeurs },
        { id: "equipe", file: "equipe.json", render: renderEquipe },
        { id: "contact", file: "contact.json", render: renderContact }
    ];

    sections.forEach(({ file, render }) => {
        fetch(`content/${file}`)
            .then(res => {
                if (!res.ok) throw new Error(`Erreur de chargement: ${file}`);
                return res.json();
            })
            .then(data => render(data))
            .catch(err => console.error(err));
    });

    function renderAbout(data) {
        document.getElementById("about-title").textContent = data.title;
        const body = document.getElementById("about-body");
        body.innerHTML = "";
        data.paragraphs.forEach(p => body.innerHTML += `<p>${p}</p>`);
        data.list.forEach(item => body.innerHTML += `<p>${item}</p>`);
        data.closing_paragraphs.forEach(p => body.innerHTML += `<p>${p}</p>`);
    }

    function renderKit(data) {
        document.getElementById("kit-title").textContent = data.title;
        document.getElementById("kit-intro").textContent = data.intro;
        const list = document.getElementById("kit-list");
        list.innerHTML = "";
        data.items.forEach(item => list.innerHTML += `<li>${item}</li>`);
        document.getElementById("kit-note").textContent = data.note;
    }

    function renderValeurs(data) {
        document.getElementById("valeurs-title").textContent = data.title;
        document.getElementById("valeurs-intro").textContent = data.intro;
        const container = document.getElementById("valeurs-list");
        container.innerHTML = "";
        data.values.forEach(val => {
            container.innerHTML += `
                <div class="valeur">
                    <h3>${val.title}</h3>
                    <p>${val.description}</p>
                </div>`;
        });
    }

    function renderEquipe(data) {
        document.getElementById("equipe-title").textContent = data.title;
        document.getElementById("equipe-intro").textContent = data.intro;
        const container = document.getElementById("equipe-list");
        container.innerHTML = "";
        data.members.forEach(m => {
            container.innerHTML += `
                <div class="membre">
                    <h3>${m.name}</h3>
                    <h4>${m.role}</h4>
                    <p>${m.description}</p>
                </div>`;
        });
    }

    function renderContact(data) {
        document.getElementById("contact-title").textContent = data.support_title;
        document.getElementById("contact-description").textContent = data.support_text;

        const qrContainer = document.getElementById("contact-qrcodes");
        qrContainer.innerHTML = "";
        data.links.forEach(link => {
            qrContainer.innerHTML += `
                <a href="${link.href}" target="_blank" aria-label="${link.aria_label}">
                    <img src="${link.img}" alt="${link.alt}" />
                </a>`;
        });

        document.getElementById("contact-problem").textContent = data.contact_info[0];
        document.getElementById("contact-mail").textContent = data.contact_info[1];
    }
});
