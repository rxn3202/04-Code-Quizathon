// Var for timer   (global) 
var time = document.querySelector(".timer");
var score = document.querySelector("#score");
var secondsLeft = 75;

// Var for buttons (global )
var start = document.querySelector("#start");

// Var for intro/start
var codersIntro = document.querySelector("#challenge-begins");

// Var for call end load element
var questionsEl = document.querySelector(".all-question");

// Var for elements locations
let questionEl = document.querySelector("#question");
var correctWrong = document.querySelector("#right-wrong");
let questionCount = 0;


// Var for final score
var finalEl = document.querySelector("#final-score");
let initialsInput = document.querySelector("#initials");

// Var for Highscore 
var highscoresEl = document.querySelector("#high-scores");
let scoreListEl = document.querySelector(".score-list");
let scoreList = [];

// Var for answer button
var ansBtn = document.querySelectorAll("button.answer-btn")

// Var for submit, clear, view, goback
let submitScrBtn = document.querySelector("#submit-score");
let clearScrBtn = document.querySelector("#clearScores");
let viewScrBtn = document.querySelector("#view-scores");
let goBackBtn = document.querySelector("#goBack");


// Var for answers
var ans1Btn = document.querySelector("#answer-1");
var ans2Btn = document.querySelector("#answer-2");
var ans3Btn = document.querySelector("#answer-3");
var ans4Btn = document.querySelector("#answer-4");




// Array of five questions 
var questions = [ 
    {
        question: "Commonly used data types DO Not include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "2"
    },
    {
        question: "The condition in an if / else statement is enclosed within _______.",
        answers: ["1. quotes", "2. curly brackets", "3. parentheses", "4. square brackets"],
        correctAnswer: "1"
    },
    {
        question: "Arrays in Javascript can be used to store ______.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "3"
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: ["1. commmas", "2. curly brackets", "3. quotes", "4. parentheses"],
        correctAnswer: "2"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "3"
    }
];

// Start timer funtion  
function setTime() {
    let timerInterval = setInterval(function () {
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

// Begin quiz function
function startQuiz() {
    codersIntro.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

// Set question function
function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

// Event funtion to check answers
function checkAnswer(event) {
    event.preventDefault();

    // Creating elment of right or wrong
    correctWrong.style.display = "block";
    let p = document.createElement("p");
    correctWrong.appendChild(p);

    // Display new element for x amount of time
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    // Right or wrong answer conidtional statements - correct
    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } 
   
     // Right or wrong answer conidtional statements - wrong
    else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    // loop 
    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    // High scores sorting list
    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    // Storage of score
    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    // Parsing the JSON string to an object
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    // When retrieved from local, array
    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

// Clear the score
function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

// Start of event 
// Start timer and display first question when click start quiz
start.addEventListener("click", startQuiz);

// Check answer listener event
ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Adding a score event
submitScrBtn.addEventListener("click", addScore);

// Go back listener event function
goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    codersIntro.style.display = "block";
    secondsLeft = 75;
    time.textContent = `Time:${secondsLeft}s`;
});

// Clear score
clearScrBtn.addEventListener("click", clearScores);

// High score button alert and display listener event
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } 
    else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
    
    else {
        return alert("Hey. Take Quiz. There is No High Score.");
    }
});