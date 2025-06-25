document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.carousel-img');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle('active', i === index);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    prevBtn.style.backgroundColor = 'purple';
    setTimeout(() => {
      prevBtn.style.backgroundColor = '#ffb1a5';
    }, 400);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    nextBtn.style.backgroundColor = 'purple';
    setTimeout(() => {
      nextBtn.style.backgroundColor = '#ffb1a5';
    }, 400);
  });

  showImage(currentIndex);

  document.querySelectorAll(".mais").forEach(botao => {
    let aberto = false;
    const secaoProduto = botao.closest(".sec-prod");
    const opcoes = secaoProduto.querySelector(".opcoes");

    botao.addEventListener("click", () => {
      if (!aberto) {
        document.querySelectorAll(".sec-prod").forEach(sec => {
          const outrasOpcoes = sec.querySelector(".opcoes");
          const outroBotao = sec.querySelector(".mais");
          outrasOpcoes.style.display = "none";
          outroBotao.textContent = "Mais opções";
        });
        opcoes.style.display = "block";
        botao.textContent = "Voltar";
        aberto = true;
      } else {
        opcoes.style.display = "none";
        botao.textContent = "Mais opções";
        aberto = false;
      }
    });
  });
});

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1000);
  }
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => {
      console.log('Service Worker registrado com sucesso');
    })
    .catch((error) => {
      console.log('Falha ao registrar o Service Worker:', error);
    });
}
function popUpPag() {
  const largura = 800;
  const altura = 700;
  const esquerda = (screen.width - largura) / 2;
  const topo = (screen.height - altura) / 2;

  window.open(
    "final.html",
    "telaPagamento",
    `width=${largura},height=${altura},left=${esquerda},top=${topo},resizable=no`
  );
  const produtosSelecionados = [];

  document.querySelectorAll("#itens-final tr").forEach(linha => {
    const colunas = linha.querySelectorAll("td");
    produtosSelecionados.push({
      nome: colunas[0]?.textContent,
      preco: colunas[1]?.textContent,
      sabores: colunas[2]?.textContent,
      tamanho: colunas[3]?.textContent
    });
  });

  localStorage.setItem("carrinho", JSON.stringify(produtosSelecionados));
  // window.location.href = "final.html";
}

window.addEventListener("DOMContentLoaded", () => {
  const carrinhoSalvo = localStorage.getItem("carrinho");
  let valorTotal = 0;
  if (carrinhoSalvo) {
    const produtos = JSON.parse(carrinhoSalvo);
    const tabela = document.getElementById("itens-final");
    produtos.forEach(produto => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${produto.nome}</td>
        <td>${produto.preco}</td>
        <td>${produto.sabores}</td>
        <td>${produto.tamanho}</td>
      `;
      tabela.appendChild(linha);
      
      const precoNum = parseFloat(produto.preco.replace("R$", "").replace(",", "."));
      if (!isNaN(precoNum)) valorTotal += precoNum;
    });
    
    const mostraValorFinal = document.getElementById("valorTotal");
    mostraValorFinal.textContent = `Total: R$${valorTotal.toFixed(2)}`;
  }

  const btnFinalizar = document.getElementById("finalizarCompra");
  const pagamentos = document.getElementById("pagamentos-final");
  if (btnFinalizar && pagamentos) {
    btnFinalizar.addEventListener("click", () => {
      if (pagamentos.style.display === "block") {
        pagamentos.style.display = "none";
        btnFinalizar.textContent = "Finalizar compra";
      } else {
        pagamentos.style.display = "block";
        btnFinalizar.textContent = "Voltar";
      }
    });
  }
});
window.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
});