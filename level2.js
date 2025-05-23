// level2.js
// Asume que la clase Enemy está definida en enemy.js y cargada antes.

class StrongEnemy extends Enemy {
  constructor(x, y, speed = 3) {
    super(x, y, speed);
    this.lives = 3;
    this.color = color(255, 0, 0); // Rojo para distinguirlo
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.w + 10, this.h + 10);
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(this.lives, this.x + this.w / 2 + 5, this.y + this.h / 2 + 5);
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
  constructor(x, y, speed = 9) { // Aumento la velocidad base a 9
    super(x, y, speed);
    this.moveTimer = 0;
    this.moveInterval = random(30, 80);
    this.xDirection = random([-1, 1]);
    this.yDirection = random([-1, 1]) * random(1, 2);
    this.color = color(0, 0, 255);
  }

  update() {
    this.x += this.xDirection * this.speed;
    this.y += this.yDirection;
    this.y += 0.5; // Fuerza constante hacia abajo

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

    if (this.y + this.h > height * 0.7 || this.y < 0) {
      this.yDirection *= -1;
      this.y = constrain(this.y, 0, height * 0.7 - this.h);
    }
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
  }
}

class EnemyBullet { // Esta clase sí es específica de los niveles con enemigos que disparan
  constructor(x, y, speed = 5) {
    this.x = x;
    this.y = y;
    this.r = 3;
    this.speed = speed;
  }

  mover() {
    this.y += this.speed;
  }

  desaparece() {
    return this.y > height;
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
    enemies[i].update();
    enemies[i].show();

    if (random(1) < (enemies[i] instanceof ErraticEnemy ? 0.02 : 0.008)) {
      enemyBullets.push(new EnemyBullet(enemies[i].x + enemies[i].w / 2, enemies[i].y + enemies[i].h));
    }

    if (enemies[i] instanceof StrongEnemy) {
      for (let j = bullets.length - 1; j >= 0; j--) {
        if (bullets[j].colision(enemies[i])) {
          if (enemies[i].hit()) {
            enemies.splice(i, 1);
          }
          bullets.splice(j, 1);
          break;
        }
      }
    } else {
      for (let j = bullets.length - 1; j >= 0; j--) {
        if (bullets[j].colision(enemies[i])) {
          enemies.splice(i, 1);
          bullets.splice(j, 1);
          break;
        }
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
      console.log("¡Te golpeó una bala enemiga!");
      enemyBullets.splice(i, 1);
      player.lives--;
      if (player.lives <= 0) {
        estadoJuego = "gameOver";
      }
    }
    if (enemyBullets[i].desaparece()) {
      enemyBullets.splice(i, 1);
    }
  }
}

function iniciarNivel2() {
  enemies = [];
  direccionEnemigo = 1;

  for (let i = 0; i < 3; i++) {
    enemies.push(new Enemy(100 + i * 100, 60));
  }

  enemies.push(new ErraticEnemy(50, 100));
  enemies.push(new ErraticEnemy(width - 100, 150));
  enemies.push(new ErraticEnemy(width / 2 - 50, 200));
  enemies.push(new ErraticEnemy(150, 250));
  enemies.push(new ErraticEnemy(width - 200, 300));
  enemies.push(new ErraticEnemy(20, 200));
  enemies.push(new ErraticEnemy(width - 70, 220));

  enemies.push(new StrongEnemy(width / 2, 30));

  enemyBullets = [];
}
