import { Draft } from 'immer';

export interface PastPomodoro {
    startTime: number;
    endTime: number;
    didFinish: boolean;
}

export interface PomodoroState {
    isPomodoroActive: boolean;
    startTime: number | null;
    remainingSeconds: number | null;
    shouldPlayJingle: boolean;
    pastPomodoros: PastPomodoro[];
}

interface PomodoroStartAction {
    type: 'START';
    now: number;
}

interface PomodoroStopAction {
    type: 'STOP';
    now: number;
}

interface PomodoroTickAction {
    type: 'TICK';
    now: number;
}

interface JinglePlayedAction {
    type: 'JINGLE_PLAYED';
}

type PomodoroAction = PomodoroStartAction | PomodoroStopAction | PomodoroTickAction | JinglePlayedAction;

export let POMODORO_DURATION_SECONDS: number;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
if (process.env.NODE_ENV === 'production') {
    POMODORO_DURATION_SECONDS = 25 * 60;
} else {
    POMODORO_DURATION_SECONDS = 5;
}

export const pomodoroReducer = (pomodoroState: Draft<PomodoroState>, action: PomodoroAction): void => {
    switch (action.type) {
        case 'START': {
            pomodoroState.isPomodoroActive = true;
            pomodoroState.startTime = action.now;
            pomodoroState.remainingSeconds = POMODORO_DURATION_SECONDS;

            break;
        }

        case 'STOP': {
            if (pomodoroState.startTime === null) {
                throw new Error('!');
            }

            pomodoroState.pastPomodoros.push({
                startTime: pomodoroState.startTime,
                endTime: action.now,
                didFinish: false,
            });
            pomodoroState.isPomodoroActive = false;
            pomodoroState.startTime = null;
            pomodoroState.remainingSeconds = null;

            break;
        }

        case 'TICK': {
            if (pomodoroState.startTime === null) {
                throw new Error('!');
            }

            const elapsedSeconds = (action.now - pomodoroState.startTime) / 1000;

            if (elapsedSeconds >= POMODORO_DURATION_SECONDS) {
                pomodoroState.pastPomodoros.push({
                    startTime: pomodoroState.startTime,
                    endTime: action.now,
                    didFinish: true,
                });
                pomodoroState.isPomodoroActive = false;
                pomodoroState.startTime = null;
                pomodoroState.remainingSeconds = null;
                pomodoroState.shouldPlayJingle = true;
            } else {
                pomodoroState.remainingSeconds = POMODORO_DURATION_SECONDS - elapsedSeconds;
            }

            break;
        }

        case 'JINGLE_PLAYED': {
            pomodoroState.shouldPlayJingle = false;
            break;
        }

        default: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            throw new Error(`Uhandled "${action.type}"!`);
        }
    }
};

export const getInitialState = (): PomodoroState => {
    return {
        isPomodoroActive: false,
        startTime: null,
        remainingSeconds: null,
        shouldPlayJingle: false,
        pastPomodoros: [],
    };
};
