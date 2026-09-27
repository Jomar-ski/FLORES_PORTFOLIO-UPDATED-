// ===============================
// PARTICLE BACKGROUND
// ===============================

const canvas = document.createElement("canvas");

canvas.id = "particles";

document.querySelector(".hero").appendChild(canvas);

const ctx = canvas.getContext("2d");

let particles = [];


function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


class Particle {

    constructor() {

        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.size = Math.random() * 2 + 1;

        this.speedX =
            (Math.random() - 0.5) * 0.5;

        this.speedY =
            (Math.random() - 0.5) * 0.5;

    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;


        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {

            this.speedX *= -1;

        }


        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {

            this.speedY *= -1;

        }

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#00f7ff";

        ctx.fill();

    }

}


function createParticles() {

    particles = [];

    const numberOfParticles = 100;


    for (
        let i = 0;
        i < numberOfParticles;
        i++
    ) {

        particles.push(
            new Particle()
        );

    }

}


function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(
        particle => {

            particle.update();
            particle.draw();

        }
    );


    requestAnimationFrame(animate);

}


createParticles();

animate();



// ===============================
// CALCULATOR
// ===============================

const miniCalculator =
    document.getElementById("miniCalculator");

const calcDisplay =
    document.getElementById("calcDisplay");


function openCalculator() {

    if (
        miniCalculator.style.display === "block"
    ) {

        miniCalculator.style.display = "none";

    } else {

        miniCalculator.style.display = "block";

    }

}


function addToDisplay(value) {

    if (
        calcDisplay.value === "0" ||
        calcDisplay.value === "Error"
    ) {

        calcDisplay.value = value;

    } else {

        calcDisplay.value += value;

    }

}


function clearCalculator() {

    calcDisplay.value = "0";

}


function deleteNumber() {

    if (
        calcDisplay.value.length > 1 &&
        calcDisplay.value !== "Error"
    ) {

        calcDisplay.value =
            calcDisplay.value.slice(0, -1);

    } else {

        calcDisplay.value = "0";

    }

}


function calculateResult() {

    try {

        const result = Function(
            "return " + calcDisplay.value
        )();

        calcDisplay.value = result;

    } catch {

        calcDisplay.value = "Error";

    }

}



// ===============================
// COLOR GUESSING GAME
// ===============================

const colorGame =
    document.getElementById("colorGame");

const colorTarget =
    document.getElementById("colorTarget");

const colorChoices =
    document.getElementById("colorChoices");

const colorMessage =
    document.getElementById("colorMessage");


const colors = [

    "#ff4d4d",
    "#00f7ff",
    "#4dff88",
    "#ffd24d",
    "#b84dff",
    "#ff66b3"

];


function openColorGame() {

    if (
        colorGame.style.display === "block"
    ) {

        colorGame.style.display = "none";

    } else {

        colorGame.style.display = "block";

        startColorGame();

    }

}


function startColorGame() {

    colorMessage.textContent =
        "Choose the correct color.";

    colorChoices.innerHTML = "";


    const shuffledColors =
        [...colors].sort(
            () => Math.random() - 0.5
        );


    const correctColor =
        shuffledColors[
            Math.floor(
                Math.random() *
                shuffledColors.length
            )
        ];


    colorTarget.style.background =
        correctColor;


    shuffledColors
        .slice(0, 3)
        .forEach(color => {


            const button =
                document.createElement("button");


            button.className =
                "color-choice";


            button.style.background =
                color;


            button.onclick = function () {


                if (
                    color === correctColor
                ) {

                    colorMessage.textContent =
                        "Correct! 🎉";

                } else {

                    colorMessage.textContent =
                        "Wrong! Try again.";

                }

            };


            colorChoices.appendChild(
                button
            );

        });

}



// ===============================
// GUESS THE NUMBER
// ===============================

const numberGame =
    document.getElementById("numberGame");

const numberGuess =
    document.getElementById("numberGuess");

const numberMessage =
    document.getElementById("numberMessage");

const numberAttempts =
    document.getElementById("numberAttempts");


let randomNumber = 0;

let attempts = 0;


function openNumberGame() {

    if (
        numberGame.style.display === "block"
    ) {

        numberGame.style.display = "none";

    } else {

        numberGame.style.display = "block";

        startNumberGame();

    }

}


function startNumberGame() {

    randomNumber =
        Math.floor(
            Math.random() * 100
        ) + 1;


    attempts = 0;


    numberAttempts.textContent =
        attempts;


    numberMessage.textContent =
        "Good luck!";


    numberGuess.value = "";

}


function checkNumberGuess() {

    const guess =
        Number(numberGuess.value);


    if (
        guess < 1 ||
        guess > 100 ||
        numberGuess.value === ""
    ) {

        numberMessage.textContent =
            "Please enter a number from 1 to 100.";

        return;

    }


    attempts++;


    numberAttempts.textContent =
        attempts;


    if (
        guess === randomNumber
    ) {

        numberMessage.textContent =
            "Correct! 🎉 You got it!";

    }

    else if (
        guess < randomNumber
    ) {

        numberMessage.textContent =
            "Too low! Try again.";

    }

    else {

        numberMessage.textContent =
            "Too high! Try again.";

    }

}



// ===============================
// MEMORY CARD GAME
// ===============================

const memoryGame =
    document.getElementById("memoryGame");

const memoryBoard =
    document.getElementById("memoryBoard");

const memoryScore =
    document.getElementById("memoryScore");


const memorySymbols = [

    "🍎",
    "🍌",
    "🍇",
    "🍊",

    "🍎",
    "🍌",
    "🍇",
    "🍊"

];


let firstCard = null;

let secondCard = null;

let lockBoard = false;

let matchedCards = 0;


function openMemoryGame() {

    if (
        memoryGame.style.display === "block"
    ) {

        memoryGame.style.display = "none";

    } else {

        memoryGame.style.display = "block";

        startMemoryGame();

    }

}


function startMemoryGame() {

    memoryBoard.innerHTML = "";

    firstCard = null;

    secondCard = null;

    lockBoard = false;

    matchedCards = 0;


    memoryScore.textContent = "0";


    const shuffledCards =
        [...memorySymbols].sort(
            () => Math.random() - 0.5
        );


    shuffledCards.forEach(
        symbol => {


            const card =
                document.createElement("button");


            card.className =
                "memory-card";


            card.textContent =
                symbol;


            card.onclick =
                function () {

                    flipMemoryCard(card);

                };


            memoryBoard.appendChild(
                card
            );

        }
    );

}


function flipMemoryCard(card) {

    if (
        lockBoard ||
        card === firstCard ||
        card.classList.contains("matched")
    ) {

        return;

    }


    card.classList.add("flipped");


    if (!firstCard) {

        firstCard = card;

        return;

    }


    secondCard = card;


    checkMemoryMatch();

}


function checkMemoryMatch() {

    const isMatch =
        firstCard.textContent ===
        secondCard.textContent;


    if (isMatch) {

        firstCard.classList.add(
            "matched"
        );

        secondCard.classList.add(
            "matched"
        );


        matchedCards++;


        memoryScore.textContent =
            matchedCards;


        resetMemoryTurn();


        if (
            matchedCards === 4
        ) {

            setTimeout(
                function () {

                    alert(
                        "Congratulations! You matched all the cards! 🎉"
                    );

                },
                300
            );

        }

    }

    else {

        lockBoard = true;


        setTimeout(
            function () {

                firstCard.classList.remove(
                    "flipped"
                );

                secondCard.classList.remove(
                    "flipped"
                );


                resetMemoryTurn();

            },
            800
        );

    }

}


function resetMemoryTurn() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}



// ===============================
// CHATBOT
// ===============================

const chatbotButton =
    document.getElementById(
        "chatbotButton"
    );

const chatbotWindow =
    document.getElementById(
        "chatbotWindow"
    );

const closeChatbot =
    document.getElementById(
        "closeChatbot"
    );

const chatbotInput =
    document.getElementById(
        "chatbotInput"
    );

const sendChat =
    document.getElementById(
        "sendChat"
    );

const chatbotMessages =
    document.getElementById(
        "chatbotMessages"
    );



// ===============================
// OPEN CHATBOT
// ===============================

chatbotButton.onclick =
    function () {

        chatbotWindow.style.display =
            "flex";

    };



// ===============================
// CLOSE CHATBOT
// ===============================

closeChatbot.onclick =
    function () {

        chatbotWindow.style.display =
            "none";

    };



// ===============================
// BOT RESPONSES
// ===============================

function getBotReply(message) {

    const text =
        message.toLowerCase();


    // GREETING

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return "Hi! 👋 I'm Jomar AI. You can ask me about Jomar, his skills, projects, or how to contact him.";

    }


    // ABOUT JOMAR

    if (
        text.includes("who are you") ||
        text.includes("about jomar") ||
        text.includes("who is jomar") ||
        text.includes("tell me about jomar")
    ) {

        return "Jomar Flores is an Information Technology student who is currently developing his programming and technical skills. He is interested in programming, web development, databases, and information technology.";

    }


    // AGE

    if (
        text.includes("age") ||
        text.includes("how old") ||
        text.includes("old are you")
    ) {

        return "Jomar is 20 years old and turning 21 this October 15. 🎂";

    }


    // SKILLS

    if (
        text.includes("skill") ||
        text.includes("programming") ||
        text.includes("technology")
    ) {

        return "Jomar has basic knowledge of Java, SQL, HTML, CSS, and JavaScript. He is continuously improving his programming and technical skills.";

    }


    // JAVA

    if (
        text.includes("java")
    ) {

        return "Jomar has a basic foundation in Java. He has practiced conditional statements, loops, Scanner input, and basic problem-solving programs.";

    }


    // SQL

    if (
        text.includes("sql") ||
        text.includes("database")
    ) {

        return "Jomar has basic SQL knowledge, including creating databases and tables, inserting records, and retrieving data using SQL queries.";

    }


    // WEB DEVELOPMENT

    if (
        text.includes("html") ||
        text.includes("css") ||
        text.includes("javascript") ||
        text.includes("web development")
    ) {

        return "Jomar is learning web development using HTML for structure, CSS for design, and JavaScript for interaction and functionality.";

    }


    // PROJECTS

    if (
        text.includes("project") ||
        text.includes("projects")
    ) {

        return "Jomar's projects include a Personal Portfolio Website, Java Programming Exercises, an SQL Database Project, a Basic Calculator, a Color Guessing Game, a Number Guessing Game, and a Memory Card Game.";

    }


    // PORTFOLIO

    if (
        text.includes("portfolio")
    ) {

        return "This portfolio website showcases Jomar's skills, achievements, projects, and technical learning journey.";

    }


    // CONTACT

    if (
        text.includes("contact") ||
        text.includes("email") ||
        text.includes("reach")
    ) {

        return "You can contact Jomar through his email: floresjomar284@gmail.com 📧";

    }


    // GOAL

    if (
        text.includes("goal") ||
        text.includes("future")
    ) {

        return "Jomar's goal is to continue learning and improve his programming, web development, database, and technical skills.";

    }


    // THANK YOU

    if (
        text.includes("thank you") ||
        text.includes("thanks")
    ) {

        return "You're welcome! 😊 Feel free to ask me anything about Jomar and his portfolio.";

    }


    // DEFAULT

    return "I'm not sure about that yet. 🤔 Try asking me about Jomar, his skills, projects, goals, or contact information.";

}



// ===============================
// QUICK QUESTIONS
// ===============================

function askQuestion(question) {

    chatbotInput.value =
        question;

    sendMessage();

}



// ===============================
// SEND MESSAGE
// ===============================

function sendMessage() {

    const message =
        chatbotInput.value.trim();


    if (
        message === ""
    ) {

        return;

    }


    // USER MESSAGE

    const userMessage =
        document.createElement("div");


    userMessage.className =
        "user-message";


    userMessage.textContent =
        message;


    chatbotMessages.appendChild(
        userMessage
    );


    // CLEAR INPUT

    chatbotInput.value = "";


    // TYPING INDICATOR

    const typingMessage =
        document.createElement("div");


    typingMessage.className =
        "bot-message typing";


    typingMessage.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;


    chatbotMessages.appendChild(
        typingMessage
    );


    // AUTO SCROLL

    chatbotMessages.scrollTop =
        chatbotMessages.scrollHeight;


    // BOT RESPONSE

    setTimeout(
        function () {

            typingMessage.remove();


            const botMessage =
                document.createElement("div");


            botMessage.className =
                "bot-message";


            botMessage.textContent =
                getBotReply(message);


            chatbotMessages.appendChild(
                botMessage
            );


            chatbotMessages.scrollTop =
                chatbotMessages.scrollHeight;


        },
        1500
    );

}



// ===============================
// SEND BUTTON
// ===============================

sendChat.onclick =
    sendMessage;



// ===============================
// ENTER KEY
// ===============================

chatbotInput.onkeydown =
    function (event) {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            sendMessage();

        }

    };