import React from 'react';
import { formatPomodoroTime } from '../timeFormatUtils';

interface Props {
    remainingSeconds: number;
}

const Timer: React.FC<Props> = ({ remainingSeconds }) => {
    const formattedSeconds = formatPomodoroTime(remainingSeconds);

    return (
        <>
            <p className="countdown">{formattedSeconds}</p>
        </>
    );
};

export default Timer;
