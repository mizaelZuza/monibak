import validaCpf from "./valida-cpf.js";    

const camposFormulario =  document.querySelectorAll("[required]");

camposFormulario.forEach((campo) => {
    //O evento BLUR acontece quando o campo perde o foco do mouse ou quando ele perde o foco do teclado
    campo.addEventListener("blur", () => verificarCampo(campo));
});

function verificarCampo(campo){
    if (campo.name == "cpf" && campo.value.length >= 11) {
        validaCpf(campo);
    }
};

