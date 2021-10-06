const backgroundColor = 35; //kinda self-explanatory
const strokeAlpha = 60; //the alpha of the lines (lower numbers are more transparent)
const strokeColor = 255; //the line color

const noiseZoom = 0.006; //how zoomed in the perlin noise is
const noiseOctaves = 14; //The number of octaves for the noise
const noiseFalloff = 0.5; //The falloff for the noise layers

const zOffsetChange = 0; //How much the noise field changes in the z direction each frame
const individualZOffset = 0; //how far away the points/lines are from each other in the z noise axies (the bigger the number, the more chaotic)

const lineSpeed = 5; //the maximum amount each point can move each frame

const newPointsCount = 2; //the number of new points added when the mouse is dragged
const numStartingPoints = 1000;
const startingOffset = 400;
const particlePersist = 0.999;
const maxPoints = 2000;
const imgAR = 2318 / 2571;
const canvasWidth = window.innerWidth > 600 ? 2 * window.innerWidth / 3 : window.innerWidth;
const canvasHeight = window.innerHeight - 85;

let points = [];
let img;

window.preload = () => {
  img = loadImage("aboutp1.jpg");
}

window.setup = () => {
  createCanvas(canvasWidth, canvasHeight);
  pixelDensity(1);

  loadPixels();
  img.loadPixels();

  const canvasAR = width / height;

  if (imgAR > canvasAR) {
    img.resize(0, height);
  } else {
    img.resize(width, 0);
  }
  
  image(img, 0, 0);

  background(backgroundColor);
  strokeWeight(2);
  stroke(strokeColor, strokeAlpha);
  noiseDetail(noiseOctaves, noiseFalloff);

  for (let p = 0; p < numStartingPoints; p++) {
    points[p] = createVector(width / 2 + random(-startingOffset - 50, startingOffset), height / 2 + random(-startingOffset, startingOffset));
    points[p].zOffset = random();
    points[p].isMoving = true;
  }
}

window.draw = () => {
  for (let pt = 0; pt < points.length; pt++) {
    let p = points[pt];
    let noiseX = p.x * noiseZoom;
    let noiseY = p.y * noiseZoom;
    let noiseZ = frameCount * zOffsetChange + p.zOffset * individualZOffset;
    let newPX = p.x + map(noise(noiseX, noiseY, noiseZ), 0, 1, -lineSpeed, lineSpeed);
    let newPY = p.y + map(noise(noiseX, noiseY, noiseZ + 214), 0, 1, -lineSpeed, lineSpeed);
    const pixColor = img.get(p.x, p.y);
    stroke(pixColor[0] || 0, pixColor[1] || 0, pixColor[2] || 0);
    line(p.x, p.y, newPX, newPY);
    p.x = newPX;
    p.y = newPY;

    if (random() > particlePersist) {
      p.isMoving = false;
    }

    if (!p.isMoving || p.x > width || p.x < 0 || p.y < 0 || p.y > height) {
      points.splice(pt, 1);
    }
  }

  const newPoint = getPoint(width / 2 + random(-startingOffset - 50, startingOffset), height / 2 + random(-startingOffset, startingOffset));
  points[points.length] = newPoint;

  if (points.length > maxPoints) {
    points.splice(0, 1);
  }
}

window.mouseMoved = () => {
  for (let i = 0; i < newPointsCount; i++) {
    const newPoint = getPoint(mouseX, mouseY);
    points[points.length] = newPoint;
  }
}

const getPoint = (x, y) => {
  let angle = random(TAU);
  let magnitude = randomGaussian() * ((newPointsCount - 1) ** 0.5 * 3);
  return {
    "x": x + magnitude * cos(angle),
    "y": y + magnitude * sin(angle),
    "zOffset": random(),
    isMoving: true
  };
}