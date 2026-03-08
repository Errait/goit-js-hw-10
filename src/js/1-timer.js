import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startButton = document.querySelector("button[data-start]");
startButton.disabled = true;

let userSelectedDate = null;

const timerFields = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        userSelectedDate = selectedDates[0];

        if (userSelectedDate <= new Date()) {
            iziToast.error({
                message: "Please choose a date in the future",
                position: "topRight",
                pauseOnHover: false,
                progressBar: false,
                closeOnClick: true,
                close: false,
            });
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    },
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

startButton.addEventListener("click", () => {
    const input = document.querySelector("#datetime-picker");

    startButton.disabled = true;
    input.disabled = true;

    let timerID = null;

    const startTimer = () => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate - currentTime;

        if (deltaTime <= 0) {
            clearInterval(timerID);
            updateTimerInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            startButton.disabled = false;
            input.disabled = false;
            return;
        }

        const time = convertMs(deltaTime);
        updateTimerInterface(time);
    };

    startTimer();
    timerID = setInterval(startTimer, 1000);
});

function updateTimerInterface({ days, hours, minutes, seconds }) {
    timerFields.days.textContent = String(days).padStart(2, "0");
    timerFields.hours.textContent = String(hours).padStart(2, "0");
    timerFields.minutes.textContent = String(minutes).padStart(2, "0");
    timerFields.seconds.textContent = String(seconds).padStart(2, "0");
}

flatpickr("#datetime-picker", options);
