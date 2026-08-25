import Sounds from './sounds.js'
const sounds = Sounds()

export function Timer({ minutesDisplay, secondsDisplay, resetControls }) {
    let timerTimeout
    let defaultMinutes = Number(minutesDisplay.textContent) || 25

    function updateDisplay(newMinutes, seconds) {
        newMinutes = newMinutes === undefined ? defaultMinutes : newMinutes
        seconds = seconds === undefined ? 0 : seconds
        minutesDisplay.textContent = String(newMinutes).padStart(2, '0')
        secondsDisplay.textContent = String(seconds).padStart(2, '0')
    }

    function countdown() {
        timerTimeout = setTimeout(function () {
            let seconds = Number(secondsDisplay.textContent)
            let minutes = Number(minutesDisplay.textContent)
            let isFinished = minutes <= 0 && seconds <= 0

            if (isFinished) {
                sounds.timeEnd()
                resetControls()
                updateDisplay()
                return
            }

            if (seconds <= 0) {
                seconds = 60
                --minutes
            }
            --seconds

            updateDisplay(minutes, seconds)
            countdown()
        }, 1000)
    }

    function plus() {
        const currentMinutes = Number(minutesDisplay.textContent)
        const currentSeconds = Number(secondsDisplay.textContent)
        const newMinutes = Math.min(currentMinutes + 5, 99)
        defaultMinutes = newMinutes
        updateDisplay(newMinutes, currentSeconds)
    }

    function minus() {
        const currentMinutes = Number(minutesDisplay.textContent)
        const currentSeconds = Number(secondsDisplay.textContent)
        const newMinutes = Math.max(currentMinutes - 5, 0)
        defaultMinutes = newMinutes
        updateDisplay(newMinutes, currentSeconds)
    }

    function reset() {
        clearTimeout(timerTimeout)
        updateDisplay(defaultMinutes, 0)
    }

    function hold() {
        clearTimeout(timerTimeout)
    }

    return {
        hold,
        reset,
        plus,
        minus,
        countdown
    }
}
