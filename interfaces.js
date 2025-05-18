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
    textSize(32);
    text("Pausa", width / 2, height / 2);
}

function mostrarVictoria() {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("GANASTEIS!!!", width / 2, height / 2);
}

function mostrarGameOver() {
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Game Over", width / 2, height / 2);
}
