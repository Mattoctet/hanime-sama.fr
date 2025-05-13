window.addEventListener('DOMContentLoaded', () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const deviceInfo = document.getElementById('device-info');
    
    if (/mobile|iphone|android/.test(userAgent)) {
        deviceInfo.textContent = "Appareil détecté : Mobile 📱";
    } else if (/tablet|ipad/.test(userAgent)) {
        deviceInfo.textContent = "Appareil détecté : Tablette 🧾";
    } else if (/desktop/.test(userAgent)) {
        deviceInfo.textContent = "Appareil détecté : Ordinateur 💻";
    } else {
        deviceInfo.textContent = "Appareil non reconnue";
    }
});
