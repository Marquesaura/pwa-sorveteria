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
    prevBtn.style.backgroundColor = 'purple';
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

function carrinho(produto, tamanho, valor, sabor) {

  const botoesAdicionar = document.querySelectorAll(".adicionar");
  const produtos = document.querySelectorAll(".sec-prod");

  botoesAdicionar.forEach((botao, index) => {
    botao.addEventListener("click", () => {
      const produto = produtos[index];
      const nome = produto.querySelector(".nome").innerText;
      const preco = produto.querySelector(".valor").innerText;

      
      const radios = produto.querySelectorAll('input[type="radio"]');
      const saboresSelecionados = Array.from(radios)
        .filter(cb => cb.checked)
        .map(cb => cb.nextSibling.textContent?.trim() || cb.parentElement.textContent.trim());

      
      if (radios.length > 0 && saboresSelecionados.length === 0) {
        alert("Por favor, selecione ao menos um sabor.");
        return;
      }

      
      const select = produto.querySelector("select");
      const tamanho = select ? select.options[select.selectedIndex].text : "";

      
      let texto = `${nome} - ${preco}`;
      if (tamanho) texto += ` - Tamanho: ${tamanho}`;
      if (saboresSelecionados.length > 0) texto += ` - Sabores: ${saboresSelecionados.join(", ")}`;

      
      const carrinho = document.getElementById("carrinho");
      const itensExistentes = carrinho.querySelectorAll("p");
      const itemDuplicado = Array.from(itensExistentes).some(p => p.textContent === texto);
      if (itemDuplicado) {
        
      }

      
      const itemCarrinho = document.createElement("p");
      itemCarrinho.textContent = texto;
      itemCarrinho.style.backgroundColor = "#f0dfc8";
      itemCarrinho.style.color = "#795833";
      itemCarrinho.style.borderRadius = "10px";
      itemCarrinho.style.padding = "5px";
      itemCarrinho.style.margin = "5px 0";
      itemCarrinho.style.width = "300px"

    
    
      
      carrinho.appendChild(itemCarrinho);
    });
  });
}

// function excluirItem(){

// }