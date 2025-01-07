var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").on("click", function (event) {
  var userChosenColor = event.target.id;
  var filePath = "./sounds/" + userChosenColor + ".mp3";
  var audio = new Audio(filePath);
  audio.play();
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
    level = 0;
    gamePattern = []
    userClickedPattern = [];
}

$("body").on("keydown", function(){
    startOver()
    nextSequence()});

function nextSequence() {
  var randomNum = Math.floor(Math.random() * 4);
  var buttonColors = ["red", "blue", "green", "yellow"];
  var randomChosenColor = buttonColors[randomNum];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut()
    .fadeIn();
  var filePath = "./sounds/" + randomChosenColor + ".mp3";
  var audio = new Audio(filePath);
  audio.play();
  level++;
  $("h1").html("Level: " + level);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(nextSequence, 1000);
        userClickedPattern = [];
    }
  } else {
    var filePath = "./sounds/wrong.mp3";
    var audio = new Audio(filePath);
    audio.play();
    $("body").addClass("game-over");
    $("h1").html("Game Over, Press Any Key to Restart");
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200);
  }
}
