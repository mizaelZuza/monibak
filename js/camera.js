const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const tirarFoto = document.querySelector("[data-tirar-foto]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviar = document.querySelector("[data-enviar]");
const videoCanvas = document.querySelector("[data-video-canvas]");


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

//**Declaração da variável que vai armazenar o caminho da imagem capturada */
let imagemUrl = "";

//**Evento que captura a imagem*/
tirarFoto.addEventListener("click", function () {
    //**A linha abaixo criar um contexto 2D para capturar a imagem e o recurso drawImage captura a imagem 
    // utilizando os atributos width e height que também poderiam ter sido setados tamanhos específicos*/
    videoCanvas.getContext("2d").drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
    imagemUrl = videoCanvas.toDataURL("image/jpeg"); // Atribui o caminho da imagem capturada ao atributo imagemUrl
    campoCamera.style.display = "none";
    mensagem.style.display = "block";
});

//**Evento que busca o localStorage e adicionao o caminho da imagem*/
botaoEnviar.addEventListener("click", function () {
    const dadosExistentes = localStorage.getItem("cadastro"); // Busca os dados do localStorage
    const dadosConvertidos = JSON.parse(dadosExistentes); // Converte os dados em um objeto
    dadosConvertidos.imagem = imagemUrl; // Adiciona o caminho da imagem ao objeto
    localStorage.setItem("cadastro", JSON.stringify(dadosConvertidos)); // Salva os dados atualizados no localStorage
    window.location.href = "../pages/abrir-conta-form-3.html"; // Redireciona para a nova página
});