import React from 'react';
import { formatPomodoroTime } from '../timeFormatUtils';
import { lightFormat } from 'date-fns';
import { PastPomodoro } from '../pomodoro-reducer';

interface Props {
    pastPomodoros: PastPomodoro[];
}

export const PastPomodoros: React.FC<Props> = ({ pastPomodoros: pastPomodorosInput }) => {
    const pastPomodoros = [...pastPomodorosInput];

    // no pomodoros
    if (pastPomodoros.length === 0) {
        return null;
    }

    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#description
    pastPomodoros.sort((a, b) => {
        return b.startTime - a.startTime;
    });

    // display just last 20 pomodoros
    const pastPomodorosToDisplay = pastPomodoros.slice(0, 20);

    const pastPomodorosLog = pastPomodorosToDisplay.map((pastPomodoro) => {
        const duration = formatPomodoroTime((pastPomodoro.endTime - pastPomodoro.startTime) / 1000);
        const startDateFormatted = lightFormat(new Date(pastPomodoro.startTime), 'yyyy-MM-dd HH:mm:ss');

        return (
            <li key={pastPomodoro.startTime}>
                <em>{startDateFormatted}</em>: duration{' '}
                <strong>
                    {duration} {pastPomodoro.didFinish ? '✅' : '❌'}
                </strong>
            </li>
        );
    });

    return <ul>{pastPomodorosLog}</ul>;
};
