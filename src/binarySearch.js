
export function binarySearch(p5, start, end, LINE_HEIGHT, CHAR_WIDTH, wordCoords) {
    let middle = Math.floor((start + end) / 2);
    let wordBounds = {
      top: wordCoords[middle].y - LINE_HEIGHT,
      right:
        wordCoords[middle].x + p5.results[middle][0].length * CHAR_WIDTH,
      bottom: wordCoords[middle].y,
      left: wordCoords[middle].x,
    };
    if (start > end) {
      return undefined;
    }
    if (
      p5.mouseX >= wordBounds.left &&
      p5.mouseX < wordBounds.right &&
      p5.mouseY >= wordBounds.top &&
      p5.mouseY < wordBounds.bottom
    ) {
      window.open(p5.results[middle][1], '_blank');
      return middle;
    } else if (
      p5.mouseY < wordBounds.top ||
      (p5.mouseX < wordBounds.left && p5.mouseY < wordBounds.bottom)
    ) {
      return binarySearch(p5, start, middle - 1, LINE_HEIGHT, CHAR_WIDTH, wordCoords);
    } else {
      return binarySearch(p5, middle + 1, end, LINE_HEIGHT, CHAR_WIDTH, wordCoords);
    }
  }