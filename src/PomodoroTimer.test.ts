import { PomodoroTimer } from './PomodoroTimer';
import { afterEach, beforeEach, describe, expect, vi, it } from 'vitest';

describe('PomodoroTimer', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('PomodoroTimer flow', () => {
        vi.setSystemTime(new Date('2023-02-18 10:00:00 UTC'));

        const pomodoroTimer = new PomodoroTimer(10);
        expect(pomodoroTimer.isPomodoroActive()).toBe(false);
        expect(pomodoroTimer.getRemainingSeconds()).toBeNull();
        expect(pomodoroTimer.startTime).toBeNull();
        expect(pomodoroTimer.getDefaultPomodoroDurationSeconds()).toBe(10);
        expect(pomodoroTimer.pastPomodoros).toEqual([]);

        pomodoroTimer.startTimer();
        expect(pomodoroTimer.isPomodoroActive()).toBe(true);
        expect(pomodoroTimer.getRemainingSeconds()).toBe(10);
        expect(pomodoroTimer.startTime).toBe(1676714400000);

        vi.setSystemTime(new Date('2023-02-18 10:00:04 UTC'));
        pomodoroTimer.tick();
        expect(pomodoroTimer.isPomodoroActive()).toBe(true);
        expect(pomodoroTimer.getRemainingSeconds()).toBe(6);

        vi.setSystemTime(new Date('2023-02-18 10:00:10 UTC'));
        pomodoroTimer.tick();
        expect(pomodoroTimer.isPomodoroActive()).toBe(false);
        expect(pomodoroTimer.getRemainingSeconds()).toBeNull();
        expect(pomodoroTimer.pastPomodoros).toEqual([
            { startTime: 1676714400000, endTime: 1676714410000, didFinish: true },
        ]);

        // another pomodoro
        pomodoroTimer.startTimer();
        expect(pomodoroTimer.isPomodoroActive()).toBe(true);
        expect(pomodoroTimer.getRemainingSeconds()).toBe(10);
        expect(pomodoroTimer.startTime).toBe(1676714410000);

        vi.setSystemTime(new Date('2023-02-18 10:00:20 UTC'));
        pomodoroTimer.tick();
        expect(pomodoroTimer.isPomodoroActive()).toBe(false);
        expect(pomodoroTimer.getRemainingSeconds()).toBeNull();
        expect(pomodoroTimer.pastPomodoros).toEqual([
            { startTime: 1676714400000, endTime: 1676714410000, didFinish: true },
            { startTime: 1676714410000, endTime: 1676714420000, didFinish: true },
        ]);

        // pomodoro can be stopped
        pomodoroTimer.startTimer();
        expect(pomodoroTimer.isPomodoroActive()).toBe(true);
        expect(pomodoroTimer.getRemainingSeconds()).toBe(10);
        expect(pomodoroTimer.startTime).toBe(1676714420000);

        vi.setSystemTime(new Date('2023-02-18 10:00:23 UTC'));
        pomodoroTimer.tick();
        expect(pomodoroTimer.isPomodoroActive()).toBe(true);
        expect(pomodoroTimer.getRemainingSeconds()).toBe(7);

        pomodoroTimer.stopTimer();
        expect(pomodoroTimer.isPomodoroActive()).toBe(false);
        expect(pomodoroTimer.getRemainingSeconds()).toBeNull();
        expect(pomodoroTimer.pastPomodoros).toEqual([
            { startTime: 1676714400000, endTime: 1676714410000, didFinish: true },
            { startTime: 1676714410000, endTime: 1676714420000, didFinish: true },
            { startTime: 1676714420000, endTime: 1676714423000, didFinish: false },
        ]);
    });
});
