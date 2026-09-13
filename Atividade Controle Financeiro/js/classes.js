export class ControleFinanceiro {
    constructor() {
        
        this.categorias = [
            { nome: 'alimentacao', valor: 0 },
            { nome: 'transporte', valor: 0 },
            { nome: 'lazer', valor: 0 },
            { nome: 'outros', valor: 0 }
        ];
    }

    
    adicionarGasto(nomeCategoria, valor) {
        
        const categoria = this.categorias.find(cat => cat.nome === nomeCategoria);
        
        if (categoria) {
            categoria.valor += valor;
            return true;
        }
        return false;
    }

    
    calcularTotal() {
        
        return this.categorias.reduce((total, categoria) => total + categoria.valor, 0);
    }

    
    obterValorCategoria(nomeCategoria) {
        const categoria = this.categorias.find(cat => cat.nome === nomeCategoria);
        return categoria ? categoria.valor : 0;
    }
}