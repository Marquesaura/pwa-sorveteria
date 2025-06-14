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
