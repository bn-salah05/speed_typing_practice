
let DOM_Pref_Namespace = {
    prefContainer: document.getElementById("prefContainer"),
    radios: document.getElementsByName("source"),
    sourceError: document.getElementById("sourceError"),
    topicInput: document.getElementById("topicSearch"),
    topicError: document.getElementById("topicError"),
    diffSelect: document.getElementById("difficulty"),
    difficultyError: document.getElementById("difficultyError"),
    confirmButton: document.getElementById("confirm")
}

let DOM_Main_Namespace = {
    mainContainer: document.getElementById("mainContainer"),
    referenceText: document.getElementById("reftext"),
    spanTimer: document.getElementById("timer"),
    startButton: document.getElementById("start"),
    textInput: document.getElementById("textinput"),
    inpCharsSpan: document.getElementById("inpchars"),
    totalWords: document.getElementById("totalwords"),
    totalChars: document.getElementById("totalchars"),
    resultsContainer: document.getElementById("resultsContainer"),
    correctChars: document.getElementById("correct_chars"),
    correctWords: document.getElementById("correct_words"),
    wpm: document.getElementById("wpm"),
    time_record: document.getElementById("time_record")
}

window.DOM_Pref_Namespace = DOM_Pref_Namespace;
window.DOM_Main_Namespace = DOM_Main_Namespace;

