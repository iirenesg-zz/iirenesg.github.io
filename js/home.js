// Original code by The Wizard Bear

const string = "-ii-"; //words to be displayed
const size = window.innerWidth > 1400 ? 500 : window.innerWidth > 600 ? 300 : 150; //font size
const fontFile = "./Satisfy.ttf";
const showText = window.innerWidth > 600; //whether or not to have an overlay of the original text (in the background color)
const textAlpha = 1; //the alpha of the text if displayed (low value will make it slowly fade in)
const backgroundColor = 0; //kinda self-explanatory
const strokeAlpha = 60; //the alpha of the lines (lower numbers are more transparent)
const strokeColor = 'rgba(255,255,0,0.5)'; //the line color
const textColor = 'rgba(50,150,150,0.1)';
const maxPoints = 2000;

const fontSampleFactor = 0.3; //How many points there are: the higher the number, the closer together they are (more detail)

const noiseZoom = 0.006; //how zoomed in the perlin noise is
const noiseOctaves = 14; //The number of octaves for the noise
const noiseFalloff = 0.55; //The falloff for the noise layers

const zOffsetChange = 0.00009; //How much the noise field changes in the z direction each frame
const individualZOffset = 0; //how far away the points/lines are from each other in the z noise axies (the bigger the number, the more chaotic)

const lineSpeed = 2; //the maximum amount each point can move each frame

const newPointsCount = 1; //the number of new points added when the mouse is dragged
const particlePersist = 0.9999;
const offsetY = window.innerWidth > 1400 ? 150 : window.innerWidth > 600 ? 50 : 0;

var font;
var points = [];
var startingPoints = [];

window.preload = () => {
	font = loadFont(fontFile);
}

window.setup = () => {
	createCanvas(windowWidth, 768);
	colorMode(HSB, 100);
	background(backgroundColor);
	textFont(font);
	textSize(size);
	fill(backgroundColor, textAlpha);
	stroke(strokeColor);
	noiseDetail(noiseOctaves, noiseFalloff);

  if (window.innerWidth > 600) {
    startingPoints = font.textToPoints(string, width / 2, height / 2 + offsetY, size, { sampleFactor: fontSampleFactor });
  } else {
    for (let index = 0; index < 1000; index++) {
      startingPoints.push({ x: random(0, width), y: random(0, height) })
    }
  }

	for (let p = 0; p < startingPoints.length; p++) {
		points[p] = startingPoints[p];
		points[p].zOffset = random();
    points[p].isMoving = true;
	}
}

window.draw = () => {
	if(showText){
		fill(0,0.5);
		strokeWeight(2);
		stroke(0);
		text(string, width / 2, height/2 + offsetY);
	}
	for (let pt = points.length - 1; pt >= 0; pt--) {
		let p = points[pt];
		let noiseX = p.x * noiseZoom;
		let noiseY = p.y * noiseZoom;
		let noiseZ = frameCount * zOffsetChange + p.zOffset*individualZOffset;
		let newPX = p.x + map(noise(noiseX, noiseY, noiseZ), 0, 1, -lineSpeed, lineSpeed);
		let newPY = p.y + map(noise(noiseX, noiseY, noiseZ + 214), 0, 1, -lineSpeed, lineSpeed);
		const hue = map(p.y, 100, height - 100, 25, 90);
		
		strokeWeight(1);
		stroke(hue, 100,100);
		line(p.x, p.y, newPX, newPY);
		p.x = newPX;
		p.y = newPY;

    if (random() > particlePersist) {
      p.isMoving = false;
    }

    if (!p.isMoving || p.x > width || p.x < 0 || p.y < 0 || p.y > height) {
      points.splice(pt, 1);
    }

    if (points.length > maxPoints) {
      points.splice(0, 1);
    }
	}
}

window.mouseDragged = () => {
	for (let i = 0; i < newPointsCount; i++) {
		let angle = random(TAU);
		let magnitude = randomGaussian() * ((newPointsCount-1)**0.5*3);
		let newPoint = {
			"x": mouseX + magnitude * cos(angle),
			"y": mouseY + magnitude * sin(angle),
			"zOffset": random(),
      isMoving: true,
		};
		points[points.length] = newPoint;
		startingPoints[startingPoints.length] = newPoint;
	}
}

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};