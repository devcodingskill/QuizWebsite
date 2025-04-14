//alert("test");
//Setting the question
const question = [
    {
        question: "What is the capital of France?", answer:
            [
                { text: "Paris", correct: true },
                { text: "London", correct: false },
                { text: "Berlin", correct: false },
                { text: "Madrid", correct: false }
            ]
    },
    {
        question: "What is the largest planet in our solar system?", answer:
            [
                { text: "Earth", correct: false },
                { text: "Jupiter", correct: true },
                { text: "Mars", correct: false },
                { text: "Saturn", correct: false }
            ]
    },
    {
        question: "What is the chemical symbol for gold?", answer:
            [
                { text: "Au", correct: true },
                { text: "Ag", correct: false },
                { text: "Fe", correct: false },
                { text: "Pb", correct: false }
            ]
    }
    ,
    {
        question: "What is the largest mammal in the world?", answer:
            [
                { text: "Elephant", correct: false },
                { text: "Blue Whale", correct: true },
                { text: "Giraffe", correct: false },
                { text: "Great White Shark", correct: false }
            ]
    },
    {
        question: "What is the smallest country in the world?", answer:
            [
                { text: "Vatican City", correct: true },
                { text: "Monaco", correct: false },
                { text: "Nauru", correct: false },
                { text: "Malta", correct: false }
            ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("submit-btn");

let currentQuestionIndex = 0;
let score = 0;
let totalQuestions = question.length;
let correctAnswers = 0;
let incorrectAnswers = 0;

//Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
//Show the question
function showQuestion() {
    resetState();
    //Check if the quiz is finished
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-button");
        answerButtons.appendChild(button);

        if(answer.correct) {
            button.dataset.correct = answer.correct;            
        }
        //add event listener to the button
        button.addEventListener("click", selectedAnswer)
    });
}
//check the answer if the answer is correct or not 
//and add the class to the button to show the correct answer or not
function selectedAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct=== "true";
    if(isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    }
    else {
        selectedButton.classList.add("incorrect");
    }
    //Disable all buttons after selecting an answer
    //And show the correct answer if the answer is incorrect
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });
    //show the next button
    nextButton.style.display = "block";
}

//Reset the state
function resetState() {
    nextButton.style.display = "none";
    //Remove child all answer buttons
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

nextButton.addEventListener("click", nextQuestion);

//Next question function
function nextQuestion() {
    
    if (currentQuestionIndex < question.length) {
        handleNextQuestion();
    } else {        
        startQuiz();
    }
}

//Handle the next question
function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

//Show the score
function showScore() {
    resetState();
    questionElement.innerHTML = "Quiz Finished!";
    const scoreElement = document.createElement("div");
    scoreElement.innerHTML = `Your score: ${score} out of ${totalQuestions}`;
    answerButtons.appendChild(scoreElement);
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
}

startQuiz();