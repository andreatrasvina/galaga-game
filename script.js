let estadoJuego = "menu";
let enemyBullets = [];  // Necesario para balas enemigas en nivel 2
let zigzagTimer = 0;    // Timer para zigzag en nivel 2

let playerImg;
let enemieImg;
let strongEnemyImg;
let erraticEnemyImg;
let bossEnemyImg;

let mostrarTransicion = false;
let tiempoTransicion = 0;
let siguienteNivel = "";

let estadoPrevio = "";

let player;
let nombre = "";
let bullets = [];

let enemies = [];
let direccionEnemigo = 1;

let fondo;
let yFondo = 10;

function preload() {
  fondo = loadImage('assets/images/bg-game.png');
  playerImg = loadImage('assets/images/navepro.png');
  enemieImg = loadImage('assets/images/enemie.png');
  strongEnemyImg = loadImage('assets/images/strong.png');
  erraticEnemyImg = loadImage('assets/images/erratic.png');
  bossEnemyImg = loadImage('assets/images/boss.png');
}

function setup() {
  createCanvas(500, 600);
  if (!nombre) nombre = "Desconocido";
  player = new Player(240, 530, nombre, 0);

  // Creamos los enemigos iniciales para el nivel 1
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      enemies.push(new Enemy(80 + i * 70, 60 + j * 60, 5, enemieImg));
    }
  }
}

function draw() {
  background(0);

  yFondo += 2;
  image(fondo, 0, yFondo % height - height, width, height);
  image(fondo, 0, yFondo % height, width, height);

  switch (estadoJuego) {
    case "menu":
      mostrarMenu();

      break;
    case "nivel1":
      nivel1();

      break;
    case "nivel2":
      nivel2();
      yFondo += 4;

      break;
    case "nivel3":
      nivel3();
      yFondo += 6;

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

    case "transicionNivel":
      mostrarTransicionNivel();

      break;

  }
}


function keyPressed() {
  if (estadoJuego === "menu" && keyCode === ENTER) {
    estadoJuego = "nivel1";
    reiniciarJuego();
  }

  if (estadoJuego === "gameOver" || estadoJuego === "mostrarVictoria") {
    if (keyCode === ENTER) {
      const input = document.getElementById("nombreInput");
      const nombreIngresado = input.value.trim() || "Jugador";
      guardarPuntaje(nombreIngresado, player.score);
      ocultarInputNombre();
      estadoJuego = "menu";
      reiniciarJuego();
    }
    return;
  }

  //espacio para añadir balas al array
  if (key === ' ') {
    bullets.push(new Bullet(player.x + player.width / 2, player.y));
  }

  if ((estadoJuego === "nivel1" || estadoJuego === "nivel2" || estadoJuego === "nivel3") && key === 'p') {
    estadoPrevio = estadoJuego;
    estadoJuego = "pausa";
  } else if (estadoJuego === "pausa" && key === 'p') {
    estadoJuego = estadoPrevio;
  }

  //iniciar nivel 2
  if (enemies.length === 0 && estadoJuego === "nivel1") {
    iniciarNivel2();
    estadoJuego = "transicionNivel";
    siguienteNivel = "nivel2";
    tiempoTransicion = 90;
  }

  if (enemies.length === 0 && estadoJuego === "nivel2") {
    iniciarNivel3();
    estadoJuego = "transicionNivel";
    siguienteNivel = "nivel3";
    tiempoTransicion = 120;
  }

  if ((estadoJuego === "gameOver" || estadoJuego === "mostrarVictoria") && keyCode === ENTER) {
    estadoJuego = "menu";
    reiniciarJuego();
  }
}

function reiniciarJuego() {
  player = new Player(240, 530);
  bullets = [];
  enemies = [];
  enemyBullets = [];
  direccionEnemigo = 1;
  yFondo = 10;

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      enemies.push(new Enemy(80 + i * 70, 60 + j * 60, 5, enemieImg));
    }
  }
}
