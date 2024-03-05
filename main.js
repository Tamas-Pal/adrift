import renderAdjectivesP5 from './src/sketch.js';
import p5 from 'p5';
// TO TEST WITHOUT API>
//import { articles } from './util/articles.json';
import  RiTa  from 'rita';

let renderObj;

function prepareAdjectives(responseJSON) {
  var resultsArr = [];
  // load articles fetched from news api
  console.log(responseJSON);
  const articles = responseJSON.articles;

  for (let i = 0; i < articles.length; i++) {
    // create token array from article titles (~ take apart for words)
    let tokensArr = RiTa.tokens(articles[i].title);
    // create part-of-speech array > https://rednoise.org/rita/reference/postags.html
    let posArr = RiTa.pos(tokensArr);

    // test for adjectives (`/jj/`), push in result array with article url
    for (let j = 0; j < posArr.length; j++) {
      if (/jj/.test(posArr[j])) {
        resultsArr.push([tokensArr[j], articles[i].url]);
      }
    }
  }
  // randomize order
  resultsArr.sort(() => 0.5 - Math.random());

  return resultsArr;
}

async function getAPIData() {
  const userInput = document.getElementById('input').value;
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${userInput}&language=en&sortBy=relevancy&apiKey=${
      import.meta.env.VITE_API_KEY
    }`
  );
  const responseJSON = await response.json();
  // TO TEST WITHOUT API>
  //const responseJSON = { articles };
  return responseJSON;
}

async function performSearch(event) {
  event.preventDefault();
  const responseJSON = await getAPIData();
  const resultsArr = prepareAdjectives(responseJSON);

  // P5
  if (renderObj) {
    renderObj.remove();
  }
  renderObj = new p5(renderAdjectivesP5);
  // set up intro animation
  renderObj.waveAnimator = 1;
  renderObj.isResultState = false;
  renderObj.resultsArr = resultsArr
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
search.addEventListener('submit', performSearch);

