export interface PastPomodoro {
    startTime: number;
    endTime: number;
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
        defaultPomodoroDurationSeconds = POMODORO_DURATION_SECONDS
    ) {
        this.defaultPomodoroDurationSeconds = defaultPomodoroDurationSeconds;
        this._latestNow = Date.now();
    }

    startTimer() {
        this._startTime = Date.now();
        this._latestNow = Date.now();
    }

    tick() {
        if (this._startTime === null) {
            throw new Error('!');
        }

        this._latestNow = Date.now();

        const elapsedSeconds = (this._latestNow - this._startTime) / 1000;

        if (elapsedSeconds >= POMODORO_DURATION_SECONDS) {
            this._pastPomodoros.push({
                startTime: this._startTime,
                endTime: this._latestNow,
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

    getRemainingSeconds(): number|null {
        if (!this.isPomodoroActive()) {
            return null;
        }

        if (this._startTime === null) {
            throw new Error('!'); // @todo is checked by the condition above
        }

        const elapsedSeconds = (this._latestNow - this._startTime) / 1000;
        return POMODORO_DURATION_SECONDS - elapsedSeconds;
    }

    get pastPomodoros(): PastPomodoro[] {
        return [...this._pastPomodoros]; //@todo deep clone
    }

    getDefaultPomodoroDurationSeconds(): number {
        return this.defaultPomodoroDurationSeconds;
    }
}
