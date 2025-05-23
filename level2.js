class StrongEnemy extends Enemy {
  constructor(x, y, speed = 3) {
    super(x, y, speed);
    this.lives = 3;
    this.color = color(255, 0, 0); // Rojo para distinguirlo
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.w + 10, this.h + 10); // Un poco más grande
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(this.lives, this.x + this.w / 2 + 5, this.y + this.h / 2 + 5);
  }

  hit() {
    this.lives--;
    if (this.lives <= 0) {
      return true; // Devuelve true si el enemigo debe ser destruido
    }
    return false;
  }
}

class ErraticEnemy extends Enemy { // ¡Nueva clase para enemigos erráticos!
  constructor(x, y, speed = 7) {
    super(x, y, speed); // Llama al constructor de la clase base Enemy
    this.moveTimer = 0;
    this.moveInterval = random(40, 100); // Cambia de dirección cada cierto tiempo (ajustable)
    this.xDirection = random([-1, 1]); // Dirección inicial aleatoria (-1 izquierda, 1 derecha)
    this.yDirection = random([-1, 1]) * random(0.5, 1.5); // Dirección vertical inicial aleatoria y velocidad variable
    this.color = color(0, 0, 255); // Color azul para distinguirlos
  }

  update() {
    // Movimiento aleatorio en X
    this.x += this.xDirection * this.speed;

    // Movimiento aleatorio en Y
    this.y += this.yDirection;

    this.moveTimer++;
    if (this.moveTimer > this.moveInterval) {
      // Cambiar de dirección aleatoriamente
      this.xDirection = random([-1, 1]);
      this.yDirection = random([-1, 1]) * random(0.5, 1.5);
      this.moveTimer = 0;
      this.moveInterval = random(40, 100);
    }

    // Asegurarse de que no se salgan completamente de la pantalla en X
    if (this.x + this.w > width || this.x < 0) {
      this.xDirection *= -1; // Invertir dirección si toca el borde
      this.x = constrain(this.x, 0, width - this.w); // Asegurar que no se pegue al borde
    }

    // Asegurarse de que no se salgan completamente de la pantalla en Y (opcional, para mantenerlos visibles)
    if (this.y + this.h > height / 2 || this.y < 0) { // Limitar su movimiento vertical a la mitad superior
      this.yDirection *= -1;
      this.y = constrain(this.y, 0, height / 2 - this.h);
    }
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
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
    this.y += this.speed; // Se mueve hacia abajo
  }

  desaparece() {
    return this.y > height;
  }

  dibujar() {
    fill(255, 0, 255); // Color magenta para distinguirlas
    ellipse(this.x, this.y, this.r * 2);
  }

  colision(player) {
    // Usamos dist para una colisión circular con un rectángulo, asumiendo un centro
    let d = dist(this.x, this.y, player.x + player.width / 2, player.y + player.height / 2);
    // Una aproximación simple de colisión de círculo con el rectángulo del jugador
    return d < this.r + player.width / 2 && d < this.r + player.height / 2;
  }
}

let enemyShootInterval = 60; // Intervalo de disparo en frames (ajustable)
let enemyShootTimer = 0;

function actualizarNivel2() {
  // Solo los enemigos estándar rebotan en los bordes y bajan en grupo
  let cambiarDireccionGrupo = false;
  for (let enemy of enemies) {
    // Si no es un ErraticEnemy y ha llegado a un borde
    if (!(enemy instanceof ErraticEnemy) && (enemy.x + enemy.w > width || enemy.x < 0)) {
      cambiarDireccionGrupo = true;
      break;
    }
  }

  if (cambiarDireccionGrupo) {
    direccionEnemigo *= -1; // Cambia la dirección global para los enemigos estándar
    for (let enemy of enemies) {
      if (!(enemy instanceof ErraticEnemy)) { // Solo los enemigos estándar bajan
        enemy.bajar();
      }
    }
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    enemies[i].update();
    enemies[i].show();

    // Lógica de disparo enemigo
    // Los ErraticEnemy pueden disparar con una probabilidad diferente o más seguido si quieres
    if (random(1) < (enemies[i] instanceof ErraticEnemy ? 0.015 : 0.008)) { // Ajusta la probabilidad de disparo
      enemyBullets.push(new EnemyBullet(enemies[i].x + enemies[i].w / 2, enemies[i].y + enemies[i].h));
    }

    // Lógica para el enemigo resistente y colisiones
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
    } else { // Colisión para Enemy (verde) y ErraticEnemy (azul)
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
  // Movimiento fondo
  yFondo += 2;
  image(fondo, 0, yFondo % height - height, width, height);
  image(fondo, 0, yFondo % height, width, height);

  actualizarNivel2();

  player.dibujar();
  player.mover();

  // Muestra y mueve balas del jugador
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].mover();
    bullets[i].dibujar();
    if (bullets[i] && bullets[i].desaparece()) {
      bullets.splice(i, 1);
    }
  }

  // Muestra y mueve balas enemigas y verifica colisiones con el jugador
  for (let i = enemyBullets.length - 1; i >= 0; i--) {
    enemyBullets[i].mover();
    enemyBullets[i].dibujar();
    if (enemyBullets[i].colision(player)) {
      console.log("¡Te golpeó una bala enemiga!");
      enemyBullets.splice(i, 1);
      player.lives--; // Restar una vida al jugador
      if (player.lives <= 0) {
        estadoJuego = "gameOver"; // Si no quedan vidas, Game Over
      }
    }
    if (enemyBullets[i].desaparece()) {
      enemyBullets.splice(i, 1);
    }
  }
}

function iniciarNivel2() {
  enemies = []; // Limpiar los enemigos del nivel anterior
  direccionEnemigo = 1; // Resetear la dirección

  // Creamos MENOS enemigos estándar (verdes)
  for (let i = 0; i < 4; i++) { // Por ejemplo, 4 columnas
    enemies.push(new Enemy(80 + i * 80, 60)); // Una sola fila de enemigos verdes
  }

  // Añadimos algunos enemigos ERRÁTICOS (azules)
  enemies.push(new ErraticEnemy(50, 150));
  enemies.push(new ErraticEnemy(width - 100, 100));
  enemies.push(new ErraticEnemy(width / 2 - 50, 200)); // Otro enemigo errático central

  // Añadir el enemigo resistente (rojo)
  enemies.push(new StrongEnemy(width / 2, 30));

  enemyBullets = []; // Limpiar las balas enemigas al iniciar el nivel
}
