window.onload = goToInputScreen

const screenContainer = document.getElementById('screen-container')
const startScreenTemplate = document.getElementById('start-screen')
const stopwatchScreenTemplate = document.getElementById('stopwatch-screen')

let interval = null;
let stopwatchCurrentValue;

function goToInputScreen() {
    if (interval) {
        clearInterval(interval)
        interval = null;
    }

    screenContainer.innerHTML = '';
    screenContainer.appendChild(startScreenTemplate.content.cloneNode(true))
}

function startStopwatch() {
    const hourlySalary = document.getElementById('salary-input').valueAsNumber || 20;
    const hourlySalaryPerMS = hourlySalary / 60 / 60 / 1000;

    screenContainer.innerHTML = ''
    screenContainer.appendChild(stopwatchScreenTemplate.content.cloneNode(true))

    const stopwatchStartValue = performance.now();

    interval = setInterval(() => {
        stopwatchCurrentValue = performance.now();
        const difference = stopwatchCurrentValue - stopwatchStartValue;

        const hours = Math.floor((difference / 1000 / 60 / 60)).toFixed(0)
        const minutes = Math.floor(((difference / 1000 / 60) - hours * 60)).toFixed(0)
        const seconds = Math.floor(((difference / 1000) - (hours * 60 * 60) - (minutes * 60))).toFixed(0)
        const milliseconds = Math.floor((difference - (hours * 60 * 60 * 1000) - (minutes * 60 * 1000) - (seconds * 1000))).toFixed(0)

        document.getElementById('stopwatch-salary').textContent = '$' + (hourlySalaryPerMS * difference).toFixed(2)
        document.getElementById('stopwatch-time').textContent = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}.${milliseconds.padStart(3, '0')}`
    }, 20)
}