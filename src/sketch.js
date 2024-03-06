// import results from './main.js';
import p5 from 'p5';
import renderHighlight from './renderHighlight.js';
import createWordCoords from './createWordCoords.js';
import {
  calcResultParticleSize,
  calcWaveParticleSize,
} from './calcParticleSize.js';
import attractorFunction from './attractorFunction.js';
import { binarySearch } from './binarySearch.js';
import disperserFunction from './disperserFunction.js';
import calcParticleCoords from './calcParticleCoords.js';

const GRID_SIZE = Math.min(window.innerWidth, window.innerHeight) / 192;
const LINE_HEIGHT = GRID_SIZE * 16;
const CHAR_WIDTH = LINE_HEIGHT * 0.61;
const MARGIN = GRID_SIZE;
const DISPLACE_AMT = 0.01;

let wordCoords = [];
let font;
let highlightOpacity;
p5.waveAnimator;
p5.isResultState = true;

function renderAdjectivesP5(p5) {
  p5.results = [];
  let wordIndex;
  let pointOrigins = [];
  let points = [];
  highlightOpacity = 1;
  let canvasWidth = p5.windowWidth;
  let canvasHeight = p5.windowHeight - 45;
  let shorterAxisLength = Math.min(canvasWidth, canvasHeight);

  p5.preload = function () {
    font = p5.loadFont('../public/font/IBMPlexMono-Regular.ttf');
  };

  p5.setup = function () {
    p5.pixelDensity(1);
    p5.createCanvas(canvasWidth, canvasHeight);
    p5.background(127, 0, 255);

    // CREATE TEXT GRAPHICS
    // word positions
    wordCoords = createWordCoords(
      p5,
      MARGIN,
      LINE_HEIGHT,
      CHAR_WIDTH,
      canvasHeight,
      canvasWidth,
      p5.results
    );
    // render words
    for (let i = 0; i < wordCoords.length; i++) {
      p5.colorMode(p5.RGB);
      p5.fill(0, 0, 0);
      p5.textSize(LINE_HEIGHT);
      p5.textFont(font);
      p5.text(
        p5.results[i][0].toUpperCase(),
        wordCoords[i].x,
        wordCoords[i].y
      );
    }
    
    // INTERPRET PIXELS TO PARTICLES TO EVALUATE STARTING POSITIONS
    p5.loadPixels();
    for (let y = 0; y < canvasHeight; y += GRID_SIZE) {
      for (let x = 0; x < canvasWidth; x += GRID_SIZE) {
        let px = p5.get(x, y);
        if (px[2] < 192) {
          pointOrigins.push(p5.createVector(x, y));
        }
      }
    }
    
    // REARRANGING PARTICLES TO RANDOM LOCATIONS
    p5.background(127, 0, 255);
    for (let i = 0; i < pointOrigins.length; i++) {
      points[i] = p5.createVector(
        p5.random(0, canvasWidth),
        p5.random(0, canvasHeight)
      );
      let particleSize = calcResultParticleSize(
        p5,
        points[i],
        pointOrigins[i],
        shorterAxisLength,
        GRID_SIZE
      );
      p5.rect(points[i].x, points[i].y, particleSize, particleSize);
    }
  };

  p5.draw = function () {
    p5.waveAnimator += 0.2;

    p5.colorMode(p5.RGB);
    p5.background(127, 0, 255, 192);

    // RENDER HIGHLIGHT
    highlightOpacity > 0.021
      ? (highlightOpacity -= 0.02)
      : (highlightOpacity = 0);
    if (wordIndex != undefined) {
      renderHighlight(
        p5,
        wordIndex,
        GRID_SIZE,
        LINE_HEIGHT,
        CHAR_WIDTH,
        wordCoords,
        p5.results,
        highlightOpacity
      );
    }
    p5.randomSeed(0);
    for (let i = 0; i < points.length; i++) {
      // CALCULATE MOVEMENT TOWARDS ORIGIN
      const attractor = attractorFunction(
        p5.isResultState,
        pointOrigins[i],
        points[i]
      );

      // CALCULATE MOVEMENT AWAY FROM ORIGIN
      const entropy = disperserFunction(
        p5,
        points[i],
        pointOrigins[i],
        canvasHeight,
        DISPLACE_AMT,
        LINE_HEIGHT
      );

      // ADD SOME EXTRA HORIZONTAL RANDOMNESS
      let noiseDisplacement = p5.map(
        p5.noise(points[i].x, points[i].y),
        0,
        1,
        -DISPLACE_AMT * 5,
        DISPLACE_AMT * 20
      );

      // MIX THEM TOGETHER
      calcParticleCoords(
        p5,
        points[i],
        pointOrigins[i],
        shorterAxisLength,
        attractor,
        entropy,
        noiseDisplacement
      );

      // PARTICLE SIZE
      let particleSize =
        p5.isResultState == true
          ? calcResultParticleSize(
              p5,
              points[i],
              pointOrigins[i],
              shorterAxisLength,
              GRID_SIZE
            )
          : calcWaveParticleSize(
              p5,
              points[i],
              canvasWidth,
              canvasHeight,
              shorterAxisLength,
              GRID_SIZE
            );
      p5.colorMode(p5.RGB);
      p5.fill(0);
      p5.noStroke();
      p5.rect(points[i].x, points[i].y, particleSize, particleSize);
    }

    // EXTRACT WORD WHEN CLICKED
    p5.mousePressed = function (event) {
      if (
        event.srcElement === document.querySelector('canvas') &&
        p5.isResultState === true
      ) {
        highlightOpacity = 1;
        let searchStart = 0;
        let searchEnd = wordCoords.length - 1;

        wordIndex = binarySearch(
          p5,
          searchStart,
          searchEnd,
          LINE_HEIGHT,
          CHAR_WIDTH,
          wordCoords
        );
      }
    };
  };
}

export default renderAdjectivesP5;
