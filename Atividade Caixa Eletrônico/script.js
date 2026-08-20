

class ContaBancaria {
    #saldo;
    constructor(){
        this.#saldo = 0;
    }

    depositar(valor){
        this.#saldo += valor;
    }

    sacar(valor){
        this.#saldo -= valor;
    }

    temSaldoPraSacar(valor){
        return valor <= this.#saldo;
    }

    get saldo (){
        return this.#saldo;
    }
}


class CaixaEletronico {
    constructor(conta){
        this.conta = conta;
    }

    depositar(){
        const valorDeposito = parseFloat(document.getElementById("deposito").value);
        
        if(isNaN(valorDeposito) || valorDeposito <= 0){
            alert("Digite um valor válido para depositar!");
            return;
        }

        this.conta.depositar(valorDeposito);
        this.mostrarSaldo(this.conta.saldo);
    }

    sacar(){
        const valorSaque = parseFloat(document.getElementById("saque").value);
        
        if(isNaN(valorSaque) || valorSaque <= 0){
            alert("Digite um valor válido para sacar!")
            return;
        }

        if(this.conta.temSaldoPraSacar(valorSaque)){
            this.conta.sacar(valorSaque);
            this.mostrarSaldo(this.conta.saldo);
        } else {
            this.mostrarSaldo("Insuficiente!");
        }
    }

    mostrarSaldo(saldo){
        document.getElementById("saldo_conta").textContent = `R$ ${saldo}`;
        document.getElementById("deposito").value = ` `;
        document.getElementById("saque").value = ` `;
    }
}

const conta = new ContaBancaria();
const caixaEletronico = new CaixaEletronico(conta);