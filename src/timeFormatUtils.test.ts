import { formatPomodoroTime } from './timeFormatUtils';

test('pomodoro time is formatted', () => {
    expect(formatPomodoroTime(0)).toBe('00:00');
    expect(formatPomodoroTime(0.3)).toBe('00:00');
    expect(formatPomodoroTime(0.7)).toBe('00:01');
    expect(formatPomodoroTime(1)).toBe('00:01');
    expect(formatPomodoroTime(60)).toBe('01:00');
    expect(formatPomodoroTime(60.4)).toBe('01:00');
    expect(formatPomodoroTime(25 * 60)).toBe('25:00');
});
