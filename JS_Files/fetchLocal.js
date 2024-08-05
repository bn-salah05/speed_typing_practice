import { displayText } from "./displayRefText.js";

export let localText = "";

export default function fetchLocal(difficulty) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "./Local_Files/texts.json", true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const texts = JSON.parse(xhr.responseText);
            if (typeof texts[difficulty] === "string") {
                localText = texts[difficulty];
                displayText(localText); // Directly call displayText after fetching
            }
        }
    };

    xhr.send();
}
