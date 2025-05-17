let player;

function setup() {
    createCanvas(500, 600);
    player = new Player(width / 2, height / 2);
  }
  
  function draw() {
    background(255);
    player.dibujar();
  }