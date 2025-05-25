function guardarPuntaje(nombre, score) {
  let topScores = JSON.parse(localStorage.getItem("topScores")) || [];

  if (typeof score !== "number" || isNaN(score)) {
    score = 0;
  }

  topScores.push({ nombre, score });
  topScores.sort((a, b) => b.score - a.score);
  topScores = topScores.slice(0, 5);

  localStorage.setItem("topScores", JSON.stringify(topScores));
}


function mostrarTopScores() {
  const scores = JSON.parse(localStorage.getItem("topScores")) || [];
  const contenedor = document.getElementById("topScores");
  contenedor.innerHTML = "<h3>Mejores Puntajes:</h3>";

  scores.forEach((entry, index) => {
    const div = document.createElement("div");
    div.textContent = `${index + 1}. ${entry.nombre} - ${entry.score}`;
    contenedor.appendChild(div);
  });
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