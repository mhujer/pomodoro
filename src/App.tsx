import { useEffect, useRef, useState } from 'react';
import './App.scss';
import ding from '../src/sounds/ding.mp3'; // https://freesound.org/people/domrodrig/sounds/116779/
import Timer from './Timer/Timer';
import { formatPomodoroTime } from './timeFormatUtils';
import { PastPomodoro, PomodoroTimer } from './PomodoroTimer';
import { PastPomodoros } from './PastPomodoros/PastPomodoros';
import StartStopButton from './StartStopButton/StartStopButton';

const defaultTitle = document.title;

function App() {
    // @ts-expect-error startTime state is required to trigger rerender
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [startTime, setStartTime] = useState<number | null>(null);
    // @ts-expect-error now state is required to trigger rerender
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [now, setNow] = useState<number | null>(null);
    const [pastPomodoros, setPastPomodoros] = useState<PastPomodoro[]>([]);
    const intervalRef = useRef<number | null>(null);

    const pomodoroTimerRef = useRef<PomodoroTimer>(new PomodoroTimer());
    const pomodoroTimer = pomodoroTimerRef.current;

    function handleStart(): void {
        pomodoroTimer.startTimer();

        setStartTime(pomodoroTimer.startTime);
        setNow(pomodoroTimer.latestNow);

        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        intervalRef.current = window.setInterval(async () => {
            pomodoroTimer.tick();

            setStartTime(pomodoroTimer.startTime);
            setNow(pomodoroTimer.latestNow); // to trigger rerender

            // timer expired in tick()
            if (pomodoroTimer.startTime === null) {
                if (intervalRef.current !== null) { // guarded by TS
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }

                const myAudio = new Audio(ding);
                await myAudio.play();

                setPastPomodoros(pomodoroTimer.pastPomodoros);
            }
        }, 100);
    }

    function handleStop(): void {
        pomodoroTimer.stopTimer();

        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
        }

        setStartTime(pomodoroTimer.startTime);
        setNow(pomodoroTimer.latestNow);
        setPastPomodoros(pomodoroTimer.pastPomodoros);
    }

    let remainingSeconds = pomodoroTimer.getRemainingSeconds();
    let title: string;
    if (remainingSeconds !== null) {
        title = `${formatPomodoroTime(remainingSeconds)} ${defaultTitle}`;
    } else {
        remainingSeconds = pomodoroTimer.getDefaultPomodoroDurationSeconds();
        title = defaultTitle;
    }

    // update title
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <div className='container'>
            <Timer remainingSeconds={remainingSeconds} />

            <StartStopButton
                isPomodoroActive={pomodoroTimer.isPomodoroActive()}
                handleStart={handleStart}
                handleStop={handleStop}
            />

            <PastPomodoros pastPomodoros={pastPomodoros} />
        </div>
    );
}

export default App;
