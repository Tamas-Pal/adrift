export default function createWordCoords(p5, MARGIN, LINE_HEIGHT, CHAR_WIDTH, canvasHeight, canvasWidth, resultsArr) {
    let wordPositionX = MARGIN;
    let wordPositionY = LINE_HEIGHT - MARGIN * 2;
    let wordCoords = [];

    function wordLength(index) {
      return resultsArr[index]
        ? (resultsArr[index][0].length + 2) * CHAR_WIDTH
        : 0;
    }
    for (let i = 0; i < resultsArr.length; i++) {
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