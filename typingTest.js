'use strict'
/* ------------- SELECTING THE ELEMENTS ---------------- */

const timerSeconds = document.querySelector('#timer-seconds')
const restartBtn = document.querySelector('.restart-btn')
const textContent = document.querySelector('#text-content')
const userTypingArea = document.querySelector('#typing-area')
const subCont2 = document.querySelector('.subcontainer-2')
const netWPMDisplay = document.querySelector('#netWPM')
const resultsDisplayBox = document.querySelector('.results-display')
const correctKeystrokes = document.querySelector('#ckey')
const correctWords = document.querySelector('#cwords')
const incorrectKeystrokes = document.querySelector('#inckey')
const incorrectWords = document.querySelector('#incwords')
const accuracyDisplay = document.querySelector('#acc')
const grossWPMDisplay = document.querySelector('#grossWPM')


/* ------------- TEXT DATA FOR TYPING ------------------ */

const textData = ["Many people say that life isnt like a bed of roses I beg to differ",
    "I think that life is quite like a bed of roses",
    "Just like life a bed of roses looks pretty on the outside but when youre in it",
    "you find that it is nothing but thorns and pain",
    "She had made it especially for him so he would have forced it down even if he had absolutely hated it",
    "That's simply the way things worked",
    "She made him a new fangled drink each day and he took a sip of it and smiled saying it was excellent",
    "She doesnt have anything to prove but she is going to anyway",
    "She knows she doesnt have to but she still will just to show you that she can",
    "We all already know this and you will too",
    "The young man wanted a role model",
    "He looked long and hard in his youth but that role model never materialized",
    "The mere fact that you exist makes you extraordinary"
]



/* --------------- IMPLEMENTING TIMER ------------------ */

let starterSeconds = 60;

let timer = setInterval(() => {
    starterSeconds -= 1;
    timerSeconds.textContent = `0:${starterSeconds}`;
    if (starterSeconds < 10) {
        timerSeconds.textContent = `0:0${starterSeconds}`;
    }
    if (timerSeconds.textContent == `0:00`) {
        clearInterval(timer);

        // window.open("results.html");
        // console.log(grossWPM);
    }
}, 1000)


restartBtn.addEventListener('click', () => {
    // starterSeconds = 60;
    // timerSeconds.textContent = `1:00`
    window.location.reload();
})


/* ---------------- DISPLAYING THE TEXT -------------------- */

let textIndex = 0;

function displayText(index) {
    // 'textContent' is the text that is displayed on the screen
    textContent.textContent = "";

    const currentDisplayedText = textData[index];
    currentDisplayedText.split('').forEach((character) => {
        const charSpanElement = document.createElement('span')
        charSpanElement.innerText = character
        textContent.appendChild(charSpanElement)
    })
}

displayText(textIndex);


/* -------------- HANDLING USER TYPED TEXT ----------------- */

let totalNumOfErrors = 0;
let typedCharacters = 0;
let accuracy = 0;
let errors = 0;
let correctCharacters = 0;

userTypingArea.addEventListener("input", () => {
    const userInput = userTypingArea.value;
    const userInputArr = userInput.split('');
    // console.log(userInputArr);
    const characterSpansArr = document.querySelectorAll('span')

    typedCharacters += 1;

    errors = 0;

    characterSpansArr.forEach((charSpan, index) => {
        let typedChar = userInputArr[index]
        if (typedChar == null) {
            charSpan.classList.remove('correct-char')
            charSpan.classList.remove('incorrect-char')
        } else if (typedChar == charSpan.innerText) {
            charSpan.classList.add('correct-char')
        } else {
            charSpan.classList.add('incorrect-char')
            errors += 1;
        }
    })
    let correctCharacters = typedCharacters - (totalNumOfErrors + errors);
    accuracy = (correctCharacters / typedCharacters) * 100;
    let truncAccuracy = parseFloat(accuracy.toFixed(2));
    console.log(errors, starterSeconds);
    // console.log(totalNumOfErrors, errors, correctCharacters, truncAccuracy);

    // console.log(typedCharacters);

    if (characterSpansArr.length == userInputArr.length) {
        textIndex += 1;
        displayText(textIndex);
        userTypingArea.value = "";
        totalNumOfErrors += errors;
    }

    if (starterSeconds == 0) {
        subCont2.classList.add('off');
        userTypingArea.classList.add('off');
        resultsDisplayBox.classList.add('on')
        let grossWPM = typedCharacters / 5;
        let netWPM = Math.ceil(grossWPM - (totalNumOfErrors + errors));

        netWPMDisplay.textContent = netWPM + " WPM";
        // grossWPMDisplay.textContent = Math.ceil(grossWPM) + " WPM";
        correctWords.textContent = Math.ceil(correctCharacters / 5);
        incorrectWords.textContent = Math.floor((totalNumOfErrors + errors) / 5);
        correctKeystrokes.textContent = correctCharacters;
        incorrectKeystrokes.textContent = totalNumOfErrors + errors;
        accuracyDisplay.textContent = truncAccuracy + "%";

        console.log("Gross WPM: " + grossWPM);
        console.log("NET WPM: " + netWPM);
        console.log("Correct Words: " + correctCharacters / 5);
        console.log("Incorrect Words: " + (grossWPM - (correctCharacters / 5)));

    }
})