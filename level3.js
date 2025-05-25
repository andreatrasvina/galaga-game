function actualizarNivel3() {
  let cambiarDireccionGrupo = false;
  for (let enemy of enemies) {
    if (!(enemy instanceof ErraticEnemy) && (enemy.x + enemy.w > width || enemy.x < 0)) {
      cambiarDireccionGrupo = true;
      break;
    }
  }

  if (cambiarDireccionGrupo) {
    direccionEnemigo *= -1;
    for (let enemy of enemies) {
      if (!(enemy instanceof ErraticEnemy)) {
        enemy.bajar();
      }
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    let currentEnemy = enemies[i];
    currentEnemy.update();
    currentEnemy.show();

    // Colisión con el fondo o con el jugador 
    if (currentEnemy.y + currentEnemy.h > height) {
      console.log("¡Un enemigo llegó al fondo! Game Over.");
      estadoJuego = "gameOver";
      return; 
    }
    if (currentEnemy.colisionaConJugador(player)) {
       shootEnemy.play();
      console.log("¡Un enemigo colisionó con el jugador! Game Over.");
      estadoJuego = "gameOver";
      return; 
    }

    // Lógica de disparo enemigo
    let shootProb = 0.025;
    if (currentEnemy instanceof StrongEnemy) {
      shootProb = 0.04;
    }
    if (random(1) < shootProb) {
      enemyBullets.push(new EnemyBullet(currentEnemy.x + currentEnemy.w / 2, currentEnemy.y + currentEnemy.h));
      shootEnemy2.play()
      shootEnemy2.setLoop(false);
    }

    // Lógica de colisiones de balas del jugador con enemigos
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (bullets[j].colision(currentEnemy)) {
        let enemyDestroyed = false;

        if (currentEnemy instanceof StrongEnemy) {
          player.score += 1;
          shootEnemy.play();
          if (currentEnemy.hit()) {
            enemies.splice(i, 1);
            enemyDestroyed = true;
          }
        } else {
          enemies.splice(i, 1);
          enemyDestroyed = true;
        }

        bullets.splice(j, 1);
        break;
      }
    }
    console.log("Enemigos restantes en Nivel 3: " + enemies.length);

    if (enemies.length === 0) {
      console.log("elpepeyeletesech")
      estadoJuego = "mostrarVictoria";
    }
  }
}

// Función que dibuja los elementos del Nivel 3 en cada frame
function nivel3() {

  actualizarNivel3(); 

  player.dibujar(); 
  player.mover(); 

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
      player.score -= 1;
      shootEnemy.play();
      console.log("¡Te golpeó una bala enemiga!");
      enemyBullets.splice(i, 1); 
      player.lives--; 
      if (player.lives <= 0) {
        estadoJuego = "gameOver"; 
      }
    }
  }
}

// Función que inicializa el Nivel 3
function iniciarNivel3() {
  enemies = []; direccionEnemigo = 1; enemyBullets = [];
  enemies.push(new StrongEnemy(width / 4 - 20, 50, 4, strongEnemyImg));

  let orangeStrongEnemy = new StrongEnemy(width / 2 - 20, 50, 4, bossEnemyImg);
  orangeStrongEnemy.color = color(255, 100, 0); 
  orangeStrongEnemy.lives = 7; 
  enemies.push(orangeStrongEnemy);

  enemies.push(new StrongEnemy(width * 3 / 4 - 20, 50, 4, strongEnemyImg));

  enemies.push(new ErraticEnemy(50, 150, 9, erraticEnemyImg));
  enemies.push(new ErraticEnemy(width - 100, 180, 9, erraticEnemyImg));
  enemies.push(new ErraticEnemy(width / 2 - 50, 210, 9, erraticEnemyImg));

  // Añadimos más enemigos estándar 
  for (let j = 0; j < 1; j++) {
    for (let i = 0; i < 3; i++) {
      enemies.push(new Enemy(30 + i * 70, 250 + j * 40, 5, enemieImg));
    }
  }
}
