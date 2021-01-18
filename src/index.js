import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

class Timer {
    secondsPassed = 0
    isTimerStopped = true
    timerId = null

    constructor() {
        makeAutoObservable(this)
    }

    toggleTimer() {
        this.isTimerStopped = !this.isTimerStopped;
    }

    resetTimer() {
        this.secondsPassed = 0;
    }

    increaseTimer() {
        this.secondsPassed += 1;
    }
}

const myTimer = new Timer()

function timerStartStop(tmr) {
    if (tmr.isTimerStopped) {
        tmr.timerId = setInterval(() => {
            tmr.increaseTimer()
        }, 1000)
    } else {
        clearInterval(tmr.timerId)
    }
    tmr.toggleTimer()
}

function timerReset(tmr) {
    tmr.resetTimer()
}

const TimerView = observer(({ timer }) =>
    <div>
        <h2 className="my-4">
            Seconds passed: <span className={timer.isTimerStopped ? "text-primary" : ""}>
                {timer.secondsPassed}
            </span>
        </h2>
    </div>)

const TimerControls = ({ timer }) =>
    <div className="btn-group" role="group" aria-label="Timer controls">
        <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => timerStartStop(timer)}>
            Start / Stop
        </button>
        <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => timerReset(timer)}>
            Reset
        </button>
    </div>

const TimerWrapper = ({ timer }) =>
    <div>
        <h1 className="text-secondary">Simple Timer</h1>
        <TimerView {...{ timer }} />
        <TimerControls {...{ timer }} />
    </div>;

ReactDOM.render(<TimerWrapper timer={myTimer} />, document.getElementById("root"))
