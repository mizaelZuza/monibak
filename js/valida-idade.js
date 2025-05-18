export default function validaIdade(campo){
    const dataNascimento = new Date(campo.value);
    console.log("dataNascimento", dataNascimento);
    if(!validaMaiorIdade(dataNascimento)){
        campo.setCustomValidity("O usuário deve ser maior de idade");
    }
}

function validaMaiorIdade(data) {
    const dataAtual = new Date();
    console.log("dataAtual", dataAtual);

    const dataMais18 = new Date(data.getFullYear() + 18, data.getMonth(), data.getDate());
    console.log("dataMais18", dataMais18);

    return dataMais18 <= dataAtual;
}