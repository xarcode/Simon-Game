const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameState = false;
var level = 0;
var userClickCount = 0;

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  userClickCount++;

  if (!checkAnswer(userChosenColour, userClickCount - 1)) return;

  if (userClickCount == level) {
    setTimeout(() => {
      userClickCount = 0;
      userClickedPattern = [];
      nextSequence();
    }, 1000);
  }
});

$(document).keypress(function (e) {
  if (!gameState) {
    gameState = true;
    nextSequence();
  }
});

function checkAnswer(currentColor, currentStep) {
  if (gamePattern[currentStep] != currentColor) {
    resetGame();
    return false;
  }

  return true;
}

function resetGame() {
  playSound("wrong");

  setTimeout(() => {}, 100);

  $("#level-title").html("Press A Key to Start");
  userClickCount = 0;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameState = false;
}

function animatePress(currentColor) {
  $("#" + currentColor).toggleClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).toggleClass("pressed");
  }, 100);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  level += 1;
  $("#level-title").html("Level " + level);
}
