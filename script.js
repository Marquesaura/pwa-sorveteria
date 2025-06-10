let currentIndex = 0;
const sections = document.querySelectorAll('#barra-sorvetes-conteudo');

function showSection(index) {
    sections.forEach((sec, i) => {
        sec.classList.toggle('active', i === index);
    });
}

function nextSection() {
    if (currentIndex < sections.length - 1) {
        currentIndex++;
        showSection(currentIndex);
    }
}

function prevSection() {
    if (currentIndex > 0) {
        currentIndex--;
        showSection(currentIndex);
    }
}

showSection(currentIndex);