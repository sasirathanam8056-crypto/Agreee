function initializeSettings(){
    const save=document.getElementById("saveSettingsBtn");
    const reset=document.getElementById("resetSettingsBtn");
    const toast=document.getElementById("settingsToast");

    function showToast(message){
        if(!toast) return;
        toast.textContent=message;
        toast.style.display="block";
        setTimeout(()=>toast.style.display="none",2500);
    }

    if(save) save.onclick=()=>{
        localStorage.setItem("farmerName",document.getElementById("farmerName").value);
        localStorage.setItem("farmLocation",document.getElementById("farmLocation").value);
        showToast("✓ Settings saved successfully");
    };

    if(reset) reset.onclick=()=>{
        document.getElementById("farmerName").value="Farmer";
        document.getElementById("farmLocation").value="Chennai";
        document.getElementById("farmType").selectedIndex=0;
        document.getElementById("temperatureUnit").selectedIndex=0;
        document.getElementById("defaultView").selectedIndex=0;
        showToast("Settings reset");
    };

    const savedName=localStorage.getItem("farmerName");
    const savedLocation=localStorage.getItem("farmLocation");
    if(savedName) document.getElementById("farmerName").value=savedName;
    if(savedLocation) document.getElementById("farmLocation").value=savedLocation;
}
