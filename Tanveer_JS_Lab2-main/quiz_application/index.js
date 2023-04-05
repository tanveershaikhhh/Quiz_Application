// question component
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.inCorrectAnswer = function (choice) {
  return this.answer === choice;
};

// list of questions
let questions = [
  new Question(
    "Which of the following does Javascript support? ",
    ["Functions", "XHTML", "CSS", "HTML"],
    "Functions"
  ),
  new Question(
    "Which language is used for styling web pages?",
    ["HTML", "JQuery", "CSS", "XML"],
    "CSS"
  ),
  new Question(
    "Which is not a Javascript Framework?",
    ["Python Script", "JQuery", "Django", "NodeJS"],
    "Django"
  ),
  new Question(
    "Which is used to connect DB? ",
    ["PHP", "HTML", "JS", "All"],
    "PHP"
  ),
  new Question(
    "Javascript is a ______?",
    ["Language", "Programming Language", "Development", "All"],
    "Programming Language"
  ),
];

// quiz component
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function () {
  return this.questions[this.questionIndex];
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.questions.length;
};

Quiz.prototype.checkOptionWithAnswer = function (answer) {
  if (this.getQuestionByIndex().inCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

var quiz = new Quiz(questions);

// load questions
function loadQuestions() {
  //check if quiz ended
  if (quiz.isEnded()) {
    showscores();
  } else {
    //show questions
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionByIndex().text;

    //show choices
    var choices = quiz.getQuestionByIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var ele = document.getElementById("choice" + i);
      ele.innerHTML = choices[i];

      //add listners to the button
      handleOptionButton("btn" + i, choices[i]);
    }
    showProgress();
  }
}

function showscores() {
  var quizOverHtml = "<h1>Result</h1>";
  quizOverHtml +=
    "<h2 id ='score'> Your Score is: " +
    quiz.score +
    "/5. And mark percentage is: " +
    (quiz.score / quiz.questions.length) * 100 +
    " % " +
    "</h2>";

  var ele = document.getElementById("quiz");
  ele.innerHTML = quizOverHtml;
}

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML =
    "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function handleOptionButton(id, choice) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.checkOptionWithAnswer(choice);
    loadQuestions();
  };
}

loadQuestions();
