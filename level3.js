// level3.js
// Este archivo contiene la lógica del Nivel 3.
// Asume que las clases base (Enemy, Player, Bullet) están definidas en sus respectivos archivos
// (enemy.js, player.js, bullet.js) y que las clases StrongEnemy, ErraticEnemy y EnemyBullet
// también están definidas en otros archivos (como level2.js) y se cargan ANTES en index.html.

// NO necesitamos variables globales específicas para un "finalBoss" ni contadores de enemigos destruidos.

// Función principal de actualización de la lógica del Nivel 3
function actualizarNivel3() {
  // Lógica de movimiento de grupo para enemigos estándar (verdes)
  let cambiarDireccionGrupo = false;
  for (let enemy of enemies) {
    // Los ErraticEnemy no siguen el movimiento de grupo
    if (!(enemy instanceof ErraticEnemy) && (enemy.x + enemy.w > width || enemy.x < 0)) {
      cambiarDireccionGrupo = true;
      break;
    }
  }

  if (cambiarDireccionGrupo) {
    direccionEnemigo *= -1;
    for (let enemy of enemies) {
      if (!(enemy instanceof ErraticEnemy)) {
        enemy.bajar(); // Los enemigos normales y StrongEnemy bajan
      }
    }
  }

  // Iterar sobre todos los enemigos (de atrás hacia adelante para splicear sin problemas)
  for (let i = enemies.length - 1; i >= 0; i--) {
    let currentEnemy = enemies[i];

    currentEnemy.update(); // Todos los enemigos usan su propio método update()
    currentEnemy.show(); // Dibuja el enemigo

    // Lógica de disparo enemigo
    let shootProb = 0.025; // Probabilidad general de disparo
    if (currentEnemy instanceof StrongEnemy) {
      shootProb = 0.04;
    }
    if (random(1) < shootProb) {
      enemyBullets.push(new EnemyBullet(currentEnemy.x + currentEnemy.w / 2, currentEnemy.y + currentEnemy.h));
    }

    // Lógica de colisiones de balas del jugador con enemigos
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (bullets[j].colision(currentEnemy)) {
        let enemyDestroyed = false;

        if (currentEnemy instanceof StrongEnemy) {
          if (currentEnemy.hit()) { // StrongEnemy tiene vidas
            enemies.splice(i, 1);
            enemyDestroyed = true;
          }
        } else { // Enemy normal o ErraticEnemy se destruyen al primer golpe
          enemies.splice(i, 1);
          enemyDestroyed = true;
        }

        bullets.splice(j, 1); // Quitar la bala del jugador
        break; // Una bala solo golpea un enemigo
      }
    }
  }

  // Condición de victoria: todos los enemigos destruidos
  if (enemies.length === 0) {
    estadoJuego = "mostrarVictoria";
  }
}

// Función que dibuja los elementos del Nivel 3 en cada frame
function nivel3() {

  actualizarNivel3(); // Llama a la lógica de actualización del nivel

  player.dibujar(); // Dibuja al jugador
  player.mover(); // Mueve al jugador

  // Dibuja y mueve las balas del jugador
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].mover();
    bullets[i].dibujar();
    if (bullets[i] && bullets[i].desaparece()) {
      bullets.splice(i, 1);
    }
  }

  // Dibuja y mueve las balas enemigas y verifica colisiones con el jugador
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    enemyBullets[i].mover();
    enemyBullets[i].dibujar();
    if (enemyBullets[i].colision(player)) {
      console.log("¡Te golpeó una bala enemiga!");
      enemyBullets.splice(i, 1); // Elimina la bala enemiga al colisionar
      player.lives--; // Resta una vida al jugador
      if (player.lives <= 0) {
        estadoJuego = "gameOver"; // Si no quedan vidas, Game Over
      }
    }
  }
}

// Función que inicializa el Nivel 3
function iniciarNivel3() {
  enemies = []; direccionEnemigo = 1; enemyBullets = [];
  enemies.push(new StrongEnemy(width / 4 - 20, 50, 4, strongEnemyImg));

  let orangeStrongEnemy = new StrongEnemy(width / 2 - 20, 50, 4, bossEnemyImg);
  orangeStrongEnemy.color = color(255, 100, 0); // Establece el color naranja
  orangeStrongEnemy.lives = 7; // Establece 7 vidas
  enemies.push(orangeStrongEnemy);

  enemies.push(new StrongEnemy(width * 3 / 4 - 20, 50, 4, strongEnemyImg));

  enemies.push(new ErraticEnemy(50, 150, 9, erraticEnemyImg));
  enemies.push(new ErraticEnemy(width - 100, 180, 9, erraticEnemyImg));
  enemies.push(new ErraticEnemy(width / 2 - 50, 210, 9, erraticEnemyImg));

  // Añadimos más enemigos estándar (verdes)
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < 5; i++) {
      enemies.push(new Enemy(30 + i * 70, 250 + j * 40, 5, enemieImg));
    }
  }
}
