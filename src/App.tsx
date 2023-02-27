import { useEffect } from 'react';
import './App.scss';
import tomato from './images/tomato.svg';
import ding from '../src/sounds/ding.mp3'; // https://freesound.org/people/domrodrig/sounds/116779/
import Timer from './Timer/Timer';
import { formatPomodoroTime } from './timeFormatUtils';
import { PastPomodoros } from './PastPomodoros/PastPomodoros';
import StartStopButton from './StartStopButton/StartStopButton';
import { useImmerReducer } from 'use-immer';
import { getInitialState, POMODORO_DURATION_SECONDS, pomodoroReducer } from './pomodoro-reducer';

const defaultTitle = document.title;

const App: React.FC = () => {
    const [pomodoroState, dispatch] = useImmerReducer(pomodoroReducer, getInitialState());

    // set next tick timer
    useEffect(() => {
        let ticketTimerId: number | undefined;
        if (pomodoroState.isPomodoroActive) {
            ticketTimerId = window.setTimeout(() => {
                dispatch({
                    type: 'TICK',
                    now: Date.now(),
                });
            }, 200);
        }

        return () => {
            if (ticketTimerId !== undefined) {
                clearTimeout(ticketTimerId);
            }
        };
    }, [pomodoroState]);

    // play jingle
    useEffect(() => {
        if (pomodoroState.shouldPlayJingle) {
            void (async () => {
                const myAudio = new Audio(ding);
                await myAudio.play();
            })();
            dispatch({
                type: 'JINGLE_PLAYED',
            });
        }
    }, [pomodoroState.shouldPlayJingle]);

    // update title
    useEffect(() => {
        if (pomodoroState.remainingSeconds !== null) {
            document.title = `${formatPomodoroTime(pomodoroState.remainingSeconds)} ${defaultTitle}`;
        } else {
            document.title = defaultTitle;
        }
    }, [pomodoroState.remainingSeconds]);

    function handleStart(): void {
        dispatch({
            type: 'START',
            now: Date.now(),
        });
    }

    function handleStop(): void {
        dispatch({
            type: 'STOP',
            now: Date.now(),
        });
    }

    return (
        <div className="container">
            <h1>
                <img src={tomato} /> Pomodoro Timer
            </h1>

            <Timer
                remainingSeconds={
                    pomodoroState.remainingSeconds !== null ? pomodoroState.remainingSeconds : POMODORO_DURATION_SECONDS
                }
            />

            <StartStopButton
                isPomodoroActive={pomodoroState.isPomodoroActive}
                handleStart={handleStart}
                handleStop={handleStop}
            />

            <PastPomodoros pastPomodoros={pomodoroState.pastPomodoros} />

            <footer>
                <p>
                    Created by <a href="https://www.martinhujer.cz/">Martin Hujer</a> (
                    <a href="https://github.com/mhujer/pomodoro">view source-code</a>)
                </p>
                <p>
                    <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noreferrer">
                        What is Pomodoro Technique?
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default App;
