"use strict";
// Get DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("submit-btn");
// Variables
let currentQuestionIndex = 0;
let score = 0;
// Example questions array
const questions = [
    {
        question: "What is 2 + 2?",
        answer: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false },
        ],
    },
    {
        question: "What is the capital of France?",
        answer: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ],
    },
];
// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
// Show the current question
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    currentQuestion.answer.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-button");
        button.dataset.correct = answer.correct.toString();
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}
// Handle answer selection
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    }
    else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        const btn = button;
        btn.disabled = true;
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
    });
    nextButton.style.display = "block";
}
// Reset the state for the next question
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// Handle the next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else {
        showScore();
    }
});
// Show the final score
function showScore() {
    resetState();
    questionElement.innerHTML = "Quiz Finished!";
    const scoreElement = document.createElement("div");
    scoreElement.innerHTML = `Your score: ${score} out of ${questions.length}`;
    answerButtons.appendChild(scoreElement);
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}
// Start the quiz
startQuiz();
