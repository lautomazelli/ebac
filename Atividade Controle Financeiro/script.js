
const matrizGastos = [
    ["alimentacao", 0],
    ["transporte", 0],
    ["lazer", 0],
    ["outros", 0],
    ["total", 0],
]

// FUNÇÕES UTILITÁRIAS
const obterElemento = (id) => document.getElementById(id);
const valorNegativo = (valor) => valor <0;
const somaValor = (total, valor) => total + valor;
const limparCampos = () => obterElemento('valor').value = '';
const formataMoeda = (valor) => valor.toFixed(2).replace('.', ',');

// OBTER VALORES DO FORM
const obterValorInformado = () => parseFloat(obterElemento('valor').value);
const obterCategoriaInformada = () => obterElemento('categoria').value;

// OBTER CATEGORIAS DA MATRIZ
const obterCategoria = (matriz, nomeCategoria) => matriz.find((item) => item[0] === nomeCategoria);

// ATUALIZAR VALORES DA MATRIZ
const atualizaValorCategoria = (categoria, valor) => categoria [1] = somaValor(categoria[1], valor);


const atualizarInterface = () => {

    matrizGastos.forEach(([nome, valor]) =>{
        const elemento = obterElemento(nome);
        if (elemento) {
        elemento.textContent = `R$ ${formataMoeda(valor)}`
        }
    })
}



function adicionarGasto(){
    const valorInformado = obterValorInformado();
    const categoriaInformada = obterCategoriaInformada();

    if(valorNegativo(valorInformado)){
        alert("Valor inválido. O valor não pode ser negativo.");
        return;
    }

    const categoria = obterCategoria(matrizGastos, categoriaInformada);
    const total = obterCategoria(matrizGastos, "total");

    atualizaValorCategoria(categoria, valorInformado);
    atualizaValorCategoria(total, valorInformado);
    atualizarInterface();
    limparCampos();
}