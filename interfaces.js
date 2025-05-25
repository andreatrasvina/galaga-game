let estrellas = [];

function mostrarMenu() {
  textFont('Courier New', 10);
  background(10);
  dibujarEstrellas();

  textAlign(CENTER, CENTER);
  textSize(60);
  fill(255, 255, 0);
  stroke(255, 0, 0);
  strokeWeight(1);
  text("GALAGA", width / 2, 100);
  noStroke();

  fill(255);
  textSize(20);
  text("Presiona ENTER para jugar", width / 2, 160);
  text("Presiona P para pausar", width / 2, 190);

  textSize(20);
  fill('palegreen');
  text("TOP SCORES", width / 2, 230);

  let topScores = JSON.parse(localStorage.getItem("topScores")) || [];

  //tabla
  const tablaX = width / 2 - 150;
  const tablaY = 260;
  const filaAlto = 30;

  fill(255, 255, 255, 50);
  rect(tablaX, tablaY, 300, filaAlto * (topScores.length + 1), 10);

  fill(255);
  textSize(18);
  textAlign(LEFT, CENTER);
  text("Pos", tablaX + 10, tablaY + 15);
  text("Nombre", tablaX + 60, tablaY + 15);
  text("Puntaje", tablaX + 220, tablaY + 15);

  for (let i = 0; i < topScores.length; i++) {
    const y = tablaY + filaAlto * (i + 1);
    fill(255, 255, 255, 30 + i * 30);
    rect(tablaX, y, 300, filaAlto);
    fill(255);
    text(`${i + 1}`, tablaX + 10, y + filaAlto / 2);
    text(`${topScores[i].nombre}`, tablaX + 60, y + filaAlto / 2);
    text(`${topScores[i].score}`, tablaX + 220, y + filaAlto / 2);
  }

  textSize(13);
  fill('palegreen');
  text("POR ANDREA Y HAZAEL", width / 2 - 70, 570);
}

function mostrarPausa() {
  textFont('Courier New', 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(30);
  text("Juego en pausa", width / 2, height / 2 - 20);
  textSize(18);
  text("Presiona 'P' para continuar", width / 2, height / 2 + 20);
}

function mostrarVictoria() {
  textFont('Courier New', 10);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("HABEIS GANADO OSTIA CHAVAL", width / 2, height / 2 - 50);
  textSize(20);
  text("Ingresa tu nombre y presiona ENTER", width / 2, height / 2 + 50);
  mostrarInputNombre();
}

function mostrarGameOver() {
  textFont('Courier New', 10);
  fill(255, 0, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 50);
  textSize(20);
  text("Ingresa tu nombre y presiona ENTER", width / 2, height / 2 + 50);
  mostrarInputNombre();
}

function mostrarTransicionNivel() {
  textFont('Courier New', 10);
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

function dibujarHUD() {
  textFont('Courier New', 10);
  textSize(14);
  fill(0, 255, 255);
  noStroke();

  textAlign(LEFT, TOP);
  text(`Nivel: ${obtenerNumeroNivel()}`, 10, 10);
  text(`Score: ${player.score}`, 10, 30);

  for (let i = 0; i < player.lives; i++) {
    image(imgVida, width - (i + 1) * 30 - 10, 10, 24, 24);
  }
}
