//import './style.css';
import renderAdjectivesP5 from './sketch.js';
import p5 from 'p5';
// TO TEST WITHOUT API>
import { articles } from './articles.json';
var resultsArr = [];
let renderObj;
//let countDown;
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

async function getAPIData(event) {
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
  renderObj.waveAnimator = 1;
  renderObj.isResultState = false;
  setTimeout(() => (renderObj.isResultState = true), 2000);
}
const infoDesc = document.querySelector('.info-desc');
const adriftLogo = document.querySelector('.a-logo');
const adriftLogoHidden = document.querySelector('.a-logo-hidden');
setTimeout(() => {
  adriftLogoHidden.classList.add('logo-transition');
adriftLogo.classList.add('logo-transition');
infoDesc.classList.add('info-desc-transition');
}, 1000); 

const info = document.querySelector('.info');
info.addEventListener('click', () => {
  document.querySelector('.info-desc').classList.toggle('hidden');
});

const search = document.getElementById('search');
search.addEventListener('submit', getAPIData);

export default resultsArr;
