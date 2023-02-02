import './style.scss';
import ding from './sounds/ding.mp3'; // https://freesound.org/people/domrodrig/sounds/116779/
import * as dayjs from 'dayjs';
import * as dayjsDuration from 'dayjs/plugin/duration';

dayjs.extend(dayjsDuration);

const body = document.querySelector('body');
if (body === null) {
    throw new Error('"body" element not found in HTML!');
}

const button = document.createElement('button');
button.textContent = 'Start!';
body.append(button);

const countdown = document.createElement('p');
body.append(countdown);

const POMODORO_DURATION_SECONDS = 5;
let ticker: number | undefined;
button.addEventListener('click', () => {
    countdown.textContent = dayjs.duration(POMODORO_DURATION_SECONDS * 1000).format('mm:ss');

    const startTime = dayjs();

    if (ticker !== undefined) {
        window.clearInterval(ticker);
    }
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    ticker = window.setInterval(async function () {
        const now = dayjs();
        const interval = dayjs.duration(now.diff(startTime));

        const seconds = interval.as('seconds');

        const remainingSeconds = POMODORO_DURATION_SECONDS - seconds;
        const remainingDuration = dayjs.duration(remainingSeconds * 1000);
        countdown.textContent = remainingDuration.format('mm:ss');

        if (seconds >= POMODORO_DURATION_SECONDS) {
            clearInterval(ticker);
            countdown.textContent = dayjs.duration(POMODORO_DURATION_SECONDS * 1000).format('mm:ss');
            const myAudio = new Audio(ding);
            await myAudio.play();
        }
    }, 100);
});
