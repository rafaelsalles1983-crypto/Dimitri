// scripts/auth.js
const auth = firebase.auth();

// Login
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "admin.html"; // redireciona para o painel
    })
    .catch((error) => {
      loginError.style.display = "block";
      loginError.textContent = error.message;
    });
});

// Cadastro
const registerForm = document.getElementById("registerForm");
const registerError = document.getElementById("registerError");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("regName").value;
  const age = document.getElementById("regAge").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Salva dados adicionais no Realtime Database
      firebase.database().ref("usuarios/" + user.uid).set({
        name,
        age,
        email
      });
      window.location.href = "admin.html"; // redireciona após cadastro
    })
    .catch((error) => {
      registerError.style.display = "block";
      registerError.textContent = error.message;
    });
});

// Se o usuário já estiver logado, redireciona automaticamente
auth.onAuthStateChanged(user => {
  if (user) {
    window.location.href = "admin.html";
  }
});
