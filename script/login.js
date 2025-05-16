document.addEventListener('DOMContentLoaded', function() {
  // Verificar se há um "user" no localStorage
  const user = localStorage.getItem('user');
  
  // Se existir um "user", redirecionar para "loja.html"
  if (user) {
    window.location.href = "../loja.html"
  }
});

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAW9jtf-VkWJqTnjrpBY-bJhfqRArPsNko",
  authDomain: "citickets.firebaseapp.com",
  projectId: "citickets",
  storageBucket: "citickets.firebasestorage.app",
  messagingSenderId: "846716527165",
  appId: "1:846716527165:web:fb8e71b663269e7e910054",
  measurementId: "G-1Z8WJL37V7"
};
  
// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao formulário
const loginForm = document.getElementById('login-form');
  
// Manipulador de evento de envio do formulário
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // Obtenção dos valores de email e senha
  const email = loginForm['email'].value;
  const password = loginForm['password'].value;
  var db = firebase.firestore()
  const usuarios = db.collection('usuarios')

  const logado = await usuarios.where("email","==",email).get()
  if(logado.empty){
    alert("Usuário ou Senha incorretos")
    return
  }
  logado.forEach(documento => {
    dados = documento.data()
    dados.id = documento.id
  });
  if (dados.senha == password){
    alert("Logado com sucesso!")
    localStorage.setItem('user', JSON.stringify(dados));
    window.location.href = "../loja.html"
  }
  else{
    alert("Usuário ou Senha incorretos")
  }
})