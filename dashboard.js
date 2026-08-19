// ======================================================
// SMART FARM DASHBOARD - STABLE OFFLINE VERSION
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
    // Mobile sidebar
    const mobileMenuButton = document.querySelector(".menu");
    const mobileSidebar = document.querySelector(".sidebar");
    const mobileBackdrop = document.getElementById("mobileSidebarBackdrop");

    window.closeMobileSidebar = function () {
        if (mobileSidebar) mobileSidebar.classList.remove("mobile-open");
        if (mobileBackdrop) mobileBackdrop.classList.remove("show");
    };

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener("click", function () {
            if (mobileSidebar) mobileSidebar.classList.toggle("mobile-open");
            if (mobileBackdrop) mobileBackdrop.classList.toggle("show");
        });
    }

    const dashboardBtn = document.getElementById("dashboardBtn");
    const cropBtn = document.getElementById("cropBtn");
    const soilBtn = document.getElementById("soilBtn");
    const weatherBtn = document.getElementById("weatherBtn");
    const diseaseBtn = document.getElementById("diseaseBtn");
    const analyticsBtn = document.getElementById("analyticsBtn");
    const marketBtn = document.getElementById("marketBtn");
    const reportsBtn = document.getElementById("reportsBtn");
    const settingsBtn = document.getElementById("settingsBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    const dashboardHome = document.getElementById("dashboardHome");
    const cropPage = document.getElementById("cropPage");
    const soilPage = document.getElementById("soilPage");
    const weatherPage = document.getElementById("weatherPage");
    const diseasePage = document.getElementById("diseasePage");
    const analyticsPage = document.getElementById("analyticsPage");
    const marketPage = document.getElementById("marketPage");
    const reportsPage = document.getElementById("reportsPage");
    const settingsPage = document.getElementById("settingsPage");

    const pages = [
        dashboardHome, cropPage, soilPage, weatherPage, diseasePage,
        analyticsPage, marketPage, reportsPage, settingsPage
    ];

    const buttons = [
        dashboardBtn, cropBtn, soilBtn, weatherBtn, diseaseBtn,
        analyticsBtn, marketBtn, reportsBtn, settingsBtn
    ];

    function hideAllPages() {
        pages.forEach(page => {
            if (page) page.style.display = "none";
        });
    }

    function setActive(button) {
        buttons.forEach(btn => {
            if (btn) btn.classList.remove("active");
        });
        if (button) button.classList.add("active");
    }

    function showPage(page, button) {
        hideAllPages();
        if (page) page.style.display = "block";
        setActive(button);
        if (window.innerWidth <= 900) window.closeMobileSidebar();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // ------------------------------------------------------
    // NAVIGATION / LOGIN
    // Always resolve pages from the /pages/ folder.
    // This prevents URLs such as dashboard.html/login.html.
    // ------------------------------------------------------
    function pageUrl(pageName) {
        const path = window.location.pathname;
        const marker = "/pages/";

        if (path.includes(marker)) {
            const pagesIndex = path.lastIndexOf(marker);
            const pagesDir = path.slice(0, pagesIndex + marker.length);
            return pagesDir + pageName;
        }

        return pageName;
    }

    function goToPage(pageName) {
        window.location.assign(pageUrl(pageName));
    }

    function requireLogin() {
        return localStorage.getItem("smartFarmLoggedIn") === "true";
    }

    function openProtectedPage(page, button, initializer) {
        // Login is handled once from the main/login page.
        // After the dashboard is opened, sidebar navigation is direct.
        showPage(page, button);

        if (typeof initializer === "function") {
            setTimeout(initializer, 0);
        }
    }

    // ------------------------------------------------------
    // SIDEBAR
    // ------------------------------------------------------

    if (dashboardBtn) {
        dashboardBtn.addEventListener("click", () => {
            showPage(dashboardHome, dashboardBtn);
        });
    }

    if (cropBtn) {
        cropBtn.addEventListener("click", () => {
            openProtectedPage(cropPage, cropBtn, initializeCropForm);
        });
    }

    if (soilBtn) {
        soilBtn.addEventListener("click", () => {
            openProtectedPage(soilPage, soilBtn);
        });
    }

    if (weatherBtn) {
        weatherBtn.addEventListener("click", () => {
            openProtectedPage(weatherPage, weatherBtn);
        });
    }

    if (diseaseBtn) {
        diseaseBtn.addEventListener("click", () => {
            openProtectedPage(diseasePage, diseaseBtn, function () {
                if (typeof initializeDiseaseScanner === "function") {
                    initializeDiseaseScanner();
                }
            });
        });
    }

    if (analyticsBtn) {
        analyticsBtn.addEventListener("click", () => {
            openProtectedPage(analyticsPage, analyticsBtn, function () {
                if (typeof initializeAnalytics === "function") {
                    initializeAnalytics();
                }
            });
        });
    }

    if (marketBtn) {
        marketBtn.addEventListener("click", () => {
            openProtectedPage(marketPage, marketBtn, function () {
                if (typeof initializeMarket === "function") {
                    initializeMarket();
                }
            });
        });
    }

    if (reportsBtn) {
        reportsBtn.addEventListener("click", () => {
            openProtectedPage(reportsPage, reportsBtn, function () {
                if (typeof initializeReports === "function") {
                    initializeReports();
                }
            });
        });
    }

    if (settingsBtn) {
        settingsBtn.addEventListener("click", () => {
            openProtectedPage(settingsPage, settingsBtn, function () {
                if (typeof initializeSettings === "function") {
                    initializeSettings();
                }
            });
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to logout?")) {
                localStorage.removeItem("smartFarmLoggedIn");
                localStorage.removeItem("smartFarmPendingPage");
                goToPage("login.html");
            }
        });
    }

    // ------------------------------------------------------
    // CROP PREDICTION
    // ------------------------------------------------------

    function initializeCropForm() {
        const form = document.getElementById("cropForm");
        if (!form || form.dataset.bound === "true") return;

        form.dataset.bound = "true";

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nitrogen = Number(document.getElementById("nitrogen")?.value || 0);
            const phosphorus = Number(document.getElementById("phosphorus")?.value || 0);
            const potassium = Number(document.getElementById("potassium")?.value || 0);
            const temperature = Number(document.getElementById("temperature")?.value || 0);
            const humidity = Number(document.getElementById("humidity")?.value || 0);
            const rainfall = Number(document.getElementById("rainfall")?.value || 0);

            const result = document.getElementById("result");

            if (!result) return;

            let crop = "Rice";
            if (rainfall < 60 && temperature > 25) crop = "Maize";
            if (potassium > 80 && humidity < 60) crop = "Cotton";
            if (nitrogen > 90 && rainfall > 100) crop = "Rice";

            result.innerHTML = `
                <div class="success-result">
                    <h3>🌾 Recommended Crop: ${crop}</h3>
                    <p>
                        Based on the entered soil, temperature, humidity and rainfall values,
                        <strong>${crop}</strong> is a suitable recommendation.
                    </p>
                </div>
            `;
        });
    }

    // ------------------------------------------------------
    // SOIL ANALYSIS
    // ------------------------------------------------------

    window.analyzeSoil = function () {
        const nitrogen = Math.floor(Math.random() * 20) + 65;
        const phosphorus = Math.floor(Math.random() * 20) + 50;
        const potassium = Math.floor(Math.random() * 15) + 75;

        const nValue = document.getElementById("nValue");
        const pValue = document.getElementById("pValue");
        const kValue = document.getElementById("kValue");

        const nitrogenBar = document.getElementById("nitrogenBar");
        const phosphorusBar = document.getElementById("phosphorusBar");
        const potassiumBar = document.getElementById("potassiumBar");

        const healthScore = document.getElementById("healthScore");
        const healthFill = document.querySelector(".health-fill");

        if (nValue) nValue.textContent = nitrogen + "%";
        if (pValue) pValue.textContent = phosphorus + "%";
        if (kValue) kValue.textContent = potassium + "%";

        if (nitrogenBar) nitrogenBar.style.width = nitrogen + "%";
        if (phosphorusBar) phosphorusBar.style.width = phosphorus + "%";
        if (potassiumBar) potassiumBar.style.width = potassium + "%";

        const score = Math.round((nitrogen + phosphorus + potassium) / 3);

        if (healthScore) healthScore.textContent = score;
        if (healthFill) healthFill.style.width = score + "%";
    };

    // ------------------------------------------------------
    // INITIAL STATE
    // ------------------------------------------------------

    showPage(dashboardHome, dashboardBtn);
});
