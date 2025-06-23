let valorTotal = 0;

function atualizarTotal() {
  const mostraValorFinal = document.getElementById("valorTotal");
  mostraValorFinal.textContent = `Total: R$${valorTotal.toFixed(2)}`;
}

function adicionarItemAoCarrinho(nome, precoTexto) {
  const corpoTabela = document.getElementById("itens-final");

  // Cria elementos da linha
  const linha = document.createElement("tr");

  const tdNome = document.createElement("td");
  tdNome.textContent = nome;

  const tdPreco = document.createElement("td");
  tdPreco.textContent = precoTexto;

  const tdQtd = document.createElement("td");
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.classList.add("remover-do-carrinho");
  tdQtd.appendChild(btnRemover);

  // Adiciona à linha
  linha.appendChild(tdNome);
  linha.appendChild(tdPreco);
  linha.appendChild(tdQtd);

  // Adiciona a linha ao carrinho
  corpoTabela.appendChild(linha);

  // Atualiza total
  const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));
  valorTotal += preco;
  atualizarTotal();

  // Evento de remover
  btnRemover.addEventListener("click", () => {
    corpoTabela.removeChild(linha);
    valorTotal -= preco;
    atualizarTotal();
  });
}

// Função chamada ao clicar no botão "Adicionar ao carrinho"
function carrinho() {
  const nome = document.querySelector(".nome").innerText;
  const precoTexto = document.querySelector(".valor").innerText.replace("Valor: ", "");
  adicionarItemAoCarrinho(nome, precoTexto);
}