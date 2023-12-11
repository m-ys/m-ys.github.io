let particles = [];
const num = 1000;

const noiseScale = 0.01/2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < num; i ++) {
    particles.push(createVector(random(width), random(height)));
  }
  position = createVector(width / 2, height / 2);
  
}

function draw() {
 let gradientColor = map(mouseX, 0, width, 0, 255);

  background(0, 0, gradientColor);
  let mouseVector = createVector(mouseX, mouseY);
  let shiftVector = p5.Vector.sub(mouseVector, position);
  shiftVector.mult(0.05);
  position.add(shiftVector);

  stroke(255);
  background(0, 10);
  for(let i = 0; i < num; i ++) {
    let p = particles[i];
    point(p.x, p.y);
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
    let a = TAU * n;
    p.x += cos(a);
    p.y += sin(a);
    if(!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }


function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
}
