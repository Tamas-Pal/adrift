export default function renderHighlight(
  p5,
  index,
  GRID_SIZE,
  LINE_HEIGHT,
  CHAR_WIDTH,
  wordPosArr,
  resultsArr,
  opacity
) {
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
    p5.fill(`rgba(255, 240, 240, ${p5.map(opacity, 0, 0.021, 0, 1)})`);
    p5.rect(...newRect);
  }
}

