class GravityPoint {
  constructor(x, y, r, m, c, div) {
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.r = r;
    this.m = m;
    this.c = c;
    this.div = div;
    this.createElements()
  }
  createElements() {
    if(!this.div) return;
    this.elementPos = createSpan();
    this.elementVel = createSpan();
    this.elementAcc = createSpan();
    this.elementDist = createSpan();
    let p = createP("Gravity Point Stats");
    p.parent(this.div);
    p = createP("Pos: ");
    p.parent(this.div);
    this.elementPos.parent(p);
    p = createP("Vel: ");
    p.parent(this.div);
    this.elementVel.parent(p);
    p = createP("Acc: ");
    p.parent(this.div);
    this.elementAcc.parent(p);
    p = createP("Dist: ");
    p.parent(this.div);
    this.elementDist.parent(p);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.setElementsHtml();
    this.acc.mult(0);
  }
  setElementsHtml() {
    if(this.elementPos)
      this.elementPos.html(this.getVectorString(this.pos));
    if(this.elementVel)
      this.elementVel.html(this.getVectorString(this.vel));
    if(this.elementAcc)
      this.elementAcc.html(this.getVectorString(this.acc));
  }
  getVectorString(vec) {
    return "x: " + vec.x.toFixed(10) + ", y: " + vec.y.toFixed(10);
  }
  addForce(force) {
    this.acc.add(force);
  }
  calcForce(other, percentage) {
    let dir = direction(this.pos, other.pos);
    let dist = p5.Vector.dist(this.pos, other.pos);
    if(this.elementDist)
      this.elementDist.html("Distance: " + dist);
    let bigMass = other.m;
    if(percentage)
      bigMass = other.m * (dist/(width/2));
    bigMass = Math.min(bigMass, earth);
    dir.mult(gravity(this.m, bigMass, dist));
    this.addForce(dir);
  }
  runAll(other, percentage) {
    this.calcForce(other, percentage);
    this.update();
    this.render();
  }
  render() {
    stroke(this.c);
    strokeWeight(this.r);
    point(this.pos.x, this.pos.y);
  }
}
