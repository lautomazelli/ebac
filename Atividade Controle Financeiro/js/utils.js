
export const obterElemento = (id) => document.getElementById(id);


export const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};


export const validarValor = (valor) => {
    return !isNaN(valor) && valor > 0;
};


export const limparCampo = (id) => {
    const elemento = obterElemento(id);
    if (elemento) elemento.value = '';
};