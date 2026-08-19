function analyzeSoil() {

    const nitrogen = Math.floor(Math.random() * 20) + 65;
    const phosphorus = Math.floor(Math.random() * 20) + 50;
    const potassium = Math.floor(Math.random() * 15) + 75;

    document.getElementById("nValue").textContent =
        nitrogen + "%";

    document.getElementById("pValue").textContent =
        phosphorus + "%";

    document.getElementById("kValue").textContent =
        potassium + "%";


    document.getElementById("nitrogenBar").style.width =
        nitrogen + "%";

    document.getElementById("phosphorusBar").style.width =
        phosphorus + "%";

    document.getElementById("potassiumBar").style.width =
        potassium + "%";


    const score = Math.round(
        (nitrogen + phosphorus + potassium) / 3
    );

    document.getElementById("healthScore").textContent =
        score;


    alert("🌱 Soil analysis completed successfully!");
}
