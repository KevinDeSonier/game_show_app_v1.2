const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const scoreboard = document.getElementById('scoreboard');
let missed = 0;

const startButton = document.getElementsByClassName('btn__reset')[0];
startButton.addEventListener('click', () => {
  overlay.style.display = 'none';
});

const phrases = [
  'Hello World',
  'Peanut Butter and Jelly',
  'Soft Shell Crab',
  'I know the GUAC is extra',
  'Said NO ONE ever'
];

function randomNumber(arr) {
  return Math.floor(Math.random() * arr.length);
}
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[randomNumber(arr)];
  return randomPhrase.split('');
}

function addPhraseToDisplay(arr) {
  const ul = phrase.querySelector('ul');
  for (let i = 0; i < arr.length; i++) {
    let char = arr[i];
    let li = document.createElement('li');
    li.textContent = char;
    if (char !== ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
    ul.append(li);
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(button) {
  const letters = document.getElementsByClassName('letter');
  let matchingLetter;
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    if (button.textContent === letter.textContent.toLowerCase()) {
      letter.className += ' show';
      matchingLetter = button.textContent;
    }
  }
  if (matchingLetter) {
    return matchingLetter;
  } else {
    return null;
  }
}

function checkWin() {
  const overlay = document.getElementById('overlay');
  let classOfLetter = document.getElementsByClassName('letter').length;
  let classOfShow = document.getElementsByClassName('show').length;
  if (classOfLetter === classOfShow) {
    overlay.style.display = '';
    overlay.className = 'win';
  } else if (missed === 5) {
    overlay.style.display = '';
    overlay.className = 'lose';
  }
}

qwerty.addEventListener('click', (e) => {
  let letterFound;
  if (e.target.tagName === 'BUTTON') {
    e.target.className = 'chosen';
    e.target.disabled = 'true';
    letterFound = checkLetter(e.target);
    console.log(letterFound);
  }
  if (letterFound === null) {
    missed += 1;
    console.log(missed);
    const ol = scoreboard.querySelector('ol');
    const li = ol.querySelector('li');
    ol.removeChild(li);
  }
  checkWin();
});
