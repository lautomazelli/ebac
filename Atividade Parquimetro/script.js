class Parquimetro {
    constructor() {
        this.pacotes = [
            { valor: 3.00, tempo: 120 },
            { valor: 1.75, tempo: 60 },
            { valor: 1.00, tempo: 30 }
        ];
    }

    calcular(valorDigitado) {
        if (isNaN(valorDigitado) || valorDigitado <= 0) {
            return { erro: "Valor Inválido!" };
        }

        let pacoteAplicado, tempoAplicado, troco;

        if (valorDigitado >= 3.00) {
            pacoteAplicado = 3.00;
            tempoAplicado = 120;
            troco = valorDigitado - 3.00;
        } else if (valorDigitado >= 1.75) {
            pacoteAplicado = 1.75;
            tempoAplicado = 60;
            troco = valorDigitado - 1.75;
        } else if (valorDigitado >= 1.00) {
            pacoteAplicado = 1.00;
            tempoAplicado = 30;
            troco = valorDigitado - 1.00;
        } else {
            return { erro: "valor_insuficiente" };
        }

        return {
            pacote: pacoteAplicado,
            tempo: tempoAplicado,
            troco: troco
        };
    }   
}       

class ParquimetroUI {
    constructor() {
        (this.parquimetro = new Parquimetro());
        this.saldo = 0;
        this.valorAtual = 0;
        this.iniciar();
    }

    iniciar() {
    const cards = document.querySelectorAll(".valor_card");

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            this.aoClicarCard(card);   
        });
    });

    const input = document.getElementById("valor_desejado");
    input.addEventListener("input", () => {
        this.aoDigitar();
    })

    const botao = document.getElementById("adicionar_saldo");   
    botao.addEventListener("click", () => {
        this.aoAdicionarSaldo();
});
}

aoClicarCard(card) {
    const cards = document.querySelectorAll(".valor_card");
    cards.forEach((c) => c.classList.remove("valor_card_selecionado"));

    
    card.classList.add("valor_card_selecionado");

    
    const id = card.id;
    let valor = 0;
    if (id === "valor_botao1")   valor = 1.00;
    if (id === "valor_botao175") valor = 1.75;
    if (id === "valor_botao3")   valor = 3.00;

    this.valorAtual = valor;
    
    const resultado = this.parquimetro.calcular(valor);
    this.atualizarResumo(resultado, valor);   
}

aoDigitar(){
    const cards = document.querySelectorAll(".valor_card");
    cards.forEach((c) => c.classList.remove("valor_card_selecionado"));

    const input = document.getElementById("valor_desejado");
    const valorDigitado = parseFloat(input.value);
    this.valorAtual = valorDigitado;

    const resultado = this.parquimetro.calcular(valorDigitado);

    this.atualizarResumo(resultado, valorDigitado);   

}

formataMoeda(valor) {
    return "R$" + valor.toFixed(2).replace(".", ",");
}

atualizarResumo(resultado, valor) {

    const valorSeguro = isNaN(valor) ? 0 : valor;

    document.getElementById("valor_adicionar").textContent = this.formataMoeda(valorSeguro);

    if (resultado.erro) {
        document.getElementById("tempo_estacionamento").textContent = "-- min";
        document.getElementById("troco").textContent = this.formataMoeda(0);
        document.getElementById("total_adicionado").textContent = this.formataMoeda(0);
    } else {
        document.getElementById("tempo_estacionamento").textContent = resultado.tempo + " min";
        document.getElementById("troco").textContent = this.formataMoeda(resultado.troco);
        document.getElementById("total_adicionado").textContent = this.formataMoeda(resultado.pacote);
    }

}

aoAdicionarSaldo() {
    const resultado = this.parquimetro.calcular(this.valorAtual);

    
    if (resultado.erro) {
        alert("Escolha ou digite um valor válido primeiro!");
        return;
    }

    
    this.saldo += resultado.pacote;
    document.getElementById("saldo_total").textContent = this.formataMoeda(this.saldo);
    document.getElementById("saldo_atual").textContent = this.formataMoeda(this.saldo);

    
    document.getElementById("valor_desejado").value = "";
    const cards = document.querySelectorAll(".valor_card");
    cards.forEach((c) => c.classList.remove("valor_card_selecionado"));
    this.valorAtual = 0;   
    this.atualizarResumo({ erro: "vazio" }, 0);

    alert("Pagamento concluído com sucesso! Saldo atualizado.");
}

}

const ui = new ParquimetroUI(); 