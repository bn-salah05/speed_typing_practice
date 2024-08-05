import processPreferences from "./processPreferences.js";

const pref_Values_Namespace = {
    source: "defaultText",
    topic: undefined,
    difficulty: "easy"
};

function handlePrefChange(element) {
    pref_Values_Namespace[element.name] = element.value;
}

DOM_Pref_Namespace.radios.forEach(radio => {
    radio.addEventListener("change", function() {
        handlePrefChange(this);
        if (this.value === "wikipedia" || this.value === "gemini") {
            DOM_Pref_Namespace.topicInput.disabled = false;
            DOM_Pref_Namespace.topicInput.focus();
            DOM_Pref_Namespace.topicInput.addEventListener("input", function() {
                handlePrefChange(this);
            });
        }
    });
});

DOM_Pref_Namespace.topicInput.addEventListener("input", function() {
    handlePrefChange(this);
});

DOM_Pref_Namespace.diffSelect.addEventListener("change", function() {
    handlePrefChange(this);
});

DOM_Pref_Namespace.confirmButton.addEventListener("click", function() {
    let sourceSet = !!(pref_Values_Namespace.source);
    let topicSet = !!(pref_Values_Namespace.topic);
    let difficultySet = !!(pref_Values_Namespace.difficulty);

    if (!sourceSet) {
        DOM_Pref_Namespace.radios[0].focus();
        DOM_Pref_Namespace.sourceError.classList.remove("hidden");
    } else if ((pref_Values_Namespace.source === "wikipedia" || pref_Values_Namespace.source === "gemini") && !topicSet) {
        DOM_Pref_Namespace.topicInput.focus();
        DOM_Pref_Namespace.topicError.classList.remove("hidden");
    } else if (!difficultySet) {
        DOM_Pref_Namespace.diffSelect.focus();
        DOM_Pref_Namespace.difficultyError.classList.remove("hidden");
    } else {
        DOM_Pref_Namespace.prefContainer.style.display = "none";
        DOM_Main_Namespace.mainContainer.style.display = "block";
        processPreferences(pref_Values_Namespace);
    }
});
