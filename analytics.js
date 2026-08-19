// Farm Analytics initializer
// Called after analytics.html is injected into dashboard.html

function initializeAnalytics() {

    const counters = document.querySelectorAll("#analyticsPage .counter");

    counters.forEach(counter => {

        const target = parseFloat(counter.dataset.target);
        let current = 0;
        const increment = target / 50;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = current.toFixed(target % 1 !== 0 ? 1 : 0);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
            }
        };

        updateCounter();
    });

    const growthCanvas = document.getElementById("growthChart");
    const moistureCanvas = document.getElementById("moistureChart");
    const temperatureCanvas = document.getElementById("temperatureChart");

    if (!growthCanvas || !moistureCanvas || !temperatureCanvas) {
        console.error("Analytics chart elements not found.");
        return;
    }

    // Destroy old charts if user opens Analytics more than once.
    if (window.farmAnalyticsCharts) {
        Object.values(window.farmAnalyticsCharts).forEach(chart => chart.destroy());
    }

    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    window.farmAnalyticsCharts = {

        growth: new Chart(growthCanvas, {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label: "Crop Growth %",
                    data: [61, 65, 68, 72, 75, 79, 82],
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        }),

        moisture: new Chart(moistureCanvas, {
            type: "bar",
            data: {
                labels,
                datasets: [{
                    label: "Moisture",
                    data: [61, 67, 64, 72, 69, 75, 68],
                    borderRadius: 8,
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        }),

        temperature: new Chart(temperatureCanvas, {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label: "Temperature",
                    data: [27, 29, 28, 31, 30, 29, 28],
                    borderWidth: 3,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: false } }
            }
        })
    };

    document.querySelectorAll("#analyticsPage .period").forEach(button => {
        button.addEventListener("click", function () {
            document.querySelectorAll("#analyticsPage .period").forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            console.log("Selected period:", this.dataset.period);
        });
    });
}
