// ======================================================
// SMART AGRICULTURE SPLASH SCREEN
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    let progress = 0;
    let redirected = false;

    const bar = document.getElementById("bar");
    const percent = document.getElementById("percent");
    const splash = document.querySelector(".splash");

    if (!splash) return;

    const messages = [
        "Initializing Smart Agriculture...",
        "Loading Weather Engine...",
        "Checking Soil Analysis...",
        "Loading Crop Intelligence...",
        "Preparing AI Recommendation...",
        "Connecting Dashboard...",
        "Almost Ready..."
    ];

    const text = document.createElement("h5");
    text.style.color = "#ffffff";
    text.style.marginTop = "20px";
    text.style.fontWeight = "500";
    splash.appendChild(text);

    let msg = 0;

    const messageLoader = setInterval(() => {
        if (msg < messages.length) {
            text.textContent = messages[msg++];
        } else {
            clearInterval(messageLoader);
        }
    }, 700);

    const loading = setInterval(() => {
        progress++;

        if (bar) bar.style.width = progress + "%";
        if (percent) percent.textContent = progress + "%";

        if (progress >= 100) {
            clearInterval(loading);
            clearInterval(messageLoader);

            if (redirected) return;
            redirected = true;

            splash.style.transition = "opacity .8s ease";
            splash.style.opacity = "0";

            setTimeout(() => {
                const path = window.location.pathname;
            const marker = "/pages/";
            if (path.includes(marker)) {
                const pagesIndex = path.lastIndexOf(marker);
                window.location.assign(path.slice(0, pagesIndex + marker.length) + "dashboard.html");
            } else {
                window.location.assign("dashboard.html");
            }
            }, 800);
        }
    }, 40);
});
