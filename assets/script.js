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
