let player;
let bullets = [];
let fondo;
let yFondo = -20;
let enemies = [];
let direccionEnemigo = 1;

function preload() {
    fondo = loadImage('assets/images/bg-game.png'); 
}


function setup() {
    createCanvas(500, 600);
    player = new Player(240, 530);

    // Creamos los enemigos
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

    actualizarNivel1();
    
    //juego
    player.dibujar();
    player.mover();

    //muestra balas del array bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].mover();
        bullets[i].dibujar();
      
        for (let j = enemies.length - 1; j >= 0; j--) {
          if (bullets[i].colision(enemies[j])) {
            //borra del arreglo el enemigo y bala
            enemies.splice(j, 1);
            bullets.splice(i, 1);
            console.log(enemies);
            break;
          }
        }
      
        //desaparece la bala q se va al espacio
        if (bullets[i] && bullets[i].desaparece()) {
          bullets.splice(i, 1);
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
