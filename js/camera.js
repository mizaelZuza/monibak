const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");

botaoIniciarCamera.addEventListener("click", async function () {
    //**A linha abaixo solicita ao usuario permissao para usar a camera
    // o navigator.mediaDevices.getUserMedia é responsável por fazer essa solicitação */
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    

    campoCamera.style.display = "block";
    botaoIniciarCamera.style.display = "none";

    //**A linha abaixo faz com que o video seja exibido na tela
    // no componente video*/
    video.srcObject = iniciarVideo;

});