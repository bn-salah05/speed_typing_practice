import { GoogleGenerativeAI } from "@google/generative-ai";
import { displayText } from "./displayRefText.js";

let geminiText = "";

export default function fetchRemote_Gemini(topic, difficulty) {
    const genAI = new GoogleGenerativeAI("AIzaSyDXJR9jKGZC5a0YLvJyyM7ifJHDMjVUoBE");
//
    //AIzaSyDXJR9jKGZC5a0YLvJyyM7ifJHDMjVUoBE
    //AIzaSyAv98GGP8Q6yvaWOanJSchVbvRlggEejL8

    async function run() {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `generate a/an ${difficulty} level text about the topic ${topic} to practice speed typing. the response content must be simple without any formatting or styling. The generated text must be in the given topic's language`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        if (typeof text === "string") {
            geminiText = text;
            geminiText = geminiText.replace(/#\*/gm, "").trim()
            displayText(geminiText); // Directly call displayText after fetching
        }
    }

    run();
}

export { geminiText };