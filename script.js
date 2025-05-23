let estadoJuego = "menu";
let enemyBullets = [];  // Necesario para balas enemigas en nivel 2
let zigzagTimer = 0;    // Timer para zigzag en nivel 2

let player;
let bullets = [];

let enemies = [];
let direccionEnemigo = 1;

let fondo;
let yFondo = -20;

function preload() {
  fondo = loadImage('assets/images/bg-game.png');
}

function setup() {
  createCanvas(500, 600);
  player = new Player(240, 530);

  // Creamos los enemigos iniciales para el nivel 1
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      enemies.push(new Enemy(80 + i * 70, 60 + j * 60));
    }
  }
}

function draw() {
  background(0);

  switch (estadoJuego) {
    case "menu":
      mostrarMenu();
      break;
    case "nivel1":
      nivel1();
      break;
    case "nivel2":
      nivel2();
      break;
    case "nivel3":
      nivel3();
      break;
    case "pausa":
      mostrarPausa();
      break;
    case "mostrarVictoria":
      mostrarVictoria();
      break;
    case "gameOver":
      mostrarGameOver();
      break;
  }
}

//espacio para añadir balas al array
function keyPressed() {
  if (estadoJuego === "menu" && keyCode === ENTER) {
    estadoJuego = "nivel1";
  }

  if (key === ' ') {
    bullets.push(new Bullet(player.x + player.width / 2, player.y));
  }

  if (estadoJuego === "nivel1" && key === 'p') {
    estadoJuego = "pausa";
  } else if (estadoJuego === "pausa" && key === 'p') {
    estadoJuego = "nivel1";
  }
  // Agrega esta condición para iniciar nivel 2 con la tecla 'n'
  if (estadoJuego !== "nivel2" && key === 'n') {
    iniciarNivel2();
    estadoJuego = "nivel2";
  }
}
