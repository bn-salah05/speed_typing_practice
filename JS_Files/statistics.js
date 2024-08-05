export let charss
export let stats
export default function updateStats(formattedText, words) {
    let characters = formattedText.trim().split("");

    //let words = readyText.trim().split(" ").filter(word => word !== "");
    charss = characters

    stats = {
        totalChars: characters.length,
        totalWords: words.length,
        inputChars: 0,
        timeRecord: 0
    };
    /*console.log("characters: ")
    console.log(characters)
    console.log("words: ")
    console.log(words)*/
    DOM_Main_Namespace.totalWords.textContent = stats.totalWords.toString();
    DOM_Main_Namespace.totalChars.textContent = stats.totalChars.toString();
    return stats
}
