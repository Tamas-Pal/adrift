import resultsArr from './main.js';
import onClick from './onClick.js';

const GRID_SIZE = Math.min(window.innerWidth, window.innerHeight) / 192;
const LINE_HEIGHT = GRID_SIZE * 16;
const CHAR_WIDTH = LINE_HEIGHT * 0.61;
const MARGIN = GRID_SIZE;
const DISPLACE_AMT = 0.05;

let font;

let wordPosArr = [];
let opacity;

function renderAdjectivesP5(p5) {
  console.log(GRID_SIZE);
  let wordIndex;
  let pointOrigins = [];
  let points = [];
  opacity = 1;
  let canvasWidth = p5.windowWidth;
  let canvasHeight = p5.windowHeight - MARGIN * 5;

  function calcParticleSize(index) {
    let displacementDistance = p5.dist(
      points[index].x,
      points[index].y,
      pointOrigins[index].x,
      pointOrigins[index].y
    );
    return p5.map(
      displacementDistance,
      0,
      Math.min(canvasWidth, canvasHeight) / 5,
      GRID_SIZE,
      0.01,
      true
    );
  }

  function wordPositioning() {
    let wordPositionX = MARGIN;
    let wordPositionY = LINE_HEIGHT;

    function wordLength(index) {
      return resultsArr[index]
        ? (resultsArr[index][0].length + 2) * CHAR_WIDTH
        : 0;
    }

    for (let i = 0; i < resultsArr.length; i++) {
      wordPosArr[i] = p5.createVector(wordPositionX, wordPositionY);
      wordPositionX += wordLength(i);
      if (wordPositionX > canvasWidth - wordLength(i + 1)) {
        wordPositionX = MARGIN;
        wordPositionY += LINE_HEIGHT;
      }
      if (wordPositionY > canvasHeight) {
        //console.log(wordPosArr)
        return;
      }
    }
  }

  p5.preload = function () {
    font = p5.loadFont('./font/SpaceMono-Regular.ttf');
  };

  p5.setup = function () {
    p5.pixelDensity(1);
    p5.createCanvas(canvasWidth, canvasHeight);
    document.querySelector('canvas').style.top = `${MARGIN * 5}px`;
    p5.background(127, 0, 255, 192);

    wordPositioning();

    for (let i = 0; i < wordPosArr.length; i++) {
      p5.colorMode(p5.RGB);
      p5.fill(0, 0, 0);
      p5.textSize(LINE_HEIGHT);
      p5.textFont(font);
      p5.text(resultsArr[i][0].toUpperCase(), wordPosArr[i].x, wordPosArr[i].y);
    }

    p5.loadPixels();
    for (let y = 0; y < canvasHeight; y += GRID_SIZE) {
      for (let x = 0; x < canvasWidth; x += GRID_SIZE) {
        let px = p5.get(x, y);
        if (px[2] < 192) {
          pointOrigins.push(p5.createVector(x, y));
        }
      }
    }

    p5.background(127, 0, 255, 255);
    //points = JSON.parse(JSON.stringify(points));
    for (let i = 0; i < pointOrigins.length; i++) {
      points[i] = p5.createVector(
        p5.random(0, canvasWidth),
        p5.random(0, canvasHeight)
      );
      p5.rect(
        points[i].x,
        points[i].y,
        calcParticleSize(i),
        calcParticleSize(i)
      );
    }
  };

  p5.draw = function () {
    p5.colorMode(p5.RGB);
    p5.background(127, 0, 255, 127);
    p5.fill(0);
    opacity > 0.021 ? (opacity -= 0.02) : (opacity = 0);
    if (wordIndex != undefined) {
      onClick(p5, wordIndex);
    }
    p5.randomSeed(0);

    for (let i = 0; i < points.length; i++) {
      let displacementDistance = p5.dist(
        points[i].x,
        points[i].y,
        pointOrigins[i].x,
        pointOrigins[i].y
      );
      let entropyMultiplier = p5.map(displacementDistance, 0, canvasHeight, .5, LINE_HEIGHT);
      let displacement = p5.random(-DISPLACE_AMT, DISPLACE_AMT);
      let attractorX = (pointOrigins[i].x + points[i].x) / 2;
      let entropyX = points[i].x + displacement * entropyMultiplier;
      let attractorY = (pointOrigins[i].y + points[i].y) / 2;
      let entropyY = points[i].y + displacement * entropyMultiplier;

      let pointerDistance = p5.dist(
        p5.mouseX,
        p5.mouseY,
        pointOrigins[i].x,
        pointOrigins[i].y
      );
      let distanceWeight = p5.map(
        pointerDistance,
        0,
        Math.min(canvasWidth, canvasHeight) / 5,
        0,
        1,
        true
      );

      points[i].x =
        attractorX * (1 - distanceWeight) + entropyX * distanceWeight;
      points[i].y =
        attractorY * (1 - distanceWeight) + entropyY * distanceWeight;

      p5.colorMode(p5.RGB);
      p5.fill(0);
      p5.noStroke();
      p5.rect(
        points[i].x,
        points[i].y,
        calcParticleSize(i),
        calcParticleSize(i)
      );
    }

    p5.mousePressed = function (event) {
      console.log(event.srcElement);
      if (event.srcElement != document.querySelector('canvas')) {
        return;
      }
      opacity = 1;
      let searchStart = 0;
      let searchEnd = wordPosArr.length - 1;

      function binarySearch(start, end) {
        let middle = Math.floor((start + end) / 2);
        let wordCoords = {
          top: wordPosArr[middle].y - LINE_HEIGHT,
          right:
            wordPosArr[middle].x + resultsArr[middle][0].length * CHAR_WIDTH,
          bottom: wordPosArr[middle].y,
          left: wordPosArr[middle].x,
        };
        if (start > end) {
          return undefined;
        }
        if (
          p5.mouseX >= wordCoords.left &&
          p5.mouseX < wordCoords.right &&
          p5.mouseY >= wordCoords.top &&
          p5.mouseY < wordCoords.bottom
        ) {
          window.open(resultsArr[middle][1], '_blank');
          return middle;
        } else if (
          p5.mouseY < wordCoords.top ||
          (p5.mouseX < wordCoords.left && p5.mouseY < wordCoords.bottom)
        ) {
          return binarySearch(start, middle - 1);
        } else {
          return binarySearch(middle + 1, end);
        }
      }

      wordIndex = binarySearch(searchStart, searchEnd);
    };
  };
}
export default renderAdjectivesP5;
export { GRID_SIZE, LINE_HEIGHT, CHAR_WIDTH, wordPosArr, resultsArr, opacity };
