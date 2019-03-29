/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

var cardMatch = [];
var moves = 0;
var timing;
let time = 0;
var begin = true;
let Stars = 3;
var matched = 0;
var stars = document.getElementsByClassName('fa-star');

function start_game() {
    var names = ['bicycle', 'leaf', 'cube', 'anchor', 'paper-plane-o','bicycle', 'bolt', 'bolt', 'bomb', 'diamond', 'leaf', 'diamond', 'anchor',  'paper-plane-o', 'bomb', 'cube']
    cards = shuffle(names);
    var block = document.getElementsByClassName('deck')[0];
    for (var index = 0; index < 16; index++) {
        block.innerHTML += '<li class="card"><i class="fa fa-' + cards[index] + '"></i></li>';
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

window.onload = function(){
    start_game();
  document.querySelector('.deck').addEventListener('click', managGame);
  document.querySelector('.restart').addEventListener('click', restartGame);
}
function managGame(){
      if (event.target.classList.contains('card') && cardMatch.length < 2){
        if (!event.target.classList.contains('match') && !cardMatch.includes(event.target)){ 
          moves++;
          document.querySelector('.moves').innerHTML = moves;
          if (begin){
            startTime(1);
            begin = false;
          }
          openCard(event.target);
          cardMatch.push(event.target); 
          if (cardMatch.length == 2){ 
            matchCard();
            checkScore();
          }
        }
      }
      if (matched == 8){
        gameOver();
      }
    
}

function openCard(clicked){
  clicked.classList.toggle("open"); 
  clicked.classList.toggle("show");
}

function manageTime(i){
    if(i==1){
            document.querySelector('.time').innerHTML = time;
    }else{
          clearInterval();
    }
}
function startTime(){
  time = 0;
  setInterval(myTimer, 1000);
}
function myTimer(){
    if(moves!=0){
            time++;
    manageTime(1);   
    }
}
var starW = 0;
function checkScore(){
      if (moves === 10 || moves === 20 || moves === 30){
          const starsl = document.getElementsByClassName('fa')[starW];
        starW++;
         // starsl.classList.remove('fa-star');
         starsl.style.display = 'none';

//          var list = document.getElementsByClassName('stars'); 
//          list.removeChild(list.childNodes[starW]);   

  }
}
function matchCard(){
  let card1 = cardMatch[0];
  let card2 = cardMatch[1];
  if (card1.firstElementChild.className === card2.firstElementChild.className){
    card2.classList.toggle('match');
    card1.classList.toggle('match');
    cardMatch = [];
    matched++; 
  }
  else{
      setTimeout(function(){
      openCard(card1);
      openCard(card2);
      cardMatch = [];
    }, 350);
  }
}
function restartGame(){
  let cards = document.querySelectorAll('ul.deck li');
  document.querySelector('.deck').innerHTML = "";
  moves = 0;
  document.querySelector('.moves').innerHTML = 0; 
  manageTime(2);
  start_game();
  begin = true;
  time = 0;
  manageTime(1);
}
function gameOver(){
 if (confirm("Congrats! you've done in "+ time+ "seconds")) {
        restartGame();
  } else {   
  }
  manageTime(2); 
  matched = 0; 
}

