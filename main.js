import './style.css';
import renderAdjectivesP5 from './sketch.js';
import p5 from 'p5';
// TO TEST WITHOUT API>
import { articles } from './articles.json';
var resultsArr = [];
let renderObj;
let countDown;
// let state = 0;
// let minuteInterval;

function prepareAdjectives(responseJSON) {
  const articles = responseJSON.articles;
  //console.log(articles);
  for (let j = resultsArr.length; j > 0; j--) {
    resultsArr.pop();
  }

  for (let i = 0; i < articles.length; i++) {
    let tokensArr = RiTa.tokens(articles[i].title);
    let posArr = RiTa.pos(tokensArr);

    for (let j = 0; j < posArr.length; j++) {
      if (/jj/.test(posArr[j])) {
        resultsArr.push([tokensArr[j], articles[i].url]);
      }
    }
  }

  resultsArr.sort((a, b) => 0.5 - Math.random());
}

function getAPIData(countDown) {
  let now = new Date();
  console.log('api', (60 - now.getSeconds()) * 1000);

  var rootTime = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}T${now.getHours()}:${now.getMinutes()}`;
  /*const response = await fetch(
    `https://newsapi.org/v2/everything?from=${rootTime}:00&to=${rootTime}:59&language=en&sortBy=relevancy&apiKey=555c602b336742d883598046fa557f30`
    );
    const responseJSON = await response.json();*/
  // TO TEST WITHOUT API>
  const responseJSON = { articles };
  prepareAdjectives(responseJSON);
  if (renderObj) {
    renderObj.remove();
  }
  renderObj = new p5(renderAdjectivesP5);
}
let now = new Date();
let timeLeft = (60 - now.getSeconds()) * 1000;
function startTimer(timeLeft) {
  countDown = timeLeft / 1000;
  setInterval(() => {
    countDown = countDown > 0 ? --countDown : 59;
    renderObj.isResultState = countDown > 58 ? false : true;
    console.log(countDown, renderObj.isResultState);
  }, 1000);
}
startTimer(timeLeft);
getAPIData(timeLeft);
setTimeout(getAPIData, timeLeft, 59);
function minuteInterval() {
  setInterval(getAPIData, 60000, 59);
}
setTimeout(minuteInterval, timeLeft);

/*
while (state < 2) {
  switch (state) {
    case 0:
      let now = new Date();
      let timeLeft = ((60 - now.getSeconds()) % 60) * 1000;
       console.log(timeLeft);
      //setTimeout(getAPIData(now), timeLeft);
      //getAPIData(now);
      break;
    case 1:
      //minuteInterval = setInterval(getAPIData(now), 60 * 1000);
      break;
  }
}*/

/*async function getAPIData(event) {
  event.preventDefault();
const userInput = document.getElementById('input').value;
const response = await fetch(
    `https://newsapi.org/v2/everything?q=${userInput}&language=en&sortBy=relevancy&apiKey=555c602b336742d883598046fa557f30`
    ); // &searchIn=title
    const responseJSON = await response.json();
    // TO TEST WITHOUT API>
    //const responseJSON = { articles };
    prepareAdjectives(responseJSON);
    if (renderObj) {
      renderObj.remove();
    }
    renderObj = new p5(renderAdjectivesP5);
  }
  
  
  
  const search = document.getElementById('search');
  search.addEventListener('submit', getAPIData);
  */
export default resultsArr;
