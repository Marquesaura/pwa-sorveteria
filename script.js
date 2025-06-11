document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const container = document.getElementById('carousel-container');

  let scrollAmount = 0;
  const scrollPerClick = 220;

  prevBtn.addEventListener('click', () => {
    scrollAmount -= scrollPerClick;
    if (scrollAmount < 0) scrollAmount = 0;
    container.scrollTo({
      top: 0,
      left: scrollAmount,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    scrollAmount += scrollPerClick;
    if (scrollAmount > container.scrollWidth) {
      scrollAmount = container.scrollWidth;
    }
    container.scrollTo({
      top: 0,
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
});
