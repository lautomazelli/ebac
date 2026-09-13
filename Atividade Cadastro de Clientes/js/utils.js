
export const obterElemento = (id) => document.getElementById(id);


export const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};


export const validarCampo = (valor) => {
    return valor && valor.trim() !== '';
};


export const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};


export const limparCampo = (id) => {
    const elemento = obterElemento(id);
    if (elemento) elemento.value = '';
};


export const criarElemento = (tag, className = '', textContent = '') => {
    const elemento = document.createElement(tag);
    if (className) elemento.className = className;
    if (textContent) elemento.textContent = textContent;
    return elemento;
};