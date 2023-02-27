import { describe } from 'vitest';
import { getInitialState, pomodoroReducer } from './pomodoro-reducer';

describe('pomodoro reducer', () => {
    test('flow', () => {
        const startTime = 1676714400000;

        const state = getInitialState();
        expect(state).toEqual({
            isPomodoroActive: false,
            pastPomodoros: [],
            remainingSeconds: null,
            shouldPlayJingle: false,
            startTime: null,
        });

        pomodoroReducer(state, { type: 'START', now: startTime });
        expect(state).toEqual({
            isPomodoroActive: true,
            pastPomodoros: [],
            remainingSeconds: 5,
            shouldPlayJingle: false,
            startTime: 1676714400000,
        });

        pomodoroReducer(state, { type: 'TICK', now: startTime + 2000 }); // two seconds
        expect(state).toEqual({
            isPomodoroActive: true,
            pastPomodoros: [],
            remainingSeconds: 3,
            shouldPlayJingle: false,
            startTime: 1676714400000,
        });

        pomodoroReducer(state, { type: 'TICK', now: startTime + 5100 }); // 5.1 seconds
        expect(state).toEqual({
            isPomodoroActive: false,
            pastPomodoros: [
                {
                    didFinish: true,
                    endTime: 1676714405100,
                    startTime: 1676714400000,
                },
            ],
            remainingSeconds: null,
            shouldPlayJingle: true,
            startTime: null,
        });

        pomodoroReducer(state, { type: 'JINGLE_PLAYED' });
        expect(state).toEqual({
            isPomodoroActive: false,
            pastPomodoros: [
                {
                    didFinish: true,
                    endTime: 1676714405100,
                    startTime: 1676714400000,
                },
            ],
            remainingSeconds: null,
            shouldPlayJingle: false,
            startTime: null,
        });

        // start another pomodoro
        pomodoroReducer(state, { type: 'START', now: startTime + 6000 }); // 6 seconds
        expect(state).toEqual({
            isPomodoroActive: true,
            pastPomodoros: [
                {
                    didFinish: true,
                    endTime: 1676714405100,
                    startTime: 1676714400000,
                },
            ],
            remainingSeconds: 5,
            shouldPlayJingle: false,
            startTime: startTime + 6000,
        });

        // tick once
        pomodoroReducer(state, { type: 'TICK', now: startTime + 7000 }); // 7 seconds
        expect(state).toEqual({
            isPomodoroActive: true,
            pastPomodoros: [
                {
                    didFinish: true,
                    endTime: 1676714405100,
                    startTime: 1676714400000,
                },
            ],
            remainingSeconds: 4,
            shouldPlayJingle: false,
            startTime: 1676714406000,
        });

        // stop it early
        pomodoroReducer(state, { type: 'STOP', now: startTime + 8000 }); // 8 seconds
        expect(state).toEqual({
            isPomodoroActive: false,
            pastPomodoros: [
                {
                    didFinish: true,
                    endTime: 1676714405100,
                    startTime: 1676714400000,
                },
                {
                    didFinish: false,
                    endTime: 1676714408000,
                    startTime: 1676714406000,
                },
            ],
            remainingSeconds: null,
            shouldPlayJingle: false,
            startTime: null,
        });
    });
});
