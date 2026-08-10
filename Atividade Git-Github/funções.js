function calcularImc(){
const peso = Number(document.getElementById("peso").value);
const altura = Number(document.getElementById("altura").value);

const imc = peso / (altura * altura);

const resultado = document.getElementById("resultado");
resultado.innerText = "Seu IMC é: " + imc.toFixed(2);

resultado.style.display = "block";
classificacao.style.display = "block";
linkResultado.style.display = "block";

if (imc <=18.5){
    classificacao.innerText = "Você está abaixo do peso"
}

    else if (imc < 25){
        classificacao.innerText = "Você está no peso correto"
    }

    else if (imc < 30){
        classificacao.innerText = "Você está com sobrepeso"
    }

    else if (imc < 35){
        classificacao.innerText = "Você está com Obesidade Grau I"
    }

    else if (imc < 40){
        classificacao.innerText = "Vpcê está com Obesidade Grau II"
    }

    else {
        classificacao.innerText = "Você está com Obesidade Grau III"
    }
}