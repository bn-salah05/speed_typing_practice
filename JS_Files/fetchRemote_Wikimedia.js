import { displayText } from "./displayRefText.js";

let wikiText = "";

export default function fetchRemote_Wikimedia(topic) {
    let xhr = new XMLHttpRequest();
    let url = `./APIs/fetch_article.php?topic=${encodeURIComponent(topic)}`;
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (typeof response === "string") {
                wikiText = response;
                displayText(wikiText); // Directly call displayText after fetching
            }
        }
    };

    xhr.send();
}

export { wikiText };
