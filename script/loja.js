// CONFIGURAÇÃO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCE3oyJUy8xtk5yHefTEw7OKIZzmwXy2yc",
  authDomain: "cinetickets-dcd74.firebaseapp.com",
  projectId: "cinetickets-dcd74"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Referência ao container onde os cards de cinema serão injetados
const cinemaGrid = document.getElementById("cinema-grid");

// Função que carrega todos os cinemas do Firestore
function carregarCinemas() {
  db.collection("cinemas")
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        const cinema = doc.data();
        const card = document.createElement("div");
        card.className = "cinema";
        card.textContent = cinema.nome;

        // Ao clicar no card, abre o site oficial do cinema em nova aba
        card.onclick = () => {
          if (cinema.site) {
            window.open(cinema.site, "_blank");
          } else {
            alert("Site do cinema não cadastrado.");
          }
        };

        cinemaGrid.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Erro ao buscar cinemas:", err);
    });
}

// Dispara o carregamento assim que a página carrega
window.addEventListener("DOMContentLoaded", carregarCinemas);
