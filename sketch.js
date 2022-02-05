let colorNum = 6;
let palette = [];
let bg = undefined;

let capturer;
let duration = 15000;
let startMillis = null;

function setup() {
  createCanvas(800, 800);
  frameRate(60);

  while(palette.length < colorNum) {
    palette = chromotome.get();
    if(!palette.background) {
      palette = {};
      continue;
    }
    bg = color(palette.background);
    palette = shuffle(palette.colors);
  }

  background(bg);
  capturer = new CCapture({format: 'png', framerate: 60});
}

function draw() {
  if(frameCount === 1) {
    capturer.start();
  }
  if(!startMillis)
    startMillis = millis();
  let elapsed = millis() - startMillis;
  if(elapsed > duration) {
    noLoop();
    capturer.stop();
    capturer.save();
    return;
  }

  //draw code here

  capturer.capture(document.getElementById('defaultCanvas0'));
}