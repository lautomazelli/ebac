
document.addEventListener('DOMContentLoaded', () => {
    
    
    const dadosSalvos = localStorage.getItem('formulario_renova');
    
    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);
        
        for (const idCampo in dados) {
            const campo = document.getElementById(idCampo);
            if (campo) {
                campo.value = dados[idCampo];
            }
        }
    }

   
    const containerDados = document.querySelector('.container_dados');
    
    containerDados.addEventListener('input', () => {
        const dadosParaSalvar = {
            nome: document.getElementById('nome').value,
            nascimento: document.getElementById('nascimento').value,
            fone: document.getElementById('fone').value,
            email: document.getElementById('email').value,
            cep: document.getElementById('cep').value,
            rua: document.getElementById('rua').value,
            numero: document.getElementById
            ('numero').value,
            bairro: document.getElementById('bairro').value,
            referencia: document.getElementById('referencia').value,
            cidade: document.getElementById('cidade').value,
            estado: document.getElementById('estado').value
        };
        
        localStorage.setItem('formulario_renova', JSON.stringify(dadosParaSalvar));
    });

    
    const inputFone = document.getElementById('fone');
    
    inputFone.addEventListener('input', (e) => {
        
        let numeros = e.target.value.replace(/\D/g, '');
        
        
        if (numeros.length <= 10) {
            
            numeros = numeros.replace(/^(\d{2})(\d{4})(\d{4}).*/, '($1)$2-$3');
        } else {
            
            numeros = numeros.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1)$2-$3');
        }
        
        e.target.value = numeros;
    });

    
    const inputCep = document.getElementById('cep');
    
    
    async function buscarCep() {
        const cep = inputCep.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
            try {
                inputCep.placeholder = "Buscando...";
                
                const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const dadosEndereco = await resposta.json();
                
                if (!dadosEndereco.erro) {
                    document.getElementById('rua').value = dadosEndereco.logradouro;
                    document.getElementById('bairro').value = dadosEndereco.bairro;
                    document.getElementById('cidade').value = dadosEndereco.localidade;
                    document.getElementById('estado').value = dadosEndereco.uf;
                    document.getElementById('numero').focus();
                } else {
                    alert('CEP não encontrado. Verifique o número digitado.');
                    limparCamposEndereco();
                }
            } catch (erro) {
                console.error('Erro ao buscar CEP:', erro);
                alert('Erro de conexão ao buscar o CEP.');
            } finally {
                inputCep.placeholder = "00000-000";
            }
        } else if (cep.length > 0) {
            alert('CEP inválido. Deve conter 8 números.');
            limparCamposEndereco();
        }
    }
    
    
    inputCep.addEventListener('blur', buscarCep);
    
    
    inputCep.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            buscarCep();
        }
    });

   
    function limparCamposEndereco() {
        document.getElementById('rua').value = '';
        document.getElementById('cidade').value = '';
        document.getElementById('estado').value = '';
    }
});