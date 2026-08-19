// ======================================================
// DISEASE DETECTION
// ======================================================

function initializeDiseaseScanner() {

    const video = document.getElementById("farmVideo");
    const playBtn = document.getElementById("playVideo");
    const pauseBtn = document.getElementById("pauseVideo");
    const muteBtn = document.getElementById("muteVideo");
    const leafImage = document.getElementById("leafImage");
    const imagePreview = document.getElementById("imagePreview");
    const scanBtn = document.getElementById("scanBtn");
    const scanningBox = document.getElementById("scanningBox");
    const diseaseResult = document.getElementById("diseaseResult");
    const progress = document.getElementById("loadingProgress");
    const percentage = document.getElementById("scanPercentage");
    const resultImage = document.getElementById("resultImage");
    const scanAgain = document.getElementById("scanAgain");

    if (!leafImage || !scanBtn || !diseaseResult) return;

    // Prevent duplicate listeners if the user opens Disease Detection again.
    if (leafImage.dataset.bound === "true") return;
    leafImage.dataset.bound = "true";

    if (playBtn && video) playBtn.onclick = () => video.play();
    if (pauseBtn && video) pauseBtn.onclick = () => video.pause();

    if (muteBtn && video) {
        muteBtn.onclick = () => {
            video.muted = !video.muted;
            muteBtn.textContent = video.muted ? "🔇" : "🔊";
        };
    }

    leafImage.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image.");
            this.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Image should be below 5MB.");
            this.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const url = e.target.result;

            if (imagePreview) {
                imagePreview.innerHTML = `
                    <div class="uploaded-photo">
                        <img src="${url}" alt="Uploaded Leaf">
                        <div class="photo-scan-line"></div>
                        <div class="photo-scan-text">🔍 READY TO SCAN</div>
                    </div>
                `;
            }

            if (resultImage) resultImage.src = url;

            scanBtn.disabled = false;
            scanBtn.textContent = "🔍 Scan This Leaf";
            scanBtn.classList.add("ready");
        };

        reader.readAsDataURL(file);
    });

    scanBtn.addEventListener("click", function () {

        if (!leafImage.files.length) {
            alert("🌿 First upload a leaf image!");
            return;
        }

        if (diseaseResult) diseaseResult.style.display = "none";
        if (scanningBox) scanningBox.style.display = "block";

        scanBtn.disabled = true;
        scanBtn.textContent = "🔄 AI Scanning...";

        let value = 0;
        if (progress) progress.style.width = "0%";
        if (percentage) percentage.textContent = "0%";

        const timer = setInterval(() => {
            value += 2;

            if (progress) progress.style.width = value + "%";
            if (percentage) percentage.textContent = value + "%";

            if (value >= 100) {
                clearInterval(timer);

                setTimeout(() => {
                    if (scanningBox) scanningBox.style.display = "none";
                    if (diseaseResult) diseaseResult.style.display = "block";
                    scanBtn.disabled = false;
                    scanBtn.textContent = "🔍 Scan Another Leaf";
                }, 500);
            }
        }, 45);
    });

    if (scanAgain) {
        scanAgain.onclick = () => {
            if (diseaseResult) diseaseResult.style.display = "none";
            if (imagePreview) imagePreview.innerHTML = "";
            leafImage.value = "";
            if (resultImage) resultImage.src = "";
            scanBtn.disabled = false;
            scanBtn.textContent = "🔍 Scan for Disease";
            scanBtn.classList.remove("ready");
        };
    }
}
