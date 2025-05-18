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
  
  // Actualiza y dibuja enemigos
  for (let enemy of enemies) {
    enemy.update();
    enemy.show();
  }
}

function nivel1() {
    // Movimiento fondo
    yFondo += 2;
    image(fondo, 0, yFondo % height - height, width, height);
    image(fondo, 0, yFondo % height, width, height);

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