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
let score = 0;
let bullets = [];

let enemies = [];
let direccionEnemigo = 1;

let fondo;
let imgVida;
let yFondo = 10;

function preload() {
  fondo = loadImage('assets/images/bg-game.png');
  playerImg = loadImage('assets/images/navepro.png');
  enemieImg = loadImage('assets/images/enemie.png');
  strongEnemyImg = loadImage('assets/images/strong.png');
  erraticEnemyImg = loadImage('assets/images/erratic.png');
  bossEnemyImg = loadImage('assets/images/boss.png');
  imgVida = loadImage('assets/images/vidas.png');
  shootSound = loadSound('assets/sounds/jugadordisparo.wav');
  shootEnemy = loadSound('assets/sounds/impactojugador.wav');
  shootEnemy2 = loadSound('assets/sounds/disparoenemigo.wav');
  musicabonita = loadSound('assets/sounds/musicabonita.wav');
  starmusic = loadSound('assets/sounds/menumusic.wav');
}

function setup() {
  musicabonita.setVolume(0.80);  // Ajusta según lo que necesites
  musicabonita.loop();  
  shootEnemy.setVolume(0.2);
  shootEnemy2.setVolume(0.2);
  createCanvas(500, 600);

  for (let i = 0; i < 100; i++) {
    estrellas.push({
      x: random(width),
      y: random(height),
      velocidad: random(0.5, 2)
    });
  }

  if (!nombre) nombre = "Desconocido";
  player = new Player(240, 530, nombre, score);

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
      dibujarHUD();

      break;
    case "nivel2":
      nivel2();
      yFondo += 4;
      dibujarHUD();

      break;
    case "nivel3":
      nivel3();
      yFondo += 6;
      dibujarHUD();

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
    shootSound.play();
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
    tiempoTransicion = 120;
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
  score = 0;
  player = new Player(240, 530, nombre, score);
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

function obtenerNumeroNivel() {
  if (estadoJuego === "nivel1") return 1;
  if (estadoJuego === "nivel2") return 2;
  if (estadoJuego === "nivel3") return 3;
  return "";
}

function dibujarEstrellas() {
  fill(255);
  noStroke();
  for (let estrella of estrellas) {
    circle(estrella.x, estrella.y, 2);
    estrella.y += estrella.velocidad;
    if (estrella.y > height) {
      estrella.y = 0;
      estrella.x = random(width);
    }
  }
}
