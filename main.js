import './style.css';
import renderAdjectivesP5 from './sketch.js';
import p5 from 'p5';
// TO TEST WITHOUT API>
// import { articles } from './articles.json';
var resultsArr = [];
let renderObj;

function prepareAdjectives(responseJSON) {
  const articles = responseJSON.articles;
  console.log(articles)
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
}
/*
var now = new Date();
var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
if (now.getSeconds() = 0) {

}*/


const search = document.getElementById('search');
search.addEventListener('submit', getAPIData);

export default resultsArr;

