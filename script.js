var gameArea = document.getElementsByClassName("game-area")[0];
var question = document.getElementsByClassName("question")[0];
var textArea = document.getElementsByClassName("text-area")[0];
var score = document.getElementsByClassName("score")[0];
var dashboard = document.getElementsByClassName("dashboard")[0];
var time = document.getElementsByClassName("time")[0];
var startBtn = document.getElementsByClassName("start-button")[0];
var heading = document.getElementsByClassName("heading")[0];
//var name = document.getElementById("name").value;
var levelNumber;
var ques;
var totalQuestions;
var i = 1;
var score = 0;
var scoreIncrement;
var count = 0;
var timer;
var countdown1, countdown2;
var quesTimer, anwTimer;
var names = new Object();

function submit() {
  totalQuestions = 0;
  document.getElementsByClassName("form")[0].style.display = "none";
  document.getElementsByClassName("playAgain")[0].style.display = "none";
  start();
}

function start() {
  clearInterval(quesTimer);
  clearInterval(anwTimer);
  levelNumber = 1;
  startGame();
}

function startGame() {
  totalQuestions = 0;
  document.getElementsByClassName("game-area")[0].style.display = "block";
  document.getElementsByClassName("check-answer")[0].style.display = "block";
  document.getElementsByClassName("playAgain")[0].style.display = "none";
  document.getElementsByClassName("time")[0].style.display = "block";
  console.log(document.getElementById("name").value);
  levelNumber = 1;
  gameArea.style.display = "block";
  //startBtn.style.display = "none";

  level(levelNumber);
  i = 1;
}

function level(levelNumber) {
  clearInterval(countdown1);
  clearInterval(countdown2);
  heading.innerHTML =
    "Level - " +
    levelNumber +
    "<br>" +
    "See the Question and try to memorize it." +
    "<br>" +
    "Once Question disappers, guess the question" +
    "<br>";
  if (levelNumber == 1) {
    timer = 5;
    scoreIncrement = 3;
  } else if (levelNumber == 2) {
    timer = 5;
    scoreIncrement = 3;
  } else if (levelNumber == 3) {
    timer = 3;
    scoreIncrement = 5;
  } else if (levelNumber > 3) {
    //gameArea.style.display = "none";
    console.log("reapeat");
    displayScoreBoard();
    levelNumber = 1;
    clearInterval(countdown2);
    clearInterval(countdown1);
    gameArea.style.display = "none";
  }
  console.log("hey");
  textArea.style.display = "none";
  ques = createQuestions(i);
  console.log(ques);
  document.getElementsByClassName("question")[0].innerHTML = ques;
  var quesTimer = setQuestionTimer(timer);
  if (i > 5) {
    console.log("dhsk");
    i = 1;
    console.log(i);
    levelNumber += 1;
    clearInterval(countdown2);
    clearInterval(countdown1);
    // level(levelNumber);
  }
}

function checkFunction() {
  console.log("ln-" + levelNumber);
  var values = checkAnswer(ques);
  document.getElementsByClassName("score")[0].innerHTML =
    "Score : " + values[0];
  document.getElementsByClassName("correctQuestions")[0].innerHTML =
    "Correct Questions : " + values[1] + " / " + values[2];
  clearInterval(countdown2);
  clearInterval(countdown1);

  i++;
  if (i > 5) {
    levelNumber++;
    i = 1;
  }
  level(levelNumber);
}

function randomNumber() {
  return Math.random()
    .toString()
    .slice(2, 12);
}

function createQuestions(i) {
  switch (i) {
    case 1:
      return question1();

    case 2:
      return question2();

    case 3:
      return question3();

    case 4:
      return question4();

    case 5:
      return question5();
  }
}

function question1() {
  var txt = "";
  for (var j = 0; j <= 9; j++) {
    j = randomNumber();
    txt += j;
  }
  return txt;
}

function question2() {
  var txt = "";
  var ascii;
  for (let i = 0; i < 9; i++) {
    ascii = Math.floor(Math.random() * 25) + 97;
    txt += String.fromCharCode(ascii);
  }

  return txt;
}

function question3() {
  var txt = "";
  var string = "0123456789abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 9; i++) {
    txt += string.charAt(Math.floor(Math.random() * string.length));
  }

  return txt;
}

function question4() {
  var txt = "";
  var string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 9; i++) {
    txt += string.charAt(Math.floor(Math.random() * string.length));
  }

  return txt;
}

function question5() {
  var txt = "";
  var high = 126;
  var low = 33;
  var ascii;
  for (let i = 0; i < 9; i++) {
    ascii = Math.floor(Math.random() * (high - low)) + low;
    txt += String.fromCharCode(ascii);
  }

  return txt;
}

function setQuestionTimer(timer) {
  var time = timer;
  document.getElementsByClassName("time")[0].textContent = time + "seconds";
  var seconds = document.getElementsByClassName("time")[0].textContent;
  countdown1 = setInterval(function() {
    time--;
    document.getElementsByClassName("time")[0].textContent = time + " seconds";
    if (time <= 0) {
      clearInterval(countdown1);

      document.getElementsByClassName("question")[0].innerHTML = "";
      textArea.style.display = "block";
      document.getElementById("text-area").value = "";
      var anwTimer = setAnswerTimer(timer);
    }
  }, 1000);
}

function setAnswerTimer(timer) {
  var time = timer;
  document.getElementsByClassName("time")[0].textContent = time + "seconds";
  var seconds = document.getElementsByClassName("time")[0].textContent;
  countdown2 = setInterval(function() {
    time--;
    document.getElementsByClassName("time")[0].textContent = time + " seconds";
    if (time <= 0) {
      clearInterval(countdown2);
      document.getElementsByClassName("question")[0].innerHTML = "";
      //textArea.style.display = "block";
      checkFunction();
    }
  }, 1000);
}

function checkAnswer(ques) {
  totalQuestions++;
  var answer = document.getElementById("text-area").value;
  if (answer.toUpperCase() == ques.toUpperCase()) {
    count++;
    score += scoreIncrement;
  } else if (answer == "") score = score;
  else if (answer != score) score -= scoreIncrement;
  return [score, count, totalQuestions];
}

function displayScoreBoard() {
  clearInterval(quesTimer);
  clearInterval(anwTimer);
  var output = "";
  //   gameArea.innerHTML +=
  //     document.getElementById("name").value +
  //     " " +
  //     score +
  //     " " +
  //     count +
  //     "/" +
  //     totalQuestions;

  if (names.hasOwnProperty(document.getElementById("name").value)) {
    var objValues = [];
    for (var o in names) {
      objValues.push(names[o]);
    }

    console.log(objValues[0][2]);
    totalQuestions = objValues[0][2] + totalQuestions;
    console.log(totalQuestions);
    if (objValues[0][0] < score) {
      console.log(score);
      names[document.getElementById("name").value] = [
        score,
        count,
        totalQuestions
      ];
    } else {
      names[document.getElementById("name").value] = [
        objValues[0][0],
        count,
        totalQuestions
      ];
    }
  } else
    names[document.getElementById("name").value] = [
      score,
      count,
      totalQuestions
    ];
  console.log(names);

  document.getElementsByClassName("check-answer")[0].style.display = "none";
  document.getElementsByClassName("time")[0].style.display = "none";
  document.getElementsByClassName("heading")[0];
  for (var prop in names) {
    output +=
      "<br>" +
      "Name - " +
      prop +
      "<br></br>" +
      "Details :" +
      "<br></br>" +
      " Score:" +
      names[prop][0] +
      "<br>" +
      "Correct Questions: " +
      names[prop][1] +
      "<br>" +
      "Total Questions: " +
      names[prop][2];
  }
  document.getElementsByClassName("heading")[0].innerHTML = output;
  document.getElementsByClassName("playAgain")[0].style.display = "block";
  clearInterval(countdown2);
  clearInterval(countdown1);
}

function restartGame() {
  //score = 0;
  document.getElementsByClassName("playAgain")[0].style.display = "none";
  totalQuestions = 0;
  document.getElementsByClassName("form")[0].style.display = "block";
  console.log("repeat");
  document.getElementsByClassName("score")[0].innerHTML = score;
  score = 0;
  clearInterval(countdown2);
  clearInterval(countdown1);
  levelNumber = 1;
  start();
}
