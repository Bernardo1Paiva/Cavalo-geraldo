document.addEventListener("DOMContentLoaded", function () {
    // Elementos do formulário
    const produtoForm = document.getElementById("produto-form");
    const produtoIdInput = document.getElementById("produto-id");
    const produtoNomeInput = document.getElementById("produto-nome");
    const produtoQuantidadeInput = document.getElementById("produto-quantidade");
    const produtoValorInput = document.getElementById("produto-valor");
    const produtoObservacaoInput = document.getElementById("produto-observacao");

    // Lista de produtos
    const produtoLista = document.getElementById("produto-lista");

    // Função para exibir a lista de produtos
    function exibirProdutos(produtos) {
        produtoLista.innerHTML = "";
        produtos.forEach(function (produto) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>${produto.quantidadeEstoque}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
                <td>${produto.observacao}</td>
                <td>
                    <button onclick="editarProduto(${produto.id})">Editar</button>
                    <button onclick="excluirProduto(${produto.id})">Excluir</button>
                </td>
            `;
            produtoLista.appendChild(tr);
        });
    }

    // Função para adicionar ou atualizar um produto
    function salvarProduto(event) {
        event.preventDefault();
        const id = produtoIdInput.value;
        const nome = produtoNomeInput.value;
        const quantidadeEstoque = parseInt(produtoQuantidadeInput.value);
        const valor = parseFloat(produtoValorInput.value);
        const observacao = produtoObservacaoInput.value;

        if (!nome || !quantidadeEstoque || isNaN(valor)) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        const produto = {
            id: id ? parseInt(id) : null,
            nome: nome,
            quantidadeEstoque: quantidadeEstoque,
            valor: valor,
            observacao: observacao,
        };

        // Aqui você pode enviar uma solicitação à sua API para salvar o produto no backend
        // Por enquanto, vamos apenas atualizar a lista de produtos localmente
        if (id) {
            // Editar produto existente
            atualizarProdutoNoBackend(produto); // Substitua pela chamada à sua API
        } else {
            // Adicionar novo produto
            adicionarProdutoNoBackend(produto); // Substitua pela chamada à sua API
        }

        // Atualiza a lista de produtos na interface do usuário
        const produtosAtualizados = obterTodos(); // Substitua pela chamada à sua API
        exibirProdutos(produtosAtualizados);

        // Limpa o formulário
        produtoForm.reset();
    }

        // Função para editar um produto
        function editarProduto(id) {
            const produto = obterProdutoPorId(id); // Substitua pela chamada à sua API
            if (produto) {
                produtoIdInput.value = produto.id;
                produtoNomeInput.value = produto.nome;
                produtoQuantidadeInput.value = produto.quantidadeEstoque;
                produtoValorInput.value = produto.valor.toFixed(2);
                produtoObservacaoInput.value = produto.observacao;
            }
        }
    
        // Função para excluir um produto
        function excluirProduto(id) {
            if (confirm("Tem certeza de que deseja excluir este produto?")) {
                // Implemente a lógica de exclusão no backend aqui
                // Por enquanto, vamos apenas atualizar a lista de produtos localmente
                excluirProdutoNoBackend(id); // Substitua pela chamada à sua API
    
                // Atualiza a lista de produtos na interface do usuário
                const produtosAtualizados = obterTodos(); // Substitua pela chamada à sua API
                exibirProdutos(produtosAtualizados);
            }
        }
    
        // Evento de envio do formulário
        produtoForm.addEventListener("submit", salvarProduto);
    
        // Inicialmente, exibe a lista de produtos na interface do usuário
        const produtosIniciais = obterTodos(); // Substitua pela chamada à sua API
        exibirProdutos(produtosIniciais);
    });
    
