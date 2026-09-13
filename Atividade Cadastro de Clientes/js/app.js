import { GerenciadorClientes } from './classes.js';
import { 
    obterElemento, 
    validarCampo, 
    validarEmail, 
    limparCampo,
    criarElemento
} from './utils.js';


const CONFIG = {
    BIN_ID: "6aa46882ffd5d16053fbc3b6",
    API_KEY: "$2a$10$WdwKlNGUug/xg3ZFflmf8.c6I/3b1gNi5AWPCdDgybDOVY0YQisZe",
    get API_URL() {
        return `https://api.jsonbin.io/v3/b/${this.BIN_ID}`;
    }
};


const app = {
    gerenciador: null,

    init() {
        
        this.gerenciador = new GerenciadorClientes(CONFIG.API_URL, CONFIG.API_KEY);
        
        
        this.configurarEventos();
        
        
        this.carregarClientes();
    },

    configurarEventos() {
        
        const btnCadastrar = obterElemento('botao_cadastro');
        if (btnCadastrar) {
            btnCadastrar.addEventListener('click', () => this.processarCadastro());
        }

        
        const btnAnterior = obterElemento('btn-anterior');
        const btnProximo = obterElemento('btn-proximo');

        if (btnAnterior) {
            btnAnterior.addEventListener('click', () => this.mudarPagina(-1));
        }

        if (btnProximo) {
            btnProximo.addEventListener('click', () => this.mudarPagina(1));
        }
    },

    async processarCadastro() {
        const inputNome = obterElemento('nome');
        const inputEmail = obterElemento('email');

        const nome = inputNome?.value || '';
        const email = inputEmail?.value || '';

        
        if (!validarCampo(nome)) {
            alert('Por favor, preencha o nome!');
            inputNome?.focus();
            return;
        }

        if (!validarCampo(email)) {
            alert('Por favor, preencha o e-mail!');
            inputEmail?.focus();
            return;
        }

        if (!validarEmail(email)) {
            alert('Por favor, insira um e-mail válido!');
            inputEmail?.focus();
            return;
        }

        try {
            await this.gerenciador.adicionarCliente(nome, email);
            
            
            limparCampo('nome');
            limparCampo('email');
            
            
            await this.carregarClientes();
            
        } catch (erro) {
            alert('Erro ao cadastrar cliente. Tente novamente.');
        }
    },

    async carregarClientes() {
        try {
            await this.gerenciador.buscarClientes();
            this.renderizarTabela();
            this.atualizarPaginacao();
        } catch (erro) {
            console.error("Erro ao carregar clientes:", erro);
        }
    },

    renderizarTabela() {
        const tbody = obterElemento('lista_clientes');
        if (!tbody) return;

        
        tbody.innerHTML = '';

        
        const clientes = this.gerenciador.getClientesPagina();

        
        clientes.forEach(cliente => {
            const linha = this.criarLinhaCliente(cliente);
            tbody.appendChild(linha);
        });
    },

    criarLinhaCliente(cliente) {
        const tr = criarElemento('tr');

        const tdNome = criarElemento('td', '', cliente.nome);
        const tdEmail = criarElemento('td', '', cliente.email);
        const tdAcoes = criarElemento('td', 'coluna_acoes');

        
        const btnExcluir = criarElemento('button', 'btn_excluir');
        btnExcluir.setAttribute('title', 'Excluir cliente');
        
        const imgLixeira = criarElemento('img', 'icon_lixeira');
        imgLixeira.src = 'imagens/trash.png';
        imgLixeira.alt = 'Excluir cliente';

        btnExcluir.appendChild(imgLixeira);
        
        
        btnExcluir.addEventListener('click', () => this.excluirCliente(cliente.id));

        tdAcoes.appendChild(btnExcluir);
        tr.appendChild(tdNome);
        tr.appendChild(tdEmail);
        tr.appendChild(tdAcoes);

        return tr;
    },

    async excluirCliente(id) {
        const confirmacao = confirm("Tem certeza que deseja excluir este cliente?");
        
        if (!confirmacao) return;

        try {
            await this.gerenciador.excluirCliente(id);
            await this.carregarClientes();
        } catch (erro) {
            alert('Erro ao excluir cliente. Tente novamente.');
        }
    },

    mudarPagina(direcao) {
        if (this.gerenciador.mudarPagina(direcao)) {
            this.renderizarTabela();
            this.atualizarPaginacao();
        }
    },

    atualizarPaginacao() {
        const info = this.gerenciador.getInformacoesPaginacao();

        
        const spanInicio = obterElemento('inicio');
        const spanFim = obterElemento('fim');
        const spanTotal = obterElemento('total');
        const spanPaginaAtual = obterElemento('pagina_atual');

        if (spanInicio) spanInicio.textContent = info.inicio;
        if (spanFim) spanFim.textContent = info.fim;
        if (spanTotal) spanTotal.textContent = info.total;
        if (spanPaginaAtual) spanPaginaAtual.textContent = info.paginaAtual;

        
        const btnAnterior = obterElemento('btn-anterior');
        const btnProximo = obterElemento('btn-proximo');

        if (btnAnterior) {
            btnAnterior.disabled = info.paginaAtual === 1;
            btnAnterior.style.opacity = info.paginaAtual === 1 ? '0.3' : '1';
        }

        if (btnProximo) {
            btnProximo.disabled = info.paginaAtual >= info.totalPaginas || info.total === 0;
            btnProximo.style.opacity = (info.paginaAtual >= info.totalPaginas || info.total === 0) ? '0.3' : '1';
        }
    }
};


document.addEventListener('DOMContentLoaded', () => app.init());