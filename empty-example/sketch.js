let r1 = 90;
let r2 = 125;
let m1 = 10;
let m2 = 10;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let g = 1;

let px2 = -1;
let py2 = -1;
let cx, cy;
let buffer;

function setup() {
  createCanvas(800, 800);
  a1 = PI/2;
  a2 = PI/2;
  cx = width / 2;
  cy = 50;
  buffer = createGraphics(width, height);
  buffer.background(175);
  buffer.translate(cx, cy);
}

function draw() {
  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  var top = -g * (2 * m1 + m2) * sin(a1) + -m2 * g * sin(a1 - 2 * a2) + -2 * 
      sin(a1 - a2) * m2 * (a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2));
  var bottom = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  var a1_a = top/bottom;

  var top2 = 2*sin(a1-a2)*(a1_v*a1_v*r1*(m1+m2) + g*(m1+m2)*cos(a1) + 
      a2_v*a2_v*r2*m2*cos(a1-a2));
  var bottom2 = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  var a2_a = top2/bottom2;

  translate(width/2, 300);

  a1_v += a1_a;
  a2_v += a2_a;

  console.log(a1_v);
  console.log(a2_v);

  // if (abs(a1_v) > 100) {
  //   a1_v = Math.sign(a1_v) * 100;
  // }
  // if (abs(a2_v) > 100) {
  //   a2_v = Math.sign(a2_v) * 100;
  // }

  //a1_v *= 0.9999;
  //a2_v *= 0.9999;

  a1 = a1 +  a1_v;
  a2 = a2 + a2_v;

  //a1 += 0.02;

  buffer.stroke(150);
  
  //if (frameCount > 1) {
   // buffer.line(px,250 + py,r1*sin(a1)+r2*sin(a2),250 + r1*cos(a1)+r2*cos(a2));
  //}

  fill(0);
  line(0,0,r1*sin(a1),r1*cos(a1));
  ellipse(r1*sin(a1),r1*cos(a1),30,30);
  line(r1*sin(a1),r1*cos(a1),r1*sin(a1)+r2*sin(a2),r1*cos(a1)+r2*cos(a2));
  ellipse(r1*sin(a1)+r2*sin(a2),r1*cos(a1)+r2*cos(a2),30,30);

  px = r1*sin(a1)+r2*sin(a2);
  py = r1*cos(a1)+r2*cos(a2);
}
