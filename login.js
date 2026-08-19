// ======================================================
// SMART FARM LOGIN
// ======================================================

(function () {
    function pageUrl(pageName) {
        const path = window.location.pathname;
        const marker = "/pages/";

        if (path.includes(marker)) {
            const pagesIndex = path.lastIndexOf(marker);
            return path.slice(0, pagesIndex + marker.length) + pageName;
        }

        return pageName;
    }

    function goToPage(pageName) {
        window.location.assign(pageUrl(pageName));
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Persistent login: reloads and reopening the project won't ask again
        // until the user explicitly logs out.
        if (localStorage.getItem("smartFarmLoggedIn") === "true") {
            goToPage("dashboard.html");
            return;
        }

        const loginForm = document.getElementById("nextBtn");

        if (loginForm) {
            loginForm.addEventListener("submit", function (e) {
                e.preventDefault();

                localStorage.setItem("smartFarmLoggedIn", "true");

                // Keep the requested sidebar page so dashboard.js can open it.
                // If there is no pending page, dashboard home is shown.
                goToPage("dashboard.html");
            });
        }

        const googleBtn = document.querySelector(".google-btn");
        const facebookBtn = document.querySelector(".facebook-btn");

        if (googleBtn) {
            googleBtn.addEventListener("click", function (e) {
                e.preventDefault();
                alert("Google login will be connected later.");
            });
        }

        if (facebookBtn) {
            facebookBtn.addEventListener("click", function (e) {
                e.preventDefault();
                alert("Facebook login will be connected later.");
            });
        }
    });
})();
