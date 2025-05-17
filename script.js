let player;

function setup() {
  createCanvas(500, 600);
  player = new Player(width = 240, height = 530);
}

function draw() {
  background(255);
  player.dibujar();
  player.mover()
}
