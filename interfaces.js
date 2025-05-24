function mostrarMenu() {
    background(30);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("GALAGA", width / 2, height / 2 - 40);
    textSize(20);
    text("Presiona ENTER para jugar", width / 2, height / 2 + 20);
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
    textAlign(CENTER, CENTER);
    textSize(32);
    text("GANASTEIS!!!", width / 2, height / 2 - 20);
    textSize(20);
    text("Presiona ENTER para regresar al menu", width / 2, height / 2 + 20);
}

function mostrarGameOver() {
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Game Over", width / 2, height / 2 - 20);
    textSize(20);
    text("Presiona ENTER para regresar al menu", width / 2, height / 2 + 20);
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