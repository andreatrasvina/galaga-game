// Enemigos que disparan
class ShootingEnemy extends Enemy {
  constructor(x, y, speed = 5) {
    super(x, y);
  }

  disparar() {
    return new EnemyBullet(this.x + this.w / 2, this.y + this.h);
  }

  show() {
    fill(255, 0, 0); // Color rojo para distinguirlo
    rect(this.x, this.y, this.w, this.h);
  }
}

// Enemigo más resistente
class StrongEnemy extends Enemy {
  constructor(x, y, speed = 5) {
    super(x, y);
    this.vida = 3;
  }

  recibirDisparo() {
    this.vida--;
    return this.vida <= 0;
  }

  show() {
    fill(0, 0, 255); // Azul para distinguirlo
    rect(this.x, this.y, this.w, this.h);
  }
}

// Bala enemiga
class EnemyBullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 4;
    this.speed = 6;
  }

  mover() {
    this.y += this.speed;
  }

  desaparece() {
    return this.y > height;
  }

  dibujar() {
    fill(255, 100, 100);
    ellipse(this.x, this.y, this.r * 2);
  }

  colision(jugador) {
    let closestX = constrain(this.x, jugador.x, jugador.x + jugador.width);
    let closestY = constrain(this.y, jugador.y, jugador.y + jugador.height);
    let distancia = dist(this.x, this.y, closestX, closestY);
    return distancia < this.r;
  }
}

// Actualiza movimiento en zigzag y disparos enemigos
function actualizarNivel2() {
  zigzagTimer++;
  if (zigzagTimer % 60 === 0) {
    direccionEnemigo *= -1;
    for (let enemy of enemies) {
      enemy.bajar();
    }
  }

  for (let enemy of enemies) {
    enemy.update();
    enemy.show();

    if (enemy instanceof ShootingEnemy && frameCount % 120 === 0) {
      enemyBullets.push(enemy.disparar());
    }
  }
}

// Lógica principal del nivel 2
function nivel2() {
  yFondo += 2;
  image(fondo, 0, yFondo % height - height, width, height);
  image(fondo, 0, yFondo % height, width, height);

  actualizarNivel2();

  player.dibujar();
  player.mover();

  // Balas del jugador
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].mover();
    bullets[i].dibujar();

    for (let j = enemies.length - 1; j >= 0; j--) {
      let enemy = enemies[j];
      if (bullets[i].colision(enemy)) {
        if (enemy instanceof StrongEnemy) {
          if (enemy.recibirDisparo()) {
            enemies.splice(j, 1);
          }
        } else {
          enemies.splice(j, 1);
        }
        bullets.splice(i, 1);
        break;
      }
    }

    if (bullets[i] && bullets[i].desaparece()) {
      bullets.splice(i, 1);
    }
  }

  // Balas enemigas
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    enemyBullets[i].mover();
    enemyBullets[i].dibujar();

    if (enemyBullets[i].desaparece()) {
      enemyBullets.splice(i, 1);
    }

    if (enemyBullets[i] && enemyBullets[i].colision(player)) {
      console.log("Jugador herido");
      // Aquí podrías reducir vidas o finalizar juego
      enemyBullets.splice(i, 1);
    }
  }
}

// Función para inicializar nivel 2
function iniciarNivel2() {
  enemies = [];
  bullets = [];
  enemyBullets = [];
  direccionEnemigo = 1;
  zigzagTimer = 0;

  // Enemigos normales
  for (let i = 0; i < 4; i++) {
    enemies.push(new Enemy(60 + i * 80, 60));
  }

  // Enemigos que disparan
  for (let i = 0; i < 3; i++) {
    enemies.push(new ShootingEnemy(70 + i * 100, 140, 20));
  }

  // Enemigo fuerte
  enemies.push(new StrongEnemy(width / 2 - 20, 220, 20));
}
