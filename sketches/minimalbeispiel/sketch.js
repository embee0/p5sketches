function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  // Draw a grid
  stroke(200);
  for (let i = 0; i < width; i += 20) {
    line(i, 0, i, height);
  }
  for (let i = 0; i < height; i += 20) {
    line(0, i, width, i);
  }
  // Draw a red circle at the mouse position
  fill(255, 0, 0);
  noStroke();
  circle(mouseX, mouseY, 50);
}