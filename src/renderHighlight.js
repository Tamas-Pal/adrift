export default function renderHighlight(
  p5,
  index,
  GRID_SIZE,
  LINE_HEIGHT,
  CHAR_WIDTH,
  wordPositions,
  results,
  opacity
) {
  if (index != undefined) {
    let newRect = [
      wordPositions[index].x,
      wordPositions[index].y + GRID_SIZE,
      results[index][0].length * CHAR_WIDTH,
      -LINE_HEIGHT,
    ];

    p5.noStroke();
    p5.colorMode(p5.HSB);
    p5.noFill();
    p5.fill(`rgba(255, 240, 240, ${p5.map(opacity, 0, 0.021, 0, 1)})`);
    p5.rect(...newRect);
  }
}

