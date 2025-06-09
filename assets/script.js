document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeBtn = document.getElementById("close-btn");

    if (toggleBtn && mobileMenu && closeBtn) {
        toggleBtn.addEventListener("click", () => {
            mobileMenu.classList.add("open");
        });

        closeBtn.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
        });
    }
});

// Cookie consent
document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const declineBtn = document.getElementById("decline-cookies");

  if (!localStorage.getItem("cookieConsent")) {
    banner.style.display = "block";
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    banner.style.display = "none";
    enableAnalytics();
  });

  declineBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "declined");
    banner.style.display = "none";
  });

  if (localStorage.getItem("cookieConsent") === "accepted") {
    enableAnalytics();
  }

  function enableAnalytics() {
    // Code Google Analytics ici (remplacez UA-XXXX par ton ID)
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-VS9WWE8FRW";
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-VS9WWE8FRW');
  }
});
