const width = window.screen.width * 0.95 || 1600;
const height = window.screen.height * 0.75 || 800;
const size = 20;
const particles = [];
const framerate = 10;
let generation = 0;
const span = document.getElementById("generation");

function setup() {
  createCanvas(width, height);
  background(200);

  for (let i = 0; i < width / size; i++) {
    particles[i] = [];
    for (let j = 0; j < height / size; j++) {
      let x = i * size;
      let y = j * size;
      particles[i][j] = new Particle(x, y, size);
    }
  }
}

function draw() {
  if (frameCount % framerate === 0) {
    generation++;
    span.innerText = `${generation}`;
    background(200);

    for (let i = 0; i < width / size; i++) {
      for (let j = 0; j < height / size; j++) {
        let particle = particles[i][j];
        particle.draw();
        let neighbours = particle.neighbours(particles, i, j);

        if (neighbours === 3) {
          particle.alive();
        }
        if (neighbours < 2 || neighbours > 3) {
          particle.dead();
        }
      }
    }
  }
}

class Particle {
  constructor(_x, _y, _size) {
    this.x = _x;
    this.y = _y;
    this.size = _size;
    this.value = Math.floor(random(2));
    this.draw();
  }

  draw() {
    if (this.value) {
      fill("#A251FA");
    } else {
      fill(255);
    }

    square(this.x, this.y, this.size);
  }

  alive() {
    this.value = 1;
  }

  dead() {
    this.value = 0;
  }

  neighbours(particles, i, j) {
    let sum = 0;

    sum += particles[i - 1]?.[j - 1]?.value ?? 0;
    sum += particles[i]?.[j - 1]?.value ?? 0;
    sum += particles[i + 1]?.[j - 1]?.value ?? 0;
    sum += particles[i - 1]?.[j]?.value ?? 0;
    sum += particles[i + 1]?.[j]?.value ?? 0;
    sum += particles[i - 1]?.[j + 1]?.value ?? 0;
    sum += particles[i]?.[j + 1]?.value ?? 0;
    sum += particles[i + 1]?.[j + 1]?.value ?? 0;

    return sum;
  }
}
Ï