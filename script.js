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

// carrinho
// document.getElementById('adicionar').addEventListener('click',
//   function () {

//       const itemSelecionado = document.getElementById('item').value;

//       if (itemSelecionado) {
//           const listaCompras = document.getElementById('lista-compras');
//           console.log(listaCompras)
//       }
//   });


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').
    then(() => {
      console.log('Service Worker registrado com sucesso');
    })
    .catch((error) => {
      console.log('Falha ao registrar o Service Worker:', error);
    });
}

//teste


function adicionarAoCarrinho(nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  var nome = document.getElementById("nome")
  const itemExistente = carrinho.find(item => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(`${nome} adicionado ao carrinho!`);
}

document.addEventListener({

})

function leiaMais(){
document.getElementById("mais").addEventListener('click', () => {
  const itens = document.getElementById("itens");
  const btnLeiaMais = document.getElementById("mais");

  if (itens.style.display === "none" || itens.style.display === "") {
    itens.style.display = "inline";
    btnLeiaMais.innerHTML = "Voltar";
  } else {
    itens.style.display = "none";
    btnLeiaMais.innerHTML = "Leia mais";
  }
});
}