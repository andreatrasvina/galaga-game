function actualizarNivel1() {
  // Detecta si hay que cambiar dirección
  let cambiarDireccion = false;
  for (let enemy of enemies) {
    if (enemy.x + enemy.w > width || enemy.x < 0) {
      cambiarDireccion = true;
      break;
    }
  }

  // Si hay que cambiar dirección, invierte y baja enemigos
  if (cambiarDireccion) {
    direccionEnemigo *= -1;
    for (let enemy of enemies) {
      enemy.bajar();
    }
  }


  for (let i = enemies.length - 1; i >= 0; i--) {
    let currentEnemy = enemies[i];

    // colision con el player 
    if (currentEnemy.y + currentEnemy.h > height) {
      console.log("¡Un enemigo llegó al fondo! Game Over.");
      estadoJuego = "gameOver";
      return;

    }
    if (currentEnemy.colisionaConJugador(player)) {
      console.log("¡Un enemigo colisionó con el jugador! Game Over.");
      estadoJuego = "gameOver";
      return;
    }
    // *******************************************************************

    for (let j = bullets.length - 1; j >= 0; j--) {
      if (bullets[j].colision(currentEnemy)) {
        score += 10;
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        break;
      }
    }
  }

  // Actualiza y dibuja enemigos
  for (let enemy of enemies) {
    enemy.update();
    enemy.show();
  }
}

function nivel1() {

  actualizarNivel1();

  player.dibujar();
  player.mover();

  // Muestra y mueve balas
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].mover();
    bullets[i].dibujar();

    for (let j = enemies.length - 1; j >= 0; j--) {
      if (bullets[i].colision(enemies[j])) {
        enemies.splice(j, 1);
        bullets.splice(i, 1);
        break;
      }
    }

    if (bullets[i] && bullets[i].desaparece()) {
      bullets.splice(i, 1);
    }
  }
}
