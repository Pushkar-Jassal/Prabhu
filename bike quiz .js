//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 16;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "Look at this series: 2, 1, (1/2), (1/4), ... What number should come next?",
        options: ["(1/8)", "(1/3)", "(2/8)", "(1/16)"],
        correct: "(1/8)",
    },
    {
        id: "1",
        question: "SCD, TEF, UGH, ____, WKL",
        options: ["IJT", "VIJ", "UJI", "CMN"],
        correct: "VIJ",
    },
    {
        id: "2",
        question: "Which word does NOT belong with the others?",
        options: ["Inch", "Ounce", "Centimeter", "Yard"],
        correct: "Ounce",
    },
    {
        id: "3",
        question: "Eileen is planning a special birthday dinner for her husband's 35th birthday. She wants the evening to be memorable, but her husband is a simple man who would rather be in jeans at a baseball game than in a suit at a fancy restaurant. Which restaurant below should Eileen choose?",
        options: ["Alfredo's offers fine Italian cuisine and an elegant Tuscan decor. Patrons will feel as though they've spent the evening in a luxurious Italian villa", "Pancho's Mexican Buffet is an all-you-can-eat family style smorgasbord with the best tacos in town.", " The Parisian Bistro is a four-star French restaurant where guests are treated like royalty. Chef Dilbert Olay is famous for his beef bourguignon", " Marty's serves delicious, hearty meals in a charming setting reminiscent of a baseball clubhouse in honor of the owner,Marty Lester, a former major league baseball all-star."],
        correct: " Marty's serves delicious, hearty meals in a charming setting reminiscent of a baseball clubhouse in honor of the owner,Marty Lester, a former major league baseball all-star.",
    },
    {
        id: "4",
        question: " Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?.",
        options: ["7", "10", "12", "19"],
        correct: "10",
    },
    {
        id: "5",
        question: "B2CD, _____, BCD4, B5CD, BC6D",
        options: ["B2C2D", "BC3D", "B2C3D", "BCD7"],
        correct: "BC3D",
    }, {
        id: "6",
        question: "FAG, GAF, HAI, IAH, ____",
        options: ["JAK", "HAL", "HAK", "JAI"],
        correct: "JAK",
    },
    {
        id: "7",
        question: " Look at this series: F2, __, D8, C16, B32, ... What number should fill the blank?",
        options: ["A16", "G4", "E4", "E3"],
        correct: "E4",
    },
    {
        id: "8",
        question: "Look at this series: 664, 332, 340, 170, ____, 89, ... What number should fill the blank?",
        options: ["85", "97", "109", "178"],
        correct: "178",
    },
    {
        id: "9",
        question: "Look at this series: V, VIII, XI, XIV, __, XX, ... What number should fill the blank?",
        options: ["IX", "XXII", "XV", "XVII"],
        correct: "XVII",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 16;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1100);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 16;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};