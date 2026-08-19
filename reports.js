function initializeReports(){
    const lightbox=document.getElementById("reportLightbox");
    const image=document.getElementById("reportLightboxImage");
    const title=document.getElementById("reportLightboxTitle");
    const close=document.getElementById("closeReportLightbox");

    document.querySelectorAll("#reportsPage .report-image-card").forEach(card=>{
        card.addEventListener("click",()=>{
            image.src=card.dataset.image;
            image.alt=card.dataset.title;
            title.textContent=card.dataset.title;
            lightbox.classList.add("show");
        });
    });

    if(close) close.onclick=()=>lightbox.classList.remove("show");
    if(lightbox) lightbox.addEventListener("click",e=>{
        if(e.target===lightbox) lightbox.classList.remove("show");
    });

    const print=document.getElementById("printReportBtn");
    if(print) print.onclick=()=>window.print();
}
