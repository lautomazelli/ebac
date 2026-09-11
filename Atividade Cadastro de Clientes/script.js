const BIN_ID = "6aa46882ffd5d16053fbc3b6";
const API_KEY = "$2a$10$WdwKlNGUug/xg3ZFflmf8.c6I/3b1gNi5AWPCdDgybDOVY0YQisZe";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const btnCadastrar = document.getElementById('botao_cadastro');
const tbodyLista = document.getElementById('lista_clientes');

let paginaAtual = 1;
const itensPorPagina = 6;

async function listarClientes() {
    try {
        const resposta = await fetch(`${API_URL}/latest`, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        const dados = await resposta.json();
        let clientes = dados.record?.clientes || [];
        
        const totalClientes = clientes.length;
        document.getElementById('total').textContent = totalClientes;
        
        const inicio = (paginaAtual - 1) * itensPorPagina;
        const fim = Math.min(inicio + itensPorPagina, totalClientes);
        
        document.getElementById('inicio').textContent = totalClientes > 0 ? inicio + 1 : 0;
        document.getElementById('fim').textContent = fim;
        document.getElementById('pagina_atual').textContent = paginaAtual;
        
        const clientesPagina = clientes.slice(inicio, fim);
        
        tbodyLista.innerHTML = '';
        
        clientesPagina.forEach(cliente => {
            criarLinhaNaTabela(cliente);
        });
        
        atualizarBotoesPaginacao(totalClientes);
        
    } catch (erro) {
        console.error("Erro ao buscar clientes:", erro);
    }
}

function criarLinhaNaTabela(cliente) {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td class="coluna_acoes">
            <button class="btn_excluir" onclick="deletarCliente('${cliente.id}')">
                <img src="imagens/trash.png" alt="Excluir cliente" class="icon_lixeira">
            </button>
        </td>
    `;
    
    tbodyLista.appendChild(tr);
}

async function cadastrarCliente() {
    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();

    if (nome === '' || email === '') {
        alert('Por favor, preencha o nome e o e-mail!');
        return;
    }

    try {
        const respostaAtual = await fetch(`${API_URL}/latest`, {
            headers: {
                'X-Master-Key': API_KEY
            }
        });
        const dadosAtuais = await respostaAtual.json();
        const clientes = dadosAtuais.record?.clientes || [];

        const novoCliente = {
            id: Date.now().toString(),
            nome: nome,
            email: email
        };
        clientes.push(novoCliente);

        await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify({ clientes: clientes })
        });

        inputNome.value = '';
        inputEmail.value = '';
        
        listarClientes();
        
    } catch (erro) {
        console.error("Erro ao cadastrar:", erro);
        alert('Erro ao cadastrar o cliente.');
    }
}

async function deletarCliente(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir este cliente?");
    
    if (confirmacao) {
        try {
            const respostaAtual = await fetch(`${API_URL}/latest`, {
                headers: {
                    'X-Master-Key': API_KEY
                }
            });
            const dadosAtuais = await respostaAtual.json();
            let clientes = dadosAtuais.record?.clientes || [];

            clientes = clientes.filter(c => c.id !== id);

            await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY
                },
                body: JSON.stringify({ clientes: clientes })
            });
            
            listarClientes();
            
        } catch (erro) {
            console.error("Erro ao excluir:", erro);
            alert('Erro ao excluir o cliente.');
        }
    }
}

function mudarPagina(direcao) {
    paginaAtual += direcao;
    if (paginaAtual < 1) paginaAtual = 1;
    
    const totalClientes = parseInt(document.getElementById('total').textContent);
    const totalPaginas = Math.ceil(totalClientes / itensPorPagina);
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
    
    listarClientes();
}

function atualizarBotoesPaginacao(total) {
    const totalPaginas = Math.ceil(total / itensPorPagina);
    const botoes = document.querySelectorAll('.btn_pagina');
    
    botoes[0].disabled = paginaAtual === 1;
    botoes[0].style.opacity = paginaAtual === 1 ? '0.3' : '1';
    
    botoes[1].disabled = paginaAtual >= totalPaginas || total === 0;
    botoes[1].style.opacity = (paginaAtual >= totalPaginas || total === 0) ? '0.3' : '1';
}

document.addEventListener('DOMContentLoaded', listarClientes);

btnCadastrar.addEventListener('click', cadastrarCliente);