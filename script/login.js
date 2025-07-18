// CONFIG FIREBASE (mesma config em todos os scripts)
const firebaseConfig = {
  apiKey: "AIzaSyCE3oyJUy8xtk5yHefTEw7OKIZzmwXy2yc",
  authDomain: "cinetickets-dcd74.firebaseapp.com",
  projectId: "cinetickets-dcd74",
  storageBucket: "cinetickets-dcd74.firebasestorage.app",
  messagingSenderId: "668550086739",
  appId: "1:668550086739:web:19ad60ba88659b0c11c6a6",
  measurementId: "G-WQ8VC7812N"
};

firebase.initializeApp(firebaseConfig);

/* redireciona se já estiver logado
document.addEventListener('DOMContentLoaded', () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) window.location.href = "../pages/loja.html";
  });
});
*/

// LOGIN EMAIL/SENHA
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    const cred = await firebase.auth().signInWithEmailAndPassword(email, password);
    const u = cred.user;
    // opcional: buscar dados adicionais no Firestore
    const snap = await firebase.firestore().collection('usuarios').doc(u.uid).get();
    const data = snap.exists ? snap.data() : { email: u.email };
    localStorage.setItem('user', JSON.stringify({ uid: u.uid, ...data }));
    window.location.href = "../pages/loja.html";
  } catch (err) {
    console.error(err);
    alert("Usuário ou senha incorretos.");
  }
});

// LOGIN COM GOOGLE
document.querySelector(".google a").addEventListener("click", async e => {
  e.preventDefault();
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    // salva ou atualiza no Firestore
    await firebase.firestore().collection('usuarios').doc(user.uid).set({
      nome: user.displayName,
      email: user.email
    }, { merge: true });
    localStorage.setItem('user', JSON.stringify({
      uid: user.uid,
      nome: user.displayName,
      email: user.email
    }));
    window.location.href = "../pages/loja.html";
  } catch (error) {
    console.error(error);
    alert("Erro ao fazer login com Google.");
  }
});
