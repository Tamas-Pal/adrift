export default function createWordCoords(p5, MARGIN, LINE_HEIGHT, CHAR_WIDTH, canvasHeight, canvasWidth, results) {
    let wordPositionX = MARGIN;
    let wordPositionY = LINE_HEIGHT - MARGIN * 2;
    let wordCoords = [];

    function wordLength(index) {
      return results[index]
        ? (results[index][0].length + 2) * CHAR_WIDTH
        : 0;
    }
    for (let i = 0; i < results.length; i++) {
      if (wordPositionY <= canvasHeight) {
      wordCoords[i] = p5.createVector(wordPositionX, wordPositionY);
      wordPositionX += wordLength(i);
      if (wordPositionX > canvasWidth - wordLength(i + 1)) {
        wordPositionX = MARGIN;
        wordPositionY += LINE_HEIGHT;
      }
    }
}
return wordCoords;
  }