import { PastPomodoros } from './PastPomodoros';
import renderer from 'react-test-renderer';
import { PastPomodoro } from '../PomodoroTimer';
import { describe, it } from 'vitest';

describe('PastPomodoros', () => {
    it('renders for no pomodoros', () => {
        const domTree = renderer.create(<PastPomodoros pastPomodoros={[]} />).toJSON();
        expect(domTree).toMatchSnapshot();
    });

    it('renders for 1 pomodoro', () => {
        const pastPomodoros: PastPomodoro[] = [
            {
                startTime: new Date('2023-02-18 15:00:00').getTime(),
                endTime: new Date('2023-02-18 15:25:00').getTime(),
                didFinish: true,
            },
        ];

        const domTree = renderer.create(<PastPomodoros pastPomodoros={pastPomodoros} />).toJSON();
        expect(domTree).toMatchSnapshot();
    });

    it('renders finished and void pomodoros', () => {
        const pastPomodoros: PastPomodoro[] = [
            {
                startTime: new Date('2023-02-18 15:00:00').getTime(),
                endTime: new Date('2023-02-18 15:05:11').getTime(),
                didFinish: false,
            },
            {
                startTime: new Date('2023-02-18 15:10:00').getTime(),
                endTime: new Date('2023-02-18 15:35:00').getTime(),
                didFinish: true,
            },
        ];

        const domTree = renderer.create(<PastPomodoros pastPomodoros={pastPomodoros} />).toJSON();
        expect(domTree).toMatchSnapshot();
    });
});
