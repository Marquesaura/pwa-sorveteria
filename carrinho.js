let valorTotal = 0;

function atualizarTotal() {
  const mostraValorFinal = document.getElementById("valorTotal");
  mostraValorFinal.textContent = `Total: R$${valorTotal.toFixed(2)}`;
}

function adicionarItemAoCarrinho(nome, precoTexto, saboresSelecionados, tamanho) {
  const corpoTabela = document.getElementById("itens-final");

  const linha = document.createElement("tr");

  const tdNome = document.createElement("td");
  tdNome.textContent = nome;

  const tdPreco = document.createElement("td");
  tdPreco.textContent = precoTexto;

  const tdSabores = document.createElement("td");
  tdSabores.textContent = saboresSelecionados.length > 0
    ? saboresSelecionados.join(", ")
    : "Nenhum";

  const tdTamanho = document.createElement("td");
  tdTamanho.textContent = tamanho || "Não especificado";

  const tdQtd = document.createElement("td");
  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Remover";
  btnRemover.classList.add("remover-do-carrinho");
  tdQtd.appendChild(btnRemover);

  linha.appendChild(tdNome);
  linha.appendChild(tdPreco);
  linha.appendChild(tdSabores);
  linha.appendChild(tdTamanho);
  linha.appendChild(tdQtd);
  corpoTabela.appendChild(linha);

  const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));
  valorTotal += preco;
  atualizarTotal();

  btnRemover.addEventListener("click", () => {
    corpoTabela.removeChild(linha);
    valorTotal -= preco;
    atualizarTotal();
  });

  const carrinho = document.getElementById("carrinho");

  let texto = `${nome} - ${precoTexto}`;
  if (tamanho) texto += ` - Tamanho: ${tamanho}`;
  if (saboresSelecionados.length > 0) texto += ` - Sabores: ${saboresSelecionados.join(", ")}`;

  const itemExistente = Array.from(carrinho.querySelectorAll("p")).some(p => p.textContent === texto);
  if (itemExistente) return;

}

function configurarBotoesAdicionar() {
  const botoesAdicionar = document.querySelectorAll(".adicionar");
  const produtos = document.querySelectorAll(".sec-prod");

  botoesAdicionar.forEach((botao, index) => {
    botao.addEventListener("click", () => {
      const produto = produtos[index];
      const nome = produto.querySelector(".nome").innerText;
      const precoTexto = produto.querySelector(".valor").innerText.replace("Valor: ", "");

      const radios = produto.querySelectorAll('input[type="radio"]');
      const saboresSelecionados = Array.from(radios)
        .filter(radio => radio.checked)
        .map(radio => radio.nextSibling?.textContent?.trim() || radio.parentElement.textContent.trim());

      if (radios.length > 0 && saboresSelecionados.length === 0) {
        alert("Por favor, selecione ao menos um sabor.");
        return;
      }

      const select = produto.querySelector("select");
      const tamanho = select ? select.options[select.selectedIndex].text : "";

      adicionarItemAoCarrinho(nome, precoTexto, saboresSelecionados, tamanho);
    });
  });
}

// Chame essa função quando a página carregar
window.addEventListener("DOMContentLoaded", configurarBotoesAdicionar);