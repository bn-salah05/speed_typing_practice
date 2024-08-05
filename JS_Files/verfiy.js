import {clearTimer, beforeStart, afterStart, time, time_units} from "./time_management.js";
import {charss, stats} from "./statistics.js";
import {spans} from "./displayRefText.js";

let inpCharacters = []
let correctChars = 0
let correctWords = 0

export function verify(inputValue) {
    if (inputValue.length > charss.length) {
        inputValue = inputValue.slice(0, charss.length);
        DOM_Main_Namespace.textInput.value = inputValue;
        endTypingTest();
        return;
    }

    inpCharacters = inputValue.split('');
    stats.inputChars = inpCharacters.length;
    DOM_Main_Namespace.inpCharsSpan.textContent = `${stats.inputChars.toString().padStart(2, "0")}`;

    correctChars = 0;
    correctWords = 0;
    let currentWordCorrect = true;

    for (let i = 0; i < inpCharacters.length; i++) {
        if (i < spans.length) {
            let color;
            if (inpCharacters[i] === spans[i].textContent) {
                color = "#00FA9A";
                correctChars++;
            } else {
                color = "red";
                currentWordCorrect = false;
                if (!spans[i].parentElement.classList.contains("false")) {
                    spans[i].parentElement.classList.add("false");
                }
            }
            spans[i].style.color = color;

            // Check for word completion
            if (spans[i].textContent === ' ' || i === spans.length - 1) {
                if (currentWordCorrect) correctWords++;
                currentWordCorrect = true;
            }
        }
    }

    for (let i = inpCharacters.length; i < spans.length; i++) {
        spans[i].style.color = "";
        spans[i].parentElement.classList.remove("false");
    }

    updateStatistics();

    if (inpCharacters.length === charss.length) {
        endTypingTest();
    }
}

function updateStatistics() {
    DOM_Main_Namespace.correctChars.textContent = correctChars;
    DOM_Main_Namespace.correctWords.textContent = correctWords;
    // WPM and time record will be updated in endTypingTest
}

function endTypingTest() {
    clearTimer(); // Stop the timer
    DOM_Main_Namespace.textInput.disabled = true; // Disable further input

    let accuracy = (correctChars / charss.length) * 100;
    let wpm = calculateWPM(correctChars, time_units);

    DOM_Main_Namespace.wpm.textContent = wpm.toFixed(2);
    DOM_Main_Namespace.time_record.textContent = formatTime(time_units);
    DOM_Main_Namespace.resultsContainer.classList.remove("hidden")
    console.log(`Test complete! Accuracy: ${accuracy.toFixed(2)}%, WPM: ${wpm.toFixed(2)}`);
    // You might want to display a completion message to the user here
}

function calculateWPM(charactersTyped, timeElapsed) {
    let words = charactersTyped / 5;
    let minutes = (timeElapsed.minutes + (timeElapsed.seconds / 60));
    return words / minutes;
}

function formatTime(timeUnits) {
    return `${String(timeUnits.minutes).padStart(2, '0')}:${String(timeUnits.seconds).padStart(2, '0')}`;
}

export default function start() {
    console.log("time started");
    window.timerId = setInterval(beforeStart, 1000);
    DOM_Main_Namespace.textInput.disabled = false;
    DOM_Main_Namespace.textInput.addEventListener("input", function() {
        verify(this.value);
    });


    DOM_Main_Namespace.correctChars.textContent = '0';
    DOM_Main_Namespace.correctWords.textContent = '0';
    DOM_Main_Namespace.wpm.textContent = '0.00';
    DOM_Main_Namespace.time_record.textContent = '00:00';

}

document.addEventListener("DOMContentLoaded", function() {
    DOM_Main_Namespace.startButton.addEventListener("click", start);
});