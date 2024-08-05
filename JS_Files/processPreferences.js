import fetchLocal from "./fetchLocal.js";
import fetchRemote_Wikimedia from "./fetchRemote_Wikimedia.js";
import fetchRemote_Gemini from "./fetchRemote_Gemini.js";

export default function processPreferences(object) {
    //console.log(object.source)
    switch (object.source) {
        case "defaultText":
            fetchLocal(object.difficulty);
            break;
        case "wikipedia":
            fetchRemote_Wikimedia(object.topic, object.difficulty);
            break;
        case "gemini":
            fetchRemote_Gemini(object.topic, object.difficulty);
            break;
        default:
            window.reload();
    }

}