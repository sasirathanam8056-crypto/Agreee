// Market Price module

function updatePrices() {
    const rice = Math.floor(Math.random() * 400) + 3000;
    const wheat = Math.floor(Math.random() * 300) + 2500;
    const tomato = Math.floor(Math.random() * 400) + 2600;
    const onion = Math.floor(Math.random() * 400) + 2900;

    const riceEl = document.getElementById("ricePrice");
    const wheatEl = document.getElementById("wheatPrice");
    const tomatoEl = document.getElementById("tomatoPrice");
    const onionEl = document.getElementById("onionPrice");
    const updatedEl = document.getElementById("lastUpdated");

    if (riceEl) riceEl.textContent = "₹" + rice;
    if (wheatEl) wheatEl.textContent = "₹" + wheat;
    if (tomatoEl) tomatoEl.textContent = "₹" + tomato;
    if (onionEl) onionEl.textContent = "₹" + onion;
    if (updatedEl) updatedEl.textContent = "Just now";
}

function initializeMarket() {
    const updateBtn = document.getElementById("updatePriceBtn");
    if (updateBtn) updateBtn.onclick = updatePrices;
    updatePrices();
}
