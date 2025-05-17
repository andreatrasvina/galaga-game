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