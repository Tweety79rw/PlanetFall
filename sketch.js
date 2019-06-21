const earth = 5.972 * Math.pow(10, 24);
const person = 150;
const G = 6.67408 * Math.pow(10, -11);
const scale = 6371000;
let gp1, gp2;
function setup() {
  createCanvas(1900, 600);
  gp1 = new GravityPoint(0, height/2, 5, person, color(255, 0, 0), createDiv());
  gp2 = new GravityPoint(width/2, height/2, 2, earth, color(0, 255, 0), createDiv());
}
function gravity(m1, m2, r) {
  let massProduct = m1*m2;
  if(massProduct == 0)
    return 0
  if(r < 0.01) {
    return 0.000001;
  }
  let grav = G*(massProduct)/pow(r*6371000,2)/m1*10;
  if(!isFinite(grav))
    grav = 0.000001;
  return grav
}
function direction(p1, p2) {
    let diff = p5.Vector.sub(p2, p1);
    diff.normalize();

    return diff;
}
function draw() {
  background(0);
  gp1.runAll(gp2, true);
  gp2.runAll(gp1);
  stroke(0,255,0);
  strokeWeight(1);
  noFill();
  ellipse(width/2, height/2, width,width);
}
