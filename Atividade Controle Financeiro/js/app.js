import { ControleFinanceiro } from './classes.js';
import { obterElemento, formatarMoeda, validarValor, limparCampo } from './utils.js';

const app = {
    controle: null,

    init() {
        this.controle = new ControleFinanceiro();
        this.configurarEventos();
        this.atualizarInterface();
    },

    configurarEventos() {
        const btnAdicionar = obterElemento('btn-adicionar');
        
        if (btnAdicionar) {
            btnAdicionar.addEventListener('click', () => this.processarGasto());
        }
    },

    processarGasto() {
        const inputValor = obterElemento('valor');
        const selectCategoria = obterElemento('categoria');
        
        const valor = parseFloat(inputValor.value);
        const categoria = selectCategoria.value;

        if (!validarValor(valor)) {
            alert('Por favor, insira um valor válido maior que zero.');
            return;
        }

        if (!categoria) {
            alert('Por favor, selecione uma categoria.');
            return;
        }

        this.controle.adicionarGasto(categoria, valor);
        this.atualizarInterface();
        limparCampo('valor');
        selectCategoria.value = '';
    },

    atualizarInterface() {
    this.controle.categorias.forEach(cat => {
        const elemento = obterElemento(cat.nome);
        if (elemento) {
            elemento.textContent = formatarMoeda(cat.valor);
        }
    });

    const elementoTotal = obterElemento('total');
    if (elementoTotal) {
        const total = this.controle.calcularTotal();
        elementoTotal.textContent = formatarMoeda(total);
    }
}
};

document.addEventListener('DOMContentLoaded', () => app.init());