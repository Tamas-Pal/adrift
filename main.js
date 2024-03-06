import renderAdjectivesP5 from './src/sketch.js';
import p5 from 'p5';
import  RiTa  from 'rita';

let renderObj;

function prepareAdjectives(news) {
  var results = [];
  // load articles fetched from news api
  
  for (let i = 0; i < news.length; i++) {
    // create token array from article titles (~ take apart for words)
    let tokens = RiTa.tokens(news[i].title);
    // create part-of-speech array > https://rednoise.org/rita/reference/postags.html
    let positions = RiTa.pos(tokens);
    
    // test for adjectives (`/jj/`), push in result array with article url
    for (let j = 0; j < positions.length; j++) {
      if (/jj/.test(positions[j])) {
        results.push([tokens[j], news[i].url]);
      }
    }
  }
  
  console.log(results);
  // randomize order
  results.sort(() => 0.5 - Math.random());
  return results;
}

async function getAPIData() {
  const userInput = document.getElementById('input').value;
  const response = await fetch(
    `https://api.worldnewsapi.com/search-news?text=${userInput}&language=en&number=100&api-key=${
       import.meta.env.VITE_API_KEY
     }`
  );
  const responseJSON = await response.json();
  
  return responseJSON.news;
}

async function performSearch(event) {
  event.preventDefault();
  const news = await getAPIData();
  const results = prepareAdjectives(news);

  // P5
  if (renderObj) {
    renderObj.remove();
  }
  renderObj = new p5(renderAdjectivesP5);
  // set up intro animation
  renderObj.waveAnimator = 1;
  renderObj.isResultState = false;
  renderObj.results = results
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

