let r1 = 100;
let r2 = 90;
let m1 = 10;
let m2 = 10;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = 1;

let px = -1;
let py = -1;
let cx, cy;
let buffer;
let trace;
let drawCount;

function setup() {
  createCanvas(600, 600);
  a1 = PI/2;
  a2 = PI/2;
  cx = width / 2;
  cy = 250;
  buffer = createGraphics(width, height);
  buffer.background(175);
  buffer.translate(cx,cy);
  trace = false;
  drawCount = 0;
}

function keyPressed() {
  if (key == ' ') {
    trace = !trace;
    buffer.background(175);
  }
}

function draw() {
  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);
  translate(cx, cy);


  // Reposition Bob
  if (mouseIsPressed) {
    noFill();

    // Find the new location of the bob
    // Based on mouse and constrained by length
    let v = createVector(mouseX-cx, mouseY-cy);
    if (v.mag() > r1 + r2) v.setMag(r1+r2);
    if (v.mag() < r1 - r2) v.setMag(r1-r2);

    // use law of cosines to find first angle
    // of the triangle formed
    let a = v.mag();
    let ac = acos((r2*r2 - v.mag()*v.mag() - r1*r1)/(-2*a*r1));

    // Find a1 by subtracting/adding the inner
    // angle of triangle based on position
    let da = createVector(0,1).angleBetween(createVector(v.x,v.y));
    var da2;
    if (v.x >= 0) da2 = da - ac;
    else da2 = -(da - ac);

    // Get the angle between first pendulum's bob and 2nd
    let vec1 = createVector(0,1);
    vec1.rotate(-da2);
    vec1.setMag(r1);

    let k = v.copy();
    k.sub(vec1);

    // position for bob
    ellipse(v.x,v.y,10,10);

    // set angles and reset velocity
    a1 = da2;
    a2 = -k.heading() + PI/2;
    a1_v = 0;
    a2_v = 0;

    // Clear drawing
    buffer.background(175);

  } else {

    var top = -g * (2 * m1 + m2) * sin(a1) + -m2 * g * sin(a1 - 2 * a2) + -2 *
        sin(a1 - a2) * m2 * (a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2));
    var bottom = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    var a1_a = top/bottom;

    var top2 = 2*sin(a1-a2)*(a1_v*a1_v*r1*(m1+m2) + g*(m1+m2)*cos(a1) +
        a2_v*a2_v*r2*m2*cos(a1-a2));
    var bottom2 = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
    var a2_a = top2/bottom2;
    
    // Maximum Acc.
    if (abs(a1_a) > 0.4) {
      a1_v = 0;
      a1 = PI/2;
      a1 = PI/2;

    }
    if (abs(a2_a) > 0.4) {
      a2_v = 0;
      a2 = PI/2;
      a1_v = 0;
      a1 = PI/2;
      a1 = PI/2;
    }


    // Velocity Dampening
    a1_v *= 0.998;
    a2_v *= 0.998;

    // Update velocities
    a1_v += a1_a;
    a2_v += a2_a;

    // Update angles
    a1 = a1 +  a1_v;
    a2 = a2 + a2_v;

    // Draw path

    buffer.stroke(100);
    if (drawCount == 1 && trace) {
      //console.log('hello');
      buffer.line(px,py,r1*sin(a1)+r2*sin(a2),r1*cos(a1)+r2*cos(a2));
    }


  }
  stroke(0);
  fill(0);
  line(0,0,r1*sin(a1),r1*cos(a1));
  ellipse(r1*sin(a1),r1*cos(a1),30,30);
  line(r1*sin(a1),r1*cos(a1),r1*sin(a1)+r2*sin(a2),r1*cos(a1)+r2*cos(a2));
  ellipse(r1*sin(a1)+r2*sin(a2),r1*cos(a1)+r2*cos(a2),30,30);

  px = r1*sin(a1)+r2*sin(a2);
  py = r1*cos(a1)+r2*cos(a2);
  drawCount = 1;
}
