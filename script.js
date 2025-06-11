document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const container = document.getElementById('carousel-container');

  const scrollPerClick = 400; // ajuste conforme o tamanho da imagem

  prevBtn.addEventListener('click', () => {
    container.scrollBy({
      top: 0,
      left: -scrollPerClick,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({
      top: 0,
      left: scrollPerClick,
      behavior: 'smooth'
    });
  });
});
