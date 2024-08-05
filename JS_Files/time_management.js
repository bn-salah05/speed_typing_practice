import {stats} from "./statistics.js";

export let time_units = {
    seconds: 5,
    minutes: 0,
    hours: 0
};
export let time;

export function clearTimer() {
    if (window.timerId) {
        clearInterval(window.timerId);
        window.timerId = null;
    }
}

export function beforeStart() {
    if (time_units.seconds > 0) {
        time = `${String(time_units.minutes).padStart(2, "0")}:${String(time_units.seconds).padStart(2, "0")}`;
        time_units.seconds -= 1;
        console.log("before start:" + time);
        DOM_Main_Namespace.spanTimer.textContent = time.toString();
    } else {
        clearTimer();
        // Start the afterStart timer when beforeStart is finished
        window.timerId = setInterval(afterStart, 1000);
    }

}

export function afterStart() {
    DOM_Main_Namespace.textInput.focus()
    time_units.seconds += 1

    if (time_units.seconds > 59) {
        time_units.seconds = 0;
        time_units.minutes += 1;
    }
    if (time_units.minutes > 59) {
        time_units.seconds = 0;
        time_units.minutes = 0;
        time_units.hours += 1;
    }

    if (time_units.hours > 0) {
        time = `${String(time_units.hours).padStart(2, "0")}:${String(time_units.minutes).padStart(2, "0")}:${String(time_units.seconds).padStart(2, "0")}`;
    } else {
        time = `${String(time_units.minutes).padStart(2, "0")}:${String(time_units.seconds).padStart(2, "0")}`;
    }
    DOM_Main_Namespace.spanTimer.textContent = time.toString();
    stats.timeRecord = `${time_units.minutes} minutes and ${time_units.seconds} seconds`
    console.log(time);
}

export function timeStop() {
    clearTimer();
}