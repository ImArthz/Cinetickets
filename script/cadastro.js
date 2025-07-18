// CONFIG FIREBASE
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

const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', async e => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    // cria no Auth
    const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const u = cred.user;
    // cria perfil no Firestore
    await firebase.firestore().collection('usuarios').doc(u.uid).set({
      nome,
      email,
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert("Cadastro realizado com sucesso!");
    window.location.href = "./login.html";
  } catch (err) {
    console.error(err);
    alert("Erro no cadastro: " + err.message);
  }
});
