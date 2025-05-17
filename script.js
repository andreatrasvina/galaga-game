let player;
let bullets = [];

function setup() {
  createCanvas(500, 600);
  player = new Player(width = 240, height = 530);
}

function draw() {
  background(255);
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
