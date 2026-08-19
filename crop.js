document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("cropForm");
    const result = document.getElementById("result");

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const nitrogen = Number(
            document.getElementById("nitrogen").value
        );

        const phosphorus = Number(
            document.getElementById("phosphorus").value
        );

        const potassium = Number(
            document.getElementById("potassium").value
        );

        const temperature = Number(
            document.getElementById("temperature").value
        );

        const humidity = Number(
            document.getElementById("humidity").value
        );

        const rainfall = Number(
            document.getElementById("rainfall").value
        );


        if (
            isNaN(nitrogen) ||
            isNaN(phosphorus) ||
            isNaN(potassium) ||
            isNaN(temperature) ||
            isNaN(humidity) ||
            isNaN(rainfall)
        ) {
            alert("Please enter all values.");
            return;
        }


        /* Demo prediction */

        let crop;

        if (rainfall >= 150 && humidity >= 70) {
            crop = "Rice";
        }
        else if (rainfall >= 80 && temperature >= 20) {
            crop = "Maize";
        }
        else if (rainfall < 80 && temperature > 25) {
            crop = "Millet";
        }
        else {
            crop = "Wheat";
        }


        result.innerHTML = `
            <div class="result-box">
                <h3>🌱 Recommended Crop</h3>
                <p>
                    Based on the entered farm details,
                    the recommended crop is
                    <strong>${crop}</strong>.
                </p>
            </div>
        `;

    });

});
