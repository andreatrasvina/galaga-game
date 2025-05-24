function guardarPuntaje(nombre, score) {
  let topScores = JSON.parse(localStorage.getItem("topScores")) || [];
  topScores.push({ nombre, score });
  topScores.sort((a, b) => b.score - a.score);
  topScores = topScores.slice(0, 5);
  localStorage.setItem("topScores", JSON.stringify(topScores));
}

function mostrarInputNombre() {
  let input = document.getElementById("nombreInput");
  input.style.display = "block";
  input.focus();
}

function ocultarInputNombre() {
  let input = document.getElementById("nombreInput");
  input.style.display = "none";
  input.value = "";
}