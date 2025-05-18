class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 20;
  }
  
  update() {
    this.x += direccionEnemigo *5;
  }
  
  bajar() {
    this.y += this.h;
  }
  
  show() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.w, this.h);
  }

}