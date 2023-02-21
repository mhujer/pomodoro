import { expect, it } from 'vitest';
import { formatPomodoroTime } from './timeFormatUtils';

it('formats pomodoro time', () => {
    expect(formatPomodoroTime(0)).toBe('00:00');
    expect(formatPomodoroTime(0.3)).toBe('00:00');
    expect(formatPomodoroTime(0.7)).toBe('00:01');
    expect(formatPomodoroTime(1)).toBe('00:01');
    expect(formatPomodoroTime(60)).toBe('01:00');
    expect(formatPomodoroTime(60.4)).toBe('01:00');
    expect(formatPomodoroTime(25 * 60)).toBe('25:00');
    expect(formatPomodoroTime(25 * 60 - 0.001)).toBe('25:00');
    expect(formatPomodoroTime(25 * 60 - 0.49)).toBe('25:00');
    expect(formatPomodoroTime(25 * 60 - 0.6)).toBe('24:59');
});
