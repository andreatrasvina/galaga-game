let player;
let bullets = [];
let fondo;
let yFondo = -20;

function preload() {
    fondo = loadImage('assets/images/bg-game.png'); 
}


function setup() {
    createCanvas(500, 600);
    player = new Player(240, 530);
}

function draw() {
    background(0);

    //movimiento fondo
    yFondo += 2;

    //que la foto se repita verticalmente
    image(fondo, 0, yFondo % height - height, width, height);
    image(fondo, 0, yFondo % height, width, height);
    

    //juego
    player.dibujar();
    player.mover();

    //muestra balas del array bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].mover();
        bullets[i].dibujar();

        //elimina las que salen de la pantalla
        if (bullets[i].desaparece()) {
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
