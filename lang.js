// lang.js
const translations = {
  pt: {
    header: "Clube Eslavo",
    nav: {
      drag: "Arrastar",
      progress: "Progresso",
      whoare: "Quem somos",
      contact: "Contato",
      dictionary: "Dicionário"
    }
  },
  ru: {
    header: "Славянский клуб",
    nav: {
      drag: "Перетаскивание",
      progress: "Прогресс",
      whoare: "Кто мы",
      contact: "Контакт",
      dictionary: "Словарь"
    }
  }
};

// Função para aplicar tradução
function applyTranslations(lang) {
  localStorage.setItem("lang", lang); // salva a escolha
  const t = translations[lang];

  // header
  document.querySelector("header").innerText = t.header;

  // nav
  document.querySelectorAll("nav a")[0].innerText = t.nav.drag;
  document.querySelectorAll("nav a")[1].innerText = t.nav.crossword;
  document.querySelectorAll("nav a")[2].innerText = t.nav.whoare;
  document.querySelectorAll("nav a")[3].innerText = t.nav.contact;
  document.querySelectorAll("nav a")[4].innerText = t.nav.dictionary;
}

// Ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "ru";
  applyTranslations(savedLang);
});
