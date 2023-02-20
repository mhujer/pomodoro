import React from 'react';

type Props = {
    handleButtonClick: () => void;
}

const StartStopButton: React.FC<Props> = ({ handleButtonClick }) => {

    return (
        <>
            <button onClick={handleButtonClick}>Start!</button>
        </>
    );

};

export default StartStopButton;
