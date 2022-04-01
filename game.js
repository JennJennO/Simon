var buttonColors = ["red", "blue", "green", "yellow"];

//The 1st array will store the id of each button randomly selected by the app
//The 2nd array will store the id of each button clicked by the user
var gamePattern = [];
var userClickedPattern = [];

//When the web page loads, the game is not yet started and on Level 0
var started = false;
var level = 0;

//The game will start on Level 1 when the user presses a key
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

//This function will store the id (color) of the button that was clicked
//The button id's will be stored in the userClickedPattern array
//Sounds will be played according to the button color chosen by the user
//The .btn css will be applied to buttons clicked by the user
//The index of the user's sequence will be passed into this function
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//This function checks the user's answer for accuracy
//The user's sequence must match the game's sequence for the current level
//The user's sequence length must also match the game's sequence length for the current level
//If the user's response is accurate, the next level (sequence) will be called after a 1000 millisecond delay
//When the next sequence is triggered, the user's response will reset to an empty array
//If the user's response is inaccurate, the program will prompt the user to restart the game
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over. Press Any Key to Restart.");

    startOver();
  }
}

//This function will store the pattern of buttons clicked by the user
//The game level counnt will be incremented by 1 and displayed in in the game title (h1)
//Random numbers 1-4 will be generated
//Random colors will be assigned to each generated number
//Each button will flash (fade in and out) when selected
//Sounds will be played according to the button chosen by the app
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

//This function will play a sound according to the button pressed / selected
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//This function will add the .pressed css to each button selected
//The .pressed css will be removed after 100 milliseconds
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//This function will reset the game level, sequence, and 'started' status
function startOver() {

  level = 0;
  gamePattern = [];
  started = false;

}
