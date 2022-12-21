let x, y, z;
let w, h, l;

let maxX, maxY, maxZ;

let speed;
let slider;
let selector;

let xVel, yVel, zVel;

let r, g, b;

function preload() {
  img = loadImage('dvd_logo_0002.png'); 
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);

  slider = createSlider(0, 10, 3);
	slider.position(100, 100);
	slider.style('width', '100px');
	colorMode(RGB, 255);
	
	maxX = width;
	maxY = height;
	maxZ = width*7/8;
	
	selector = createSelect();
  selector.position(100, 200);
  selector.option('DVD');
  selector.option('Ball');
  selector.option('Number_10');
  selector.changed(changeTexture);
  
  w = 300;
  h = 300;
  l = 300;
	
	x = random(-maxX/2 + w, maxX/2 - w);
	y = random(-maxY/2 + h, maxY/2 - h);
	z = random(-maxZ/2 + l, maxZ/2 - l);

  
  xVel = 1;
  if (random(1) < 0.5) {
    xVel = -xVel;
  }
  yVel = 1;
  if (random(1) < 0.5) {
    xVel = -xVel;
  }
  zVel = 1;
  if (random(1) < 0.5) {
    xVel = -xVel;
  }
  
  randomizeColor();
  
  mouseX = width/2;
  mouseY = height/2;
}

function randomizeColor() {
  r = random(255);
  g = random(255);
  b = random(255);
}

function changeTexture() {
  let val = selector.value();

  if (val == 'DVD') {
    img = loadImage('dvd_logo_0002.png');
  } else if (val == 'Ball') {
    img = loadImage('Ball.png');
  } else if (val == 'Number_10') {
    img = loadImage('number_10.png');
  }

}

function draw() {
	background(0);


  translate(0, 0, -maxZ/2 + maxZ/20);
  
  
  let perspectiveX = map(mouseX, 0, width, -HALF_PI/30, HALF_PI/30);
  rotateY(perspectiveX);
  
  let perspectiveY = map(mouseY, 0, height, HALF_PI/30, -HALF_PI/30);
  rotateX(perspectiveY);
  
  let perspectiveZ = map(mouseY, 0, height, maxZ/10, 0);
  translate(0, 0, perspectiveZ);

  ambientLight(r, g, b);
  
  
	stroke(128);
  strokeWeight(3);
	noFill();
	push();

  box(maxX, maxY, maxZ);
  
	fill(51);
  noStroke();
	translate(x, y, -z);
  texture(img);  
	box(w, h, l);
  
	pop();
  
  x = x + (slider.value()*xVel);
  y = y + (slider.value()*yVel);
  z = z + (slider.value()*zVel);
  
  if(x + w/2 > maxX/2 || x - w/2 < -maxX/2) {
    xVel = -xVel;
    randomizeColor();
  }
  if(y + h/2 > maxY/2 || y - h/2 < -maxY/2) {
    yVel = -yVel;
    randomizeColor();
  }
  if(z + l/2 > maxZ/2 || z - l/2 < -maxZ/2) {
    zVel = -zVel;
    randomizeColor();
  }

  //draw the label for the slider
	textSize(15);
	text('Speed', 102, 95);
}
