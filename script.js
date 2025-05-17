let player;
let bullets = [];
let fondo;
let yFondo = -20;
let enemies = [];
let direccionEnemigo = 1;

let nivelActual = 1;


function preload() {
  fondo = loadImage('assets/images/bg-game.png');
}


function cargarNivel2() {
  enemiesLevel2 = [];

  // enemigos normales
  for (let i = 0; i < 5; i++) {
    enemiesLevel2.push(new EnemyZigZag(80 + i * 70, 60, 2, false));
  }

  // enemigos que disparan
  for (let i = 0; i < 3; i++) {
    enemiesLevel2.push(new EnemyZigZag(80 + i * 100, 130, 2, true));
  }

  // enemigo resistente
  enemiesLevel2.push(new EnemyZigZag(200, 200, 1.5, false, 3));
}


function setup() {
  createCanvas(500, 600);
  player = new Player(240, 530);

  // Creamos los enemigos del nivel 1
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      enemies.push(new Enemy(80 + i * 70, 60 + j * 60));
    }
  }
}

function draw() {
  background(0);

  //movimiento fondo
  yFondo += 2;

  //que la foto se repita verticalmente
  image(fondo, 0, yFondo % height - height, width, height);
  image(fondo, 0, yFondo % height, width, height);

  actualizarNivel2();
  //juego
  player.dibujar();
  player.mover();

  //muestra balas del array bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].mover();
    bullets[i].dibujar();

    if (nivelActual === 1) {
      for (let j = enemies.length - 1; j >= 0; j--) {
        if (bullets[i].colision(enemies[j])) {
          //borra del arreglo el enemigo y bala
          enemies.splice(j, 1);
          bullets.splice(i, 1);
          console.log(enemies);
          break;
        }
      }
    } else if (nivelActual === 2) {
      for (let j = enemiesLevel2.length - 1; j >= 0; j--) {
        if (bullets[i].colision(enemiesLevel2[j])) {
          if (enemiesLevel2[j].resistencia) {
            enemiesLevel2[j].resistencia--;
            if (enemiesLevel2[j].resistencia <= 0) {
              enemiesLevel2.splice(j, 1);
            }
          } else {
            enemiesLevel2.splice(j, 1);
          }
          bullets.splice(i, 1);
          break;
        }
      }
    }

    //desaparece la bala q se va al espacio
    if (bullets[i] && bullets[i].desaparece()) {
      bullets.splice(i, 1);
    }
  }

  //movimiento global de los enemigos
  if (nivelActual === 1) {
    // Primero dibuja y mueve los enemigos con la dirección global
    for (let enemy of enemies) {
      enemy.x += direccionEnemigo * 2;  // mueve todos horizontalmente
      enemy.show();
    }

    // Verifica si algún enemigo toca los bordes
    let cambiarDireccion = false;
    for (let enemy of enemies) {
      if (enemy.x <= 0 || enemy.x + enemy.w >= width) {
        cambiarDireccion = true;
        break; // con uno basta
      }
    }

    if (cambiarDireccion) {
      direccionEnemigo *= -1; // invierte dirección

      // hace que todos bajen
      for (let enemy of enemies) {
        enemy.bajar();
      }
    }

    // Cambio de nivel si no quedan enemigos
    if (enemies.length === 0) {
      cargarNivel2();
      nivelActual = 2;
    }
  }


}

//espacio para añadir balas al array
function keyPressed() {
  if (key === ' ') {
    bullets.push(new Bullet(player.x + player.width / 2, player.y));
    console.log(bullets);

  }
}
