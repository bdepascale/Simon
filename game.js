var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

const sleepSync = (ms) => {
  const end = new Date().getTime() + ms;
  while (new Date().getTime() < end) {
    /* do nothing */
  }
};

function nextSequence() {
  level++;
  $('#level-title').html('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern[0]);
  gamePattern.forEach((gameColor, i) => {
    setTimeout(() => {
      flashSound(gameColor);
    }, i * 500);
  });

  console.log('gamepattern is :');
  console.log(gamePattern);
}

function flashSound(buttonColor) {
  switch (buttonColor) {
    case 'red':
      $('#red').fadeOut(50).fadeIn(50);
      var audioRed = new Audio('sounds/red.mp3');
      audioRed.play();
      break;
    case 'blue':
      $('#blue').fadeOut(50).fadeIn(50);
      var audioBlue = new Audio('sounds/blue.mp3');
      audioBlue.play();
      break;
    case 'green':
      $('#green').fadeOut(50).fadeIn(50);
      var audioGreen = new Audio('sounds/green.mp3');
      audioGreen.play();
      break;
    case 'yellow':
      $('#yellow').fadeOut(50).fadeIn(50);
      var audioYellow = new Audio('sounds/yellow.mp3');
      audioYellow.play();
      break;
    default:
      break;
  }
}
function gameOver() {
  level = 0;
  $('#level-title').html('Game over! You lose!\n Press any key to restart');
  var audioGameOver = new Audio('sounds/wrong.mp3');
  audioGameOver.play();
  gamePattern = [];
  userClickedPattern = [];
}

$('.btn').on('click', function (event) {
  if (level > 0) {
    userChosenColor = event.currentTarget.id;
    userClickedPattern.push(userChosenColor);
    flashSound(event.currentTarget.id);
    console.log('userPattern is :');
    console.log(userClickedPattern);
    for (var i = 0; i < userClickedPattern.length; i++) {
      if (userClickedPattern[i] !== gamePattern[i]) {
        gameOver();
      } else if (userClickedPattern.length === gamePattern.length && i === gamePattern.length - 1) {
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
      }
    }
  }
});

$(document).on('keydown', function () {
  if (level === 0) {
    nextSequence();
  }
});
