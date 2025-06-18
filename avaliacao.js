        
        function carregarProdutos() {
            const container = document.getElementById('produtos-selecionados');
            produtosExemplo.forEach(produto => {
                const produtoElement = document.createElement('div');
                produtoElement.className = 'produto-item';
                produtoElement.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h4>${produto.nome}</h4>
                    <p>${produto.preco}</p>
                `;
                container.appendChild(produtoElement);
            });
        }

       
        function configurarEstrelas(containerId, valorId) {
            const container = document.getElementById(containerId);
            const valorSpan = document.getElementById(valorId);
            const estrelas = container.querySelectorAll('.estrela');
            let valorAtual = 0;

            estrelas.forEach((estrela, index) => {
                estrela.addEventListener('click', () => {
                    valorAtual = index + 1;
                    atualizarEstrelas(estrelas, valorAtual);
                    valorSpan.textContent = `${valorAtual}/5`;
                });

                estrela.addEventListener('mouseenter', () => {
                    atualizarEstrelas(estrelas, index + 1);
                });

                estrela.addEventListener('mouseleave', () => {
                    atualizarEstrelas(estrelas, valorAtual);
                });
            });
        }

        function atualizarEstrelas(estrelas, valor) {
            estrelas.forEach((estrela, index) => {
                if (index < valor) {
                    estrela.classList.add('ativa');
                } else {
                    estrela.classList.remove('ativa');
                }
            });
        }


        function configurarFormulario() {
            const form = document.getElementById('form-avaliacao');
            const mensagemSucesso = document.getElementById('mensagem-sucesso');

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                
                setTimeout(() => {
                    form.style.display = 'none';
                    mensagemSucesso.style.display = 'block';
                    
                    
                    mensagemSucesso.scrollIntoView({ behavior: 'smooth' });
                }, 1000);
            });
        }

        // Inicializar quando a página carregar
        document.addEventListener('DOMContentLoaded', () => {
            carregarProdutos();
            configurarEstrelas('estrelas-geral', 'valor-estrelas');
            configurarEstrelas('estrelas-qualidade', 'valor-qualidade');
            configurarEstrelas('estrelas-atendimento', 'valor-atendimento');
            configurarFormulario();
        });