export default function validaCpf(campo) {
    // 000.000.000-00 retorna 00000000000
    const cpf = campo.value.replace(/\.|-/g, "");
    console.log(validarNumerosRepetidos(cpf));
    console.log(validarPrimeiroDigito(cpf));
    console.log(validarSegundoDigito(cpf));

    if (validarNumerosRepetidos(cpf) || !validarPrimeiroDigito(cpf) || !validarSegundoDigito(cpf)) {
        console.log("Cpf inválido");
    } else {
        console.log("Cpf válido");
    }
}

function validarNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999",
    ];
    return numerosRepetidos.includes(cpf);
}

function validarPrimeiroDigito(cpf) {
    return checarDigitoVerificador(cpf, 1);
};

function validarSegundoDigito(cpf) {
    return checarDigitoVerificador(cpf, 2);
}

//Algoritimo que calcula o digito verificador recebendo como parâmero o cpf e qual digito quer verificar
function checarDigitoVerificador(cpf, digitoVerificador) {
    let soma = 0;
    let multiplicador = 0;
    if (digitoVerificador == 1) {
        multiplicador = 10;
    } else if (digitoVerificador == 2) {
        multiplicador = 11;
    } else {
        return false;
    }

    for (let posicaoCpf = 0; posicaoCpf < digitoVerificador + 8; posicaoCpf++) {
        soma = soma + parseInt(cpf[posicaoCpf] * multiplicador);
        multiplicador--;
    }

    let modulo = soma % 11;
    let digito = modulo < 2 ? 0 : 11 - modulo;

    if (digito !== parseInt(cpf[(digitoVerificador + 8)])) {
        return false;
    } else {
        return true;
    }

    //-----Algoritimo base para o calculo do digito verificador
    // let soma = 0;
    // let multiplicador = 10;
    //     for (let posicaoCpf = 0; posicaoCpf < 9; posicaoCpf++){
    //         soma = soma + parseInt(cpf[posicaoCpf] * multiplicador);
    //         multiplicador--;
    //     }

    //     let modulo = soma % 11;
    //     let digito = modulo < 2 ? 0 : 11 - modulo;

    //     if (digito !== parseInt(cpf[9])){
    //         return false;
    //     }else{
    //         return true;
    //     }
    //--------------------------------------------------------------------

}