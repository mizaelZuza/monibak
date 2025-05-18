import validaCpf from "./valida-cpf.js";
import validaIdade from "./valida-idade.js";

const camposFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

camposFormulario.forEach((campo) => {
    //O evento BLUR acontece quando o campo perde o foco do mouse ou quando ele perde o foco do teclado
    campo.addEventListener("blur", () => verificarCampo(campo));
    //O evento INVALID acontece quando o campo estiver com algum erro
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

//O evento SUBMIT acontece quando o formulário for enviado
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    //Objeto com os dados do formulário
    //O evento.target.elements retorna um array com todos os elementos do formulário
    const listaItensDoFormulario = {
        'nome': evento.target.elements['nome'].value,
        'email': evento.target.elements['email'].value,
        'rg': evento.target.elements['rg'].value,
        'cpf': evento.target.elements['cpf'].value,
        'aniversario': evento.target.elements['aniversario'].value
    }
    //----------------------------------------------------------------------------

    //Salva os dados do formulário no localStorage com o nome 'cadastro'
    //O JSON.stringify transforma o objeto em uma string
    localStorage.setItem("cadastro", JSON.stringify(listaItensDoFormulario));
    //----------------------------------------------------------------------------

    window.location.href = "./abrir-conta-form-2.html";
});

const tiposDeErro = [
    "valueMissing", //Erro quando o campo estiver vazio
    "typeMismatch", //Erro quando o campo estiver com um formato diferente
    "patternMismatch", //Erro quando o campo estiver com um formato diferente
    "tooShort", //Erro quando o campo estiver com menos de 2 caracteres
    "customError" //Erro personalizado
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificarCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity("");
    if (campo.name == "cpf" && campo.value.length >= 11) {
        validaCpf(campo);
    }

    if (campo.name == "aniversario" && campo.value !== "") {
        validaIdade(campo);
    }

    //Esse array checa se o campo possui algum erro e se ele possui, pega qual erro
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    });
    //----------------------------------------------------------------------------
    //Seleciona o elemento pai do campo e pega o elemento filho que tem a classe mensagem-erro
    //É usado o parentNode para garantir que o escopo de busca do querySelector seja o campo atual de digitação
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    //----------------------------------------------------------------------------

    //Verifica se o campo possui algum erro e atribui true ou false para validadorDeCampo
    const validadorDeCampo = campo.checkValidity();
    // ----------------------------------------------------------------------------

    if (!validadorDeCampo) { //Se o campo possuir algum erro
        mensagemErro.textContent = mensagem;
    } else { //Se o campo nao possuir algum erro
        mensagemErro.textContent = "";
    }

};

