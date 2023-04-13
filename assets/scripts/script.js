// DOM elements for timer, score, start button, and other elements
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var start = document.querySelector("#start");
var codeIntro = document.querySelector("#quiz-start");
var questionsEl = document.querySelector(".all-question");
var questionEl = document.querySelector("#question");
var correctIncorrect = document.querySelector("#correct-incorrect");
var finalEl = document.querySelector("#final-score");
var initialsInput = document.querySelector("#initials");
var highscoresEl = document.querySelector("#high-scores");
var scoreListEl = document.querySelector(".score-list");
var submitScrBtn = document.querySelector("#submit-score");
var clearScrBtn = document.querySelector("#clearScores");
var viewScrBtn = document.querySelector("#view-scores");
var goBackBtn = document.querySelector("#goBack");
var ansBtn = document.querySelectorAll("button.answer-btn");

// Variables for time remaining, current question index, and score list
let secondsLeft = 60;
let questionCount = 0;
let scoreList = [];

// Array of quiz questions and answers
var questions = [
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        answers: ["0. var x = 10;", "1. let x = 10;", "2. const x = 10;", "3. All of the above"],
        correctAnswer: "3"
    },
    {
        question: "Which of the following statements is true regarding JavaScript data types?",
        answers: ["0. JavaScript has only one data type: var", "1. JavaScript has four primitive data types: string, number, boolean, and undefined", "2. JavaScript has three data types: object, array, and function", "3. JavaScript has two data types: object and array"],
        correctAnswer: "1"
    },
    {
        question: "What is the correct way to write a function in JavaScript?",
        answers: ["0. function: myFunction() { }", "1. myFunction() = function { }", "2. function myFunction() { }", "3. myFunction: function() { }"],
        correctAnswer: "2"
    },
    {
        question: "Which of the following is NOT a valid way to comment in JavaScript?",
        answers: ["0. /* This is a comment /", "1. // This is a comment", "2. <!-- This is a comment -->", "3. All of the above"],
        correctAnswer: "0"
    },
    {
        question: "How do you properly include an external JavaScript file in an HTML document?",
        answers: ["0. Using the <link> tag", "1. Using the <script> tag with the src attribute.", "2. Using the <style> tag", "3. Using the <meta> tag"],
        correctAnswer: "1"
    }
];



// Function to start the timer countdown
function setTime() {
    var timerInterval = setInterval(() => {
        secondsLeft--;
        time.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            score.textContent = secondsLeft;
        }
    }, 1000);
}

// Function to start the quiz
function startQuiz() {
    codeIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// Function to display the current question
function setQuestion(id) {
    if (id < questions.length) {
        var { question, answers } = questions[id];
        questionEl.textContent = question;
        answers.forEach((answer, index) => ansBtn[index].textContent = answer);
    }
}

// Function to check if the user's answer is correct and update the display
function checkAnswer(event) {
    event.preventDefault();
    correctIncorrect.style.display = "block";
    var p = document.createElement("p");
    correctIncorrect.appendChild(p);

    setTimeout(() => p.style.display = 'none', 1000);

    p.textContent = questions[questionCount].correctAnswer === event.target.value ? "Correct!" : "Incorrect!";
    if (p.textContent === "Incorrect!") secondsLeft -= 10;

    if (questionCount < questions.length) questionCount++;
    setQuestion(questionCount);
}

// Function to add the user's score to the score list
function addScore(event) {
    event.preventDefault();
    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    var init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    scoreList.sort((a, b) => b.score - a.score);
    scoreListEl.innerHTML = scoreList.map(item => `<li>${item.initials}: ${item.score}</li>`).join('');
    storeScores();
    displayScores();
}

// Function to store the score list in local storage
function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

// Function to display the score list from local storage
function displayScores() {
    var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));
    if (storedScoreList !== null) scoreList = storedScoreList;
}

// Function to clear the score list from local storage and the display
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML = "";
}

// Event listeners for buttons and actions
start.addEventListener("click", startQuiz);
ansBtn.forEach(item => item.addEventListener('click', checkAnswer));
submitScrBtn.addEventListener("click", addScore);
goBackBtn.addEventListener("click", () => {
    highscoresEl.style.display = "none";
    codeIntro.style.display = "block";
    secondsLeft = 60;
    time.textContent = `Time:${secondsLeft}s`;
});
clearScrBtn.addEventListener("click", clearScores);
viewScrBtn.addEventListener("click", () => { 
    if (highscoresEl.style.display === "none") {
    highscoresEl.style.display = "block";
} else {
    highscoresEl.style.display = "none";
}
});