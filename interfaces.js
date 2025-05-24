function mostrarMenu() {
  background(30);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("GALAGA", width / 2, height / 2 - 100);
  textSize(20);
  text("Presiona ENTER para jugar", width / 2, height / 2 - 50);

  let topScores = JSON.parse(localStorage.getItem("topScores")) || [];
  text("Top 5 Puntajes:", width / 2, height / 2);
  for (let i = 0; i < topScores.length; i++) {
    let entry = topScores[i];
    text(`${i + 1}. ${entry.nombre}: ${entry.score}`, width / 2, height / 2 + 30 + i * 25);
  }
}

function mostrarPausa() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("Juego en pausa", width / 2, height / 2 - 20);
  textSize(18);
  text("Presiona 'P' para continuar", width / 2, height / 2 + 20);
}

function mostrarVictoria() {
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 50);
  textSize(20);
  text("Ingresa tu nombre y presiona ENTER", width / 2, height / 2 + 50);
  mostrarInputNombre();
}

function mostrarGameOver() {
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 50);
  textSize(20);
  text("Ingresa tu nombre y presiona ENTER", width / 2, height / 2 + 50);
  mostrarInputNombre();
}

function mostrarTransicionNivel() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  text(`¡Pasaste al siguiente nivel!`, width / 2, height / 2 - 20);
  text(`Te quedan ${player.lives} vidas`, width / 2, height / 2 + 20);

  tiempoTransicion--;

  if (tiempoTransicion <= 0) {
    estadoJuego = siguienteNivel;
  }
}