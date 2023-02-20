import React from 'react';

interface Props {
    isPomodoroActive: boolean;
    handleStart: () => void;
    handleStop: () => void;
}

const StartStopButton: React.FC<Props> = ({ isPomodoroActive, handleStart, handleStop }) => {

    if (isPomodoroActive) {
        return <button onClick={handleStop}>Stop!</button>;
    } else {
        return <button onClick={handleStart}>Start!</button>;
    }
};

export default StartStopButton;
