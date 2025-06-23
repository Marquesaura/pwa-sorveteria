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

function carrinho() {
  const botoesAdicionar = document.querySelectorAll(".adicionar");
  const produtos = document.querySelectorAll(".sec-prod");

  botoesAdicionar.forEach((botao, index) => {
    botao.addEventListener("click", () => {
      const produto = produtos[index];
      const nome = produto.querySelector(".nome").innerText;
      const preco = produto.querySelector(".valor").innerText;

      const radios = produto.querySelectorAll('input[type="radio"]');
      const saboresSelecionados = Array.from(radios)
        .filter(radio => radio.checked)
        .map(radio => {
          return radio.nextSibling && radio.nextSibling.textContent
            ? radio.nextSibling.textContent.trim()
            : radio.parentElement.textContent.trim();
        });

      if (radios.length > 0 && saboresSelecionados.length === 0) {
        alert("Por favor, selecione ao menos um sabor.");
        return;
      }

      const select = produto.querySelector("select");
      const tamanho = select ? select.options[select.selectedIndex].text : "";


      let texto = `${nome} - ${preco}`;
      if (tamanho) texto += ` - Tamanho: ${tamanho}`;
      if (saboresSelecionados.length > 0)
        texto += ` - Sabores: ${saboresSelecionados.join(", ")}`;

      const carrinho = document.getElementById("carrinho");

      const itensExistentes = carrinho.querySelectorAll("p");
      const itemDuplicado = Array.from(itensExistentes).some(p => p.textContent === texto);
      if (itemDuplicado) return;


      const itemCarrinho = document.createElement("td");
      itemCarrinho.textContent = texto;
      itemCarrinho.style.backgroundColor = "#f0dfc8";
      itemCarrinho.style.color = "#795833";
      itemCarrinho.style.borderRadius = "10px";
      itemCarrinho.style.padding = "5px";
      itemCarrinho.style.margin = "5px 0";
      itemCarrinho.style.width = "300px";

      carrinho.appendChild(itemCarrinho);


    });
  });
}

document.addEventListener('DOMContentLoaded', carrinho, removerCarrinho);