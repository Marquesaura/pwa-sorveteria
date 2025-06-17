document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.carousel-img');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.remove('active');
      if (i === index) {
        img.classList.add('active');
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
    prevBtn.style.backgroundColor = 'pink';
    setTimeout(() => {
      prevBtn.style.backgroundColor = '#ffb1a5';
    }, 600);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
    nextBtn.style.backgroundColor = 'purple';
    setTimeout(() => {
      nextBtn.style.backgroundColor = '#ffb1a5';
    }, 600);
  });

  showImage(currentIndex);

});

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  preloader.style.transition = 'opacity 5s ease';
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 1100);
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').
    then(() => {
      console.log('Service Worker registrado com sucesso');
    })
    .catch((error) => {
      console.log('Falha ao registrar o Service Worker:', error);
    });
}


document.querySelectorAll(".mais").forEach(botao => {
  let aberto = false;
  const secaoProduto = botao.closest(".sec-prod");
  const opcoes = secaoProduto.querySelector("#opcoes");

  botao.addEventListener("click", () => {
    if (!aberto) {

      document.querySelectorAll(".sec-prod").forEach(sec => {
        const outrasOpcoes = sec.querySelector("#opcoes");
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


function carrinho() {
  const botoesAdicionar = document.querySelectorAll(".adicionar");
  const produtos = document.querySelectorAll(".sec-prod");

  botoesAdicionar.forEach((botao, index) => {
    botao.addEventListener("click", () => {
      const produto = produtos[index];
      const nome = produto.querySelector(".nome").innerText;
      const preco = produto.querySelector(".valor").innerText;

      // Apenas checkboxes DENTRO deste produto
      const checkboxes = produto.querySelectorAll('input[type="checkbox"]');
      const saboresSelecionados = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.nextSibling.textContent?.trim() || cb.parentElement.textContent.trim());

      // Se houver checkboxes e nenhum estiver marcado, bloquear
      if (checkboxes.length > 0 && saboresSelecionados.length === 0) {
        alert("Por favor, selecione ao menos um sabor.");
        return;
      }

      // Select de tamanho (se existir)
      const select = produto.querySelector("select");
      const tamanho = select ? select.options[select.selectedIndex].text : "";

      // Montar texto do carrinho
      let texto = `${nome} - ${preco}`;
      if (tamanho) texto += ` - Tamanho: ${tamanho}`;
      if (saboresSelecionados.length > 0) texto += ` - Sabores: ${saboresSelecionados.join(", ")}`;

      // Criar item no carrinho
      const itemCarrinho = document.createElement("p");
      itemCarrinho.textContent = texto;
      itemCarrinho.style.backgroundColor = "#f0dfc8";
      itemCarrinho.style.color = "#795833";
      itemCarrinho.style.borderRadius = "10px";
      itemCarrinho.style.padding = "5px";
      itemCarrinho.style.margin = "5px 0";

      // Adicionar ao carrinho
      document.getElementById("carrinho").appendChild(itemCarrinho);
    });
  });
}





// function excluirItem(){

// }