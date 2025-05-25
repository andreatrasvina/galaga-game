class StrongEnemy extends Enemy {

  constructor(x, y, speed = 3, img = null) {
    super(x, y, speed, img);
    this.lives = 3;
    this.color = color(255, 0, 0);
  }

  show() {
    if (this.img) {
      image(this.img, this.x, this.y, this.w, this.h);
      fill(255);
      textSize(12);
      textAlign(CENTER);
      text(this.lives, this.x + this.w / 2, this.y + this.h / 2 + 5);
    } else {
      fill(this.color);
      rect(this.x, this.y, this.w + 10, this.h + 10);
      fill(255);
      textSize(12);
      textAlign(CENTER);
      text(this.lives, this.x + this.w / 2 + 5, this.y + this.h / 2 + 5);
    }
  }

  hit() {
    this.lives--;
    if (this.lives <= 0) {
      return true;
    }
    return false;
  }
}

class ErraticEnemy extends Enemy {
  constructor(x, y, speed = 9, img = null) {
    super(x, y, speed, img);
    this.moveTimer = 0;
    this.moveInterval = random(30, 80);
    this.xDirection = random([-1, 1]);
    this.yDirection = random([-1, 1]) * random(1, 2);
    this.color = color(0, 0, 255);
  }

  update() {
    this.x += this.xDirection * this.speed;
    this.y += this.yDirection;
    this.y += 0.5;

    this.moveTimer++;
    if (this.moveTimer > this.moveInterval) {
      this.xDirection = random([-1, 1]);
      this.yDirection = random([-1, 1]) * random(1, 2);
      this.moveTimer = 0;
      this.moveInterval = random(30, 80);
    }

    if (this.x + this.w > width || this.x < 0) {
      this.xDirection *= -1;
      this.x = constrain(this.x, 0, width - this.w);
    }

    if (this.y + this.h > height || this.y < 0) {
      this.yDirection *= -1;
      this.y = constrain(this.y, 0, height - this.h);
    }
  }

  show() {
    if (this.img) {
      image(this.img, this.x, this.y, this.w, this.h);
    } else {
      fill(this.color);
      rect(this.x, this.y, this.w, this.h);
    }
  }
}

class EnemyBullet {
  constructor(x, y, speed = 5) {
    this.x = x;
    this.y = y;
    this.r = 3;
    this.speed = speed;
  }

  mover() {
    this.y += this.speed;
  }


  dibujar() {
    fill(255, 0, 255);
    ellipse(this.x, this.y, this.r * 2);
  }

  colision(player) {
    let d = dist(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2);
    return d < this.r + player.width / 2 && d < this.r + player.height / 2;
  }
}

let enemyShootInterval = 60;
let enemyShootTimer = 0;

function actualizarNivel2() {
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
        enemy.bajar();
      }
    }
  }

  // Iteramos sobre los enemigos de atrás hacia adelante
  for (let i = enemies.length - 1; i >= 0; i--) {
    let currentEnemy = enemies[i];
    currentEnemy.update();
    currentEnemy.show();

    // Colisión con el fondo o con el jugador (Game Over)
    if (currentEnemy.y + currentEnemy.h > height) {
      console.log("¡Un enemigo llegó al fondo! Game Over.");
      estadoJuego = "gameOver";
      return; // Salir de la función inmediatamente si el juego ha terminado
    }
    if (currentEnemy.colisionaConJugador(player)) {
      console.log("¡Un enemigo colisionó con el jugador! Game Over.");
      estadoJuego = "gameOver";
      return; // Salir de la función inmediatamente si el juego ha terminado
    }

    // Lógica de disparo enemigo
    let shootProb = 0.025;
    if (currentEnemy instanceof StrongEnemy) {
      shootProb = 0.04;
    }
    if (random(1) < shootProb) {
      enemyBullets.push(new EnemyBullet(currentEnemy.x + currentEnemy.w / 2, currentEnemy.y + currentEnemy.h));
    }

    // Lógica de colisiones de balas del jugador con enemigos
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (bullets[j].colision(currentEnemy)) {
        player.score += 1;


        if (currentEnemy instanceof StrongEnemy) {
          if (currentEnemy.hit()) {
            player.score += 3;

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
  }
}

function nivel2() {

  actualizarNivel2();

  player.dibujar();
  player.mover();

  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].mover();
    bullets[i].dibujar();
    if (bullets[i] && bullets[i].desaparece()) {
      bullets.splice(i, 1);
    }
  }

  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    enemyBullets[i].mover();
    enemyBullets[i].dibujar();
    if (enemyBullets[i].colision(player)) {
      player.score -= 1;
      console.log("¡Te golpeó una bala enemiga!");
      enemyBullets.splice(i, 1);
      player.lives--;
      if (player.lives <= 0) {
        estadoJuego = "gameOver";
      }
    }
  }
}

function iniciarNivel2() {
  enemies = [];
  direccionEnemigo = 1;

  // Enemigos normales
  for (let i = 0; i < 3; i++) {
    enemies.push(new Enemy(100 + i * 100, 60, 5, enemieImg));
  }

  enemies.push(new ErraticEnemy(50, 100, 9, erraticEnemyImg));
  enemies.push(new ErraticEnemy(width - 100, 150, 9, erraticEnemyImg));
  enemies.push(new ErraticEnemy(width / 2 - 50, 200, 9, erraticEnemyImg));
  enemies.push(new ErraticEnemy(150, 250, 9, erraticEnemyImg));
  enemies.push(new ErraticEnemy(width - 200, 300, 9, erraticEnemyImg));
  enemies.push(new ErraticEnemy(20, 200, 9, erraticEnemyImg));
  enemies.push(new ErraticEnemy(width - 70, 220, 9, erraticEnemyImg));


  enemies.push(new StrongEnemy(width / 2, 30, 3, strongEnemyImg));

  enemyBullets = [];
}
