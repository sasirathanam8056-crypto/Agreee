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


    // =====================================
    // VIDEO PLAY
    // =====================================

    if (playBtn) {

        playBtn.addEventListener("click", function () {

            video.play();

        });

    }


    // =====================================
    // VIDEO PAUSE
    // =====================================

    if (pauseBtn) {

        pauseBtn.addEventListener("click", function () {

            video.pause();

        });

    }


    // =====================================
    // VIDEO MUTE
    // =====================================

    if (muteBtn) {

        muteBtn.addEventListener("click", function () {

            video.muted = !video.muted;

            muteBtn.textContent =
                video.muted ? "🔇" : "🔊";

        });

    }


    // =====================================
    // PHOTO UPLOAD
    // =====================================

    leafImage.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;


        if (!file.type.startsWith("image/")) {

            alert("Please select an image.");

            return;

        }


        if (file.size > 5 * 1024 * 1024) {

            alert("Image should be below 5MB.");

            leafImage.value = "";

            return;

        }


        const reader = new FileReader();


        reader.onload = function (e) {

            const imageURL = e.target.result;


            // =====================================
            // SHOW IMAGE IN UPLOAD PREVIEW
            // =====================================

            imagePreview.innerHTML = `
                
                <div class="uploaded-photo">

                    <img
                        src="${imageURL}"
                        alt="Uploaded Leaf"
                    >

                    <div class="photo-scan-line"></div>

                    <div class="photo-scan-text">
                        🔍 READY TO SCAN
                    </div>

                </div>

            `;


            // =====================================
            // PUT SAME IMAGE IN RESULT
            // =====================================

            resultImage.src = imageURL;


            // =====================================
            // CHANGE BUTTON
            // =====================================

            scanBtn.innerHTML =
                "🔍 Scan This Leaf";


            scanBtn.classList.add("ready");

        };


        reader.readAsDataURL(file);

    });


    // =====================================
    // SCAN BUTTON
    // =====================================

    scanBtn.addEventListener("click", function () {

        if (!leafImage.files.length) {

            alert("🌿 First upload a leaf image!");

            return;

        }


        // Hide old result

        diseaseResult.style.display = "none";


        // Show scanner

        scanningBox.style.display = "block";


        // Scroll to scanner

        scanningBox.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });


        scanBtn.disabled = true;

        scanBtn.innerHTML =
            "🔄 AI Scanning...";


        let progressValue = 0;


        progress.style.width = "0%";

        percentage.textContent = "0%";


        // =====================================
        // SCANNING ANIMATION
        // =====================================

        const scanInterval = setInterval(function () {

            progressValue += 2;


            progress.style.width =
                progressValue + "%";


            percentage.textContent =
                progressValue + "%";


            if (progressValue >= 100) {

                clearInterval(scanInterval);


                setTimeout(function () {

                    scanningBox.style.display =
                        "none";


                    diseaseResult.style.display =
                        "block";


                    scanBtn.disabled = false;


                    scanBtn.innerHTML =
                        "🔍 Scan This Leaf";


                    diseaseResult.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });


                }, 700);

            }


        }, 45);

    });


    // =====================================
    // SCAN AGAIN
    // =====================================

    scanAgain.addEventListener("click", function () {

        diseaseResult.style.display =
            "none";


        scanningBox.style.display =
            "none";


        imagePreview.innerHTML = "";


        leafImage.value = "";


        scanBtn.innerHTML =
            "🔍 Scan for Disease";


        scanBtn.classList.remove("ready");


        progress.style.width = "0%";

        percentage.textContent = "0%";


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
