export class GerenciadorClientes {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
        this.clientes = [];
        this.paginaAtual = 1;
        this.itensPorPagina = 6;
    }

    
    async buscarClientes() {
        try {
            const resposta = await fetch(`${this.apiUrl}/latest`, {
                headers: {
                    'X-Master-Key': this.apiKey
                }
            });
            const dados = await resposta.json();
            this.clientes = dados.record?.clientes || [];
            return this.clientes;
        } catch (erro) {
            console.error("Erro ao buscar clientes:", erro);
            throw erro;
        }
    }

    
    async adicionarCliente(nome, email) {
        try {
            await this.buscarClientes();
            
            const novoCliente = {
                id: Date.now().toString(),
                nome: nome.trim(),
                email: email.trim()
            };
            
            this.clientes.push(novoCliente);

            await fetch(this.apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': this.apiKey
                },
                body: JSON.stringify({ clientes: this.clientes })
            });
            
            return true;
        } catch (erro) {
            console.error("Erro ao cadastrar:", erro);
            throw erro;
        }
    }

    
    async excluirCliente(id) {
        try {
            await this.buscarClientes();
            
            
            this.clientes = this.clientes.filter(cliente => cliente.id !== id);

            await fetch(this.apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': this.apiKey
                },
                body: JSON.stringify({ clientes: this.clientes })
            });
            
            return true;
        } catch (erro) {
            console.error("Erro ao excluir:", erro);
            throw erro;
        }
    }

    
    getTotalClientes() {
        return this.clientes.length;
    }

    
    getClientesPagina() {
        const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        return this.clientes.slice(inicio, fim);
    }

    
    getTotalPaginas() {
        return Math.ceil(this.getTotalClientes() / this.itensPorPagina);
    }

    
    mudarPagina(direcao) {
        const novaPagina = this.paginaAtual + direcao;
        const totalPaginas = this.getTotalPaginas();
        
        if (novaPagina >= 1 && novaPagina <= totalPaginas) {
            this.paginaAtual = novaPagina;
            return true;
        }
        return false;
    }

    
    getInformacoesPaginacao() {
        const total = this.getTotalClientes();
        const inicio = total > 0 ? (this.paginaAtual - 1) * this.itensPorPagina + 1 : 0;
        const fim = Math.min(this.paginaAtual * this.itensPorPagina, total);
        
        return {
            inicio,
            fim,
            total,
            paginaAtual: this.paginaAtual,
            totalPaginas: this.getTotalPaginas()
        };
    }
}