var numberGuesser = (function() {
  var self = this,
    module = {

      min           : 1,
      max           : 10,
      winningNum    : 0,
      guessesLeft   : 3,
      game          : document.querySelector('#game'),
      minNum        : document.querySelector('.min-num'),
      maxNum        : document.querySelector('.max-num'),
      guessBtn      : document.querySelector('#guess-btn'),
      guessInput    : document.querySelector('#guess-input'),
      message       : document.querySelector('.message'),

      gameOver: function(won, msg) {
        let color;
        won === true ? color = 'green' : color = 'red';
        module.guessInput.disabled = true;
        module.setMessage(msg, color);
        module.guessBtn.value = 'Play Again';
        module.guessBtn.className += 'play-again';
      },
      getRandomNum: function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
      },
      setMessage: function(msg, color) {
        module.guessInput.style.borderColor = color;
        module.message.style.color = color;
        module.message.textContent = msg;
      },
      guessNumber: function(min, max) {
        let guess = parseInt(module.guessInput.value);
        if(isNaN(guess) || guess < module.min || guess > module.max){
          module.setMessage(`Please enter a number between ${module.min} and ${module.max}`, 'red');
        }
        if(guess === module.winningNum){
          module.gameOver(true, `${module.winningNum} is correct, YOU WIN!`);
        } else {
          module.guessesLeft -= 1;
          if(module.guessesLeft === 0){
            module.gameOver(false, `Game Over, you lost. The correct number was ${module.winningNum}`);
          } else {
            module.guessInput.value = '';
            module.setMessage(`${guess} is not correct, ${module.guessesLeft} guesses left`, 'red');
          }
        }
      },
      playAgain: function(e) {
        if(e.target.className === 'play-again'){
          window.location.reload();
        }
      },
      addListeners: function() {
        module.game.addEventListener('mousedown', module.playAgain);
        module.guessBtn.addEventListener('click', module.guessNumber);
      },
      initUI: function() {
        module.winningNum = module.getRandomNum(module.min, module.max);
        module.minNum.textContent = module.min;
        module.maxNum.textContent = module.max;
        module.addListeners();
      },
      init: function() {
        module.initUI();
        console.log('- numberGuesser initialized');
      }
  };
  return {
      init: module.init
  };
})();

document.addEventListener('DOMContentLoaded', numberGuesser.init());