// random dice values for player 1 and player 2
let randomDice1, randomDice2, textToBePrinted;

// elements
const rollBtn = document.querySelector('.roll_btn');
const firstPlayerDiceCircles = document.querySelectorAll('.first_player .dice_circle');
const secondPlayerDiceCircles = document.querySelectorAll('.second_player .dice_circle');
const title = document.querySelector('.title');

// functions
const updateTitle = (winner) => {
  /* Updates the title based on the result of the roll */

  // save original title text
  const titleOriginalText = title.innerContent;
  switch (winner) {
    case 'Player 1':
      title.innerHTML = '<img class="flag" src="./images/red-flag.png" alt="flag" /> Player 1 Wins!';
      break;
    case 'Player 2':
      title.innerHTML = 'Player 2 Wins! <img class="flag" src="./images/red-flag.png" alt="flag" />';
      break;
    case 'Draw':
      title.innerHTML = 'Its a Draw!';
      break;
    case 'Reset':
      title.innerHTML = titleOriginalText;
      break;
    default:
      break;
  }
};

const resetDice = () => {
  /* Resets the game to the initial state */

  // resets texts array
  textToBePrinted = [];

  // resets first player dice to its initial state
  firstPlayerDiceCircles.forEach((diceCircle, index) => {
    if (index === 3) {
      diceCircle.classList.remove('hide');
    } else {
      diceCircle.classList.add('hide');
    }
  });

  // resets second player dice to its initial state
  secondPlayerDiceCircles.forEach((diceCircle, index) => {
    if (index === 3) {
      diceCircle.classList.remove('hide');
    } else {
      diceCircle.classList.add('hide');
    }
  });
};

const updateDice = (player, diceValue, diceCircles) => {
  /* Updates the displayed value on each dice */

  // pushes the text to be logged into the array
  textToBePrinted.push(player + ' rolled ' + diceValue);

  // shows or hides the dice circles based on dice value
  diceCircles.forEach((diceCircle, index) => {
    if (diceValue === 1) {
      if (index === 3) diceCircle.classList.remove('hide');
      else diceCircle.classList.add('hide');
    } else if (diceValue === 2) {
      if (index === 1 || index === 5) diceCircle.classList.remove('hide');
      else diceCircle.classList.add('hide');
    } else if (diceValue === 3) {
      if (index === 1 || index === 5 || index === 3) diceCircle.classList.remove('hide');
      else diceCircle.classList.add('hide');
    } else if (diceValue === 4) {
      if (index === 0 || index === 1 || index === 5 || index === 6) diceCircle.classList.remove('hide');
      else diceCircle.classList.add('hide');
    } else if (diceValue === 5) {
      if (index === 2 || index === 4) diceCircle.classList.add('hide');
      else diceCircle.classList.remove('hide');
    } else if (diceValue === 6) {
      if (index === 3) diceCircle.classList.add('hide');
      else diceCircle.classList.remove('hide');
    }
  });
};

const updateDices = () => {
  // making sure that the dices are in their initial state
  resetDice();

  // checking if the first dice value is between 1 and 6
  if (randomDice1 >= 1 && randomDice1 <= 6) {
    updateDice('First Player', randomDice1, firstPlayerDiceCircles);
  }

  // checking if the second dice value is between 1 and 6
  if (randomDice2 >= 1 && randomDice2 <= 6) {
    updateDice('Second Player', randomDice2, secondPlayerDiceCircles);
  }
  console.log(textToBePrinted.join(' '));
};

const rollDice = () => {
  /* Generating 2 random values */
  randomDice1 = Math.floor(Math.random() * 6) + 1;
  randomDice2 = Math.floor(Math.random() * 6) + 1;
};

const resetGame = () => {
  /* Reseting the game to its initial state */
  updateTitle('Reset');
  resetDice();
};

const handleRollDice = () => {

  // creating the shrinking effect of the button after its being clicked
  rollBtn.style.transform = 'scale(0.9)';
  rollBtn.style.backgroundColor = '#48967c';

  // returning the button to its original state after 0.1 seconds
  setTimeout(() => {
    rollBtn.style.transform = 'scale(1)';
    rollBtn.style.backgroundColor = '#65cfac';
  }, 100);

  // making sure the game in its initial state
  resetGame();

  // generating the dice values
  rollDice();

  // showing the numbers on the dice
  updateDices();

  // displaying title text based on the result of the roll
  if (randomDice1 > randomDice2) updateTitle('Player 1');
  else if (randomDice1 < randomDice2) updateTitle('Player 2');
  else updateTitle('Draw');
};

// event listners
rollBtn.addEventListener('click', handleRollDice);