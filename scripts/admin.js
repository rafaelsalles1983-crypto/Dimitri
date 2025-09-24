const auth = firebase.auth();
const db = firebase.database();

// Proteção da página
auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
});

// Cadastro de conteúdo
const form = document.getElementById("contentForm");
const list = document.getElementById("contentList");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const text = document.getElementById("text").value;

  const newRef = db.ref("conteudos").push();
  newRef.set({ title, text });

  form.reset();
});

// Exibir conteúdos cadastrados
db.ref("conteudos").on("value", (snapshot) => {
  list.innerHTML = "";
  snapshot.forEach((child) => {
    const data = child.val();
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${data.title}</strong><br>${data.text}
      <button onclick="deleteContent('${child.key}')">Excluir</button>
    `;
    list.appendChild(li);
  });
});

function deleteContent(key) {
  db.ref("conteudos/" + key).remove();
}
