import { PomodoroTimer } from './PomodoroTimer';

describe('PomodoroTImer', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('PomodoroTimer flow', () => {
        jest.setSystemTime(new Date('2023-02-18 10:00:00'));

        const pomodoroTimer = new PomodoroTimer(10);
        expect(pomodoroTimer.isPomodoroActive()).toBe(false);
        expect(pomodoroTimer.getRemainingSeconds()).toBeNull();
        expect(pomodoroTimer.startTime).toBeNull();
        expect(pomodoroTimer.getDefaultPomodoroDurationSeconds()).toBe(10);
        expect(pomodoroTimer.pastPomodoros).toMatchObject([]);

        pomodoroTimer.startTimer();
        expect(pomodoroTimer.isPomodoroActive()).toBe(true);
        expect(pomodoroTimer.getRemainingSeconds()).toBe(10);
        expect(pomodoroTimer.startTime).toBe(1676710800000);

        jest.setSystemTime(new Date('2023-02-18 10:00:04'));
        pomodoroTimer.tick();
        expect(pomodoroTimer.isPomodoroActive()).toBe(true);
        expect(pomodoroTimer.getRemainingSeconds()).toBe(6);

        jest.setSystemTime(new Date('2023-02-18 10:00:10'));
        pomodoroTimer.tick();
        expect(pomodoroTimer.isPomodoroActive()).toBe(false);
        expect(pomodoroTimer.getRemainingSeconds()).toBeNull();
        expect(pomodoroTimer.pastPomodoros).toMatchObject([
            { startTime: 1676710800000, endTime: 1676710810000 },
        ]);

        // another pomodoro
        pomodoroTimer.startTimer();
        expect(pomodoroTimer.isPomodoroActive()).toBe(true);
        expect(pomodoroTimer.getRemainingSeconds()).toBe(10);
        expect(pomodoroTimer.startTime).toBe(1676710810000);

        jest.setSystemTime(new Date('2023-02-18 10:00:20'));
        pomodoroTimer.tick();
        expect(pomodoroTimer.isPomodoroActive()).toBe(false);
        expect(pomodoroTimer.getRemainingSeconds()).toBeNull();
        expect(pomodoroTimer.pastPomodoros).toMatchObject([
            { startTime: 1676710800000, endTime: 1676710810000 },
            { startTime: 1676710810000, endTime: 1676710820000 },
        ]);

        // pomodoro can be stopped
        pomodoroTimer.startTimer();
        expect(pomodoroTimer.isPomodoroActive()).toBe(true);
        expect(pomodoroTimer.getRemainingSeconds()).toBe(10);
        expect(pomodoroTimer.startTime).toBe(1676710820000);

        jest.setSystemTime(new Date('2023-02-18 10:00:23'));
        pomodoroTimer.tick();
        expect(pomodoroTimer.isPomodoroActive()).toBe(true);
        expect(pomodoroTimer.getRemainingSeconds()).toBe(7);

        pomodoroTimer.stopTimer();
        expect(pomodoroTimer.isPomodoroActive()).toBe(false);
        expect(pomodoroTimer.getRemainingSeconds()).toBeNull();
        expect(pomodoroTimer.pastPomodoros).toMatchObject([
            { startTime: 1676710800000, endTime: 1676710810000 },
            { startTime: 1676710810000, endTime: 1676710820000 },
            { startTime: 1676710820000, endTime: 1676710823000 },
        ]);
    });

});
