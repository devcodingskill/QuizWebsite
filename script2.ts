// Define the structure of a question
interface Question {
    question: string;
    answer: { text: string; correct: boolean }[];
}

// Get DOM elements
const questionElement = document.getElementById("question") as HTMLElement;
const answerButtons = document.getElementById("answers-buttons") as HTMLElement;
const nextButton = document.getElementById("submit-btn") as HTMLButtonElement;

// Variables
let currentQuestionIndex: number = 0;
let score: number = 0;

// Example questions array
const questions: Question[] = [
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
function startQuiz(): void {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Show the current question
function showQuestion(): void {
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
function selectAnswer(e: Event): void {
    const selectedButton = e.target as HTMLButtonElement;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((button) => {
        const btn = button as HTMLButtonElement;
        btn.disabled = true;
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
}

// Reset the state for the next question
function resetState(): void {
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
    } else {
        showScore();
    }
});

// Show the final score
function showScore(): void {
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