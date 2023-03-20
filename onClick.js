import {
  GRID_SIZE,
  LINE_HEIGHT,
  CHAR_WIDTH,
  wordPosArr,
  resultsArr,
  opacity,
} from './sketch.js';
function onClick(p5, index) {
  if (index != undefined) {
    let newRect = [
      wordPosArr[index].x,
      wordPosArr[index].y + GRID_SIZE,
      resultsArr[index][0].length * CHAR_WIDTH,
      -LINE_HEIGHT,
    ];

    p5.noStroke();
    p5.colorMode(p5.HSB);
    p5.noFill();
    p5.fill(`rgba(255, 0, 127, ${opacity})`);
    //console.log(opacity)
    //p5.fill(330, 100, 100);
    //p5.fill(p5.map(Math.sin(hue), 0, 1, 330, 360), 100, 100);
    //p5.strokeWeight(GRID_SIZE);
    //p5.stroke('black');
    //p5.colorMode(p5.RGBA);

    p5.rect(...newRect);
  }
}

export default onClick;
