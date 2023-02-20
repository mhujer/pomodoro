export interface PastPomodoro {
    startTime: number;
    endTime: number;
    didFinish: boolean;
}

let POMODORO_DURATION_SECONDS: number;
// @see https://webpack.js.org/guides/production/#specify-the-mode
if (process.env.NODE_ENV === 'production') {
    POMODORO_DURATION_SECONDS = 25 * 60;
} else {
    POMODORO_DURATION_SECONDS = 5;
}

export class PomodoroTimer {

    private _startTime: number | null = null;
    private _latestNow: number;

    private _pastPomodoros: PastPomodoro[] = [];
    private defaultPomodoroDurationSeconds;

    constructor(
        defaultPomodoroDurationSeconds = POMODORO_DURATION_SECONDS,
    ) {
        this.defaultPomodoroDurationSeconds = defaultPomodoroDurationSeconds;
        this._latestNow = Date.now();
    }

    startTimer() {
        if (this._startTime !== null) {
            throw new Error('Cannot start another pomodoro when one is already running!');
        }

        this._startTime = Date.now();
        this._latestNow = Date.now();
    }

    stopTimer() {
        if (this._startTime === null) {
            throw new Error('!');
        }
        this._latestNow = Date.now();

        this._pastPomodoros.push({
            startTime: this._startTime,
            endTime: this._latestNow,
            didFinish: false,
        });
        this._startTime = null;
    }

    tick() {
        if (this._startTime === null) {
            throw new Error('!');
        }

        this._latestNow = Date.now();

        const elapsedSeconds = (this._latestNow - this._startTime) / 1000;

        if (elapsedSeconds >= this.defaultPomodoroDurationSeconds) {
            this._pastPomodoros.push({
                startTime: this._startTime,
                endTime: this._latestNow,
                didFinish: true,
            });
            this._startTime = null;
        }
    }

    get startTime(): number | null {
        return this._startTime;
    }


    get latestNow(): number {
        return this._latestNow;
    }

    isPomodoroActive(): boolean {
        return this._startTime !== null;
    }

    getRemainingSeconds(): number | null {
        if (!this.isPomodoroActive()) {
            return null;
        }

        if (this._startTime === null) {
            throw new Error('!'); // @todo is checked by the condition above
        }

        const elapsedSeconds = (this._latestNow - this._startTime) / 1000;
        return this.defaultPomodoroDurationSeconds - elapsedSeconds;
    }

    get pastPomodoros(): PastPomodoro[] {
        return [...this._pastPomodoros]; //@todo deep clone
    }

    getDefaultPomodoroDurationSeconds(): number {
        return this.defaultPomodoroDurationSeconds;
    }
}
