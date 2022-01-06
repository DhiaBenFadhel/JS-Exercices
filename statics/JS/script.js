// challenge 1

function ageInDays(){
    var birthyear = prompt('What year were you born dude?');
    var ageindayss = (2020 - birthyear) * 365;
    var h1 = document.createElement('h1');
    var textanswer = document.createTextNode('So you are ' + ageindayss + ' days old')
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textanswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

// Challenge 2: Dog Generatore
function generateDog(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-dog-gen');
    image.src = "https://media.tenor.com/images/94083b8d53040467d21405a26ef2f453/tenor.gif"
    div.appendChild(image);
}
function Reset(){
    document.getElementById('generateDog').remove();
}

// Challenge 3: Rock, Paper, Scissor
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoise(randToRpsTnt());
    
    console.log('computer Choise:', botChoice);
    results = decideWinner( humanChoice, botChoice);
    
    console.log(results); 
    message = finalMessage(results);
    
    console.log(message); // u won
    
    rpsfrontEnd(yourChoice.id, botChoice, message); 
}
function randToRpsTnt() {
     return Math.floor(Math.random() * 3);
}
function numberToChoise(number) {
    return ['rock', 'paper', 'scissor'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock':{'scissor': 1, 'rock':0.5, 'paper':0},
        'paper':{'rock':1, 'paper':0.5, 'scissor':0},
        'scissor':{'paper':1, 'scissor':0.5, 'rock':0}
    };

    var yourScore = rpsDatabase[yourChoice] [computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if(yourScore === 0){
        return{'message': 'You lost', 'color': 'red'};
    }else if (yourScore === 0.5) {
        return{'message': 'You tied' , 'color': 'yellow'};
    }else{
        return{'message':'You Won !!!', 'color': 'green'};
    }
} 

function rpsfrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src

    }
    //lets remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = `<img src='${imagesDatabase[humanImageChoice]}' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233,1);'>`
    messageDiv.innerHTML= "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = `<img src='${imagesDatabase[botImageChoice]}' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243, 16, 16,1);'>`


    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

}   

//Challenge 4:
var all_buttons = document.getElementsByTagName('button'); 

var copyAllButtons = [];
for(let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}



function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === 'red') {
        buttonsRed();
    } else if (buttonThingy.value === 'green'){
        buttonsGreen();
    } else if(buttonThingy.value === 'reset') {
        buttonColorReset();
    } else if(buttonThingy.value === 'random'){
        RandomColors();
    }
}

function buttonsRed(){
    for(let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }     
}

function buttonsGreen(){
    for(let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }     
}

function buttonColorReset(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function RandomColors(){
    let choices = ['btn-primary', 'btn-sucees', 'btn-danger', 'btn-warning']

    for (let i=0; i < all_buttons.length; i++) {
        let randomNumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

//challenge 5: Blackjack
let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#Your-Box', 'score': 0},
    'Dealer': {'scoreSpan': '#Dealer-blackjack-result', 'div': '#Dealer-Box', 'score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2':2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'J': 10, 'Q': 10, 'A':[1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['Dealer'];

const hitSound = new Audio('statics/sounds/swish.mp3');
const winSound = new Audio('statics/sounds/cash.mp3');
const lostSound = new Audio('statics/sounds/aww.mp3');

document.querySelector("#Blackjack-Hit-Button").addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', blackjackStand);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit() {
    if(blackjackGame['isStand'] === false) {
        let card =  randomCard();
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'] [randomIndex];
}

function showCard(card, activePlayer) {
    if (activePlayer['score'] <=21) {
        let cardImage = document.createElement('img');
        cardImage.src = `statics/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal() {
    if (blackjackGame['turnsOver'] === true) {

        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector("#Your-Box").querySelectorAll('img');
        let dealerImages = document.querySelector("#Dealer-Box").querySelectorAll('img');

        for (let i=0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }

        for (let i=0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }
        
        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#Dealer-blackjack-result').textContent = 0;

        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#Dealer-blackjack-result').style.color = 'white';

        document.querySelector('#Blackjack-Result').textContent = "Let's play";
        document.querySelector('#Blackjack-Result').style.color = "black";

        blackjackGame['turnsOver'] = true;
    }
}

function updateScore(card, activePlayer) {
    if(card === 'A') {

        if (activePlayer['score'] + blackjackGame['cardsMap'] [card] [1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'] [card] [1];
        }else {
            activePlayer['score'] += blackjackGame['cardsMap'] [card] [0];
        }

    }else{  
        activePlayer['score'] += blackjackGame['cardsMap'] [card];
    }
} 

function showScore(activePlayer){
    if(activePlayer['score'] >21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else{    
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand() {
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true) {
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(500);
    }

    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}
   
//computing winner  and return who won
// update wins ,draws and losses
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        //condition: higher score than dealer or when dealer bust but you're 21 or under
        if (YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)) {
            blackjackGame['wins']++;
            winner = YOU;

        } else if (YOU['score'] < DEALER['score']) {
           blackjackGame['losses']++;
            winner = DEALER;

        } else if (YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }

    // condition: when user busts but dealer doesn't
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;

    // condition: you ANd the dealer busts
    } else if (YOU['score'] > 21 && DEALER['score'] > 21 ) {
        blackjackGame['draws']++;
    }

    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true) {

        if (winner === YOU) {
            document.querySelector('#Wins').textContent = blackjackGame['wins'];
            message = 'You Won!';
            messageColor = 'Green';
            winSound.play();
        
        } else if (winner === DEALER) {
            document.querySelector('#Losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lostSound.play();
        
        } else {
            document.querySelector('#Draws').textContent = blackjackGame['draws'];
            message = 'You drew!';
            messageColor = 'black';
        }

        document.querySelector('#Blackjack-Result').textContent = message;
        document.querySelector('#Blackjack-Result').style.color = messageColor;
    }
}




