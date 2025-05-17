let enemiesLevel2 = [];
let enemyBullets = [];
let direccionZigzag = 1;

function actualizarNivel2() {
  //zig zag beibe
  for (let enemy of enemiesLevel2) {
    enemy.x += direccionZigzag * enemy.speed;

    //zig direccionZigzag
    if (enemy.x < 0 || enemy.x + enemy.w > width) {
      direccionZigzag *= -1;
      for (let e of enemiesLevel2) {
        e.y += 20;
      }
      break;
    }

    enemy.update && enemy.update(); // por si quieres override
    enemy.show();
  }

  // Disparos enemigos
  for (let bullet of enemyBullets) {
    bullet.y += 5;
    fill(255, 0, 0);
    ellipse(bullet.x, bullet.y, 5, 10);

    //verifica si le pegan al player
    if (
      bullet.x > player.x &&
      bullet.x < player.x + player.width &&
      bullet.y > player.y &&
      bullet.y < player.y + player.height
    ) {
      console.log("ay mi pichula");
      // aquí podas  restar vida, acabar el juego, etc.
    }
  }

  // diparo random de los enemigos
  for (let enemy of enemiesLevel2) {
    if (enemy.canShoot && random() < 0.01) {
      enemyBullets.push({ x: enemy.x + enemy.w / 2, y: enemy.y + enemy.h });
    }
  }
}

