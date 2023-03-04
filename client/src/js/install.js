const butInstall = document.getElementById("buttonInstall");

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    butInstall.style.visibility = "visible";
    deferredPrompt = event;
});

butInstall.addEventListener("click", async () => {
    butInstall.setAttribute("disabled", true);
    deferredPrompt.prompt();
    butInstall.textContent = "Installed!";
});

window.addEventListener("appinstalled", (event) => {
    console.log("👍", "appinstalled", event);
});
