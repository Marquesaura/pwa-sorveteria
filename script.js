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
