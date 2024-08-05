// In displayRefText.js or wherever you update text content
import { localText } from "./fetchLocal.js";
import { wikiText } from "./fetchRemote_Wikimedia.js";
import { geminiText } from "./fetchRemote_Gemini.js";
import updateStats from "./statistics.js"
import {charss} from "./statistics.js";

const arabicAlphabet = [
    'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ',
    'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص',
    'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق',
    'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي',
    'ء', 'أ', 'إ', 'آ', 'ؤ', 'ئ', 'ة',
    'ى'
];

export let readyText = "";
export let spans = [];
export function formatText() {
    readyText = ""; // Ensure readyText is initialized as a string

    // Check if localText is a non-empty string
    if (typeof localText === "string" && localText.trim() !== "") {
        readyText = localText;
    } else {
        console.log("error fetching local text");
    }
    // Check if geminiText is a non-empty string
    if (typeof geminiText === "string" && geminiText.trim() !== "") {
        readyText = geminiText;
    } else {
        console.log("error fetching gemini text");
    }
    // Check if wikiText is a non-empty string
    if (typeof wikiText === "string" && wikiText.trim() !== "") {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = wikiText;

        for (const child of tempDiv.getElementsByTagName("p")) {
            readyText += child.textContent + " ";
        }

        // Perform the replacements on readyText
        readyText = readyText.replace(/\[\w+\]/g, " ");
        readyText = readyText.replace(/\*\w+/g, " ");
        readyText = readyText.replace(/\*\S+/g, " ");
        readyText = readyText.replace('–', "");

        readyText = readyText.trim();
    } else {
        console.log("error fetching wikipedia text");
    }

    return readyText;
}

export function displayText(text) {
    if (typeof text !== "string" || text.trim() === "") {
        return;
    }

    let formattedText = text;
    let words = formattedText.split(" ");
    if (formattedText && words) {
        updateStats(formattedText, words);
    }

    DOM_Main_Namespace.referenceText.innerHTML = ""; // Clear previous content

    spans = []; // Reset spans array
    let letterIndex = 0; // Global letter index
    let isArabic
    if (arabicAlphabet.includes(words[0][0])){
        isArabic = true
    } else {
        isArabic = false
    }
    for (let i = 0; i < words.length; i++) {
        let divWord = document.createElement("div");
        divWord.setAttribute("id", `word_${String(i).padStart(2, "0")}`);
        divWord.style.paddingInline = "3px";
        if (isArabic){
            DOM_Main_Namespace.referenceText.style.direction = "rtl";
        }
        DOM_Main_Namespace.referenceText.appendChild(divWord);



        // Process each letter in the word
        for (let j = 0; j < words[i].length; j++) {
            let spanLetter = document.createElement("span");
            spanLetter.textContent = words[i][j];
            spanLetter.setAttribute("id", `letter_${String(letterIndex).padStart(2, "0")}`);
            spanLetter.classList.add(`word_${String(i).padStart(2, "0")}`, 'textLetter');
            spans.push(spanLetter);
            divWord.appendChild(spanLetter);
            letterIndex++;
        }

        // Add a space after each word (except the last word)
        if (i < words.length - 1) {
            let spaceSpan = document.createElement("span");
            spaceSpan.textContent = " ";
            spaceSpan.setAttribute("id", `letter_${String(letterIndex).padStart(2, "0")}`);
            spaceSpan.classList.add('textLetter', 'space');
            spans.push(spaceSpan);
            DOM_Main_Namespace.referenceText.appendChild(spaceSpan);
            letterIndex++;
        }
    }

    return spans;
}