

const totalTentativas = 5;
let tentativasRestantes = 5;
let numeroSecreto = Math.floor(Math.random()*100)+1;
let jogoAtivo = true;
let numeroTentativa = 0;


function verificarPalpite(){
    
    if (!jogoAtivo) return;
    
const palpite = Number(document.getElementById("palpite_input").value);

if (palpite === numeroSecreto){
    jogoAtivo = false;
    alert("Parabéns, você acertou! O número secreto é " + numeroSecreto);
} else {
    const dica = palpite > numeroSecreto ? "menor" : "maior";
    document.getElementById("maiorMenor").textContent = dica;

    perderVida();
    
    if(tentativasRestantes === 0) {
        jogoAtivo = false;
        alert("Você perdeu! O número secreto era " + numeroSecreto);
    }

    registrarHistorico(palpite, dica);

    document.getElementById("palpite_input").value = " ";
}
}

function perderVida(){
    document.getElementById("coracao" + tentativasRestantes).src = "imagens/coracaoPartido.png"
    tentativasRestantes = tentativasRestantes -1;    
}


function registrarHistorico(palpite, dica){
    numeroTentativa++;
    let textoDica = document.createElement("li");
    textoDica.textContent = `${palpite} - o número secreto é ${dica} - tentativa  ${numeroTentativa}`;
    document.getElementById("historico").prepend(textoDica);
}