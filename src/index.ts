import './style.scss';
import ding from './sounds/ding.mp3'; // https://freesound.org/people/domrodrig/sounds/116779/
import * as dayjs from 'dayjs';
import * as dayjsDuration from 'dayjs/plugin/duration';

dayjs.extend(dayjsDuration);

let POMODORO_DURATION_SECONDS: number;

// @see https://webpack.js.org/guides/production/#specify-the-mode
if (process.env.NODE_ENV === 'production') {
    POMODORO_DURATION_SECONDS = 25 * 60;
} else {
    POMODORO_DURATION_SECONDS = 5;
}

const defaultTitle = document.title;

const body = document.querySelector('body');
if (body === null) {
    throw new Error('"body" element not found in HTML!');
}

const countdown = document.createElement('p');
countdown.classList.add('countdown');
countdown.textContent = dayjs.duration(POMODORO_DURATION_SECONDS * 1000).format('mm:ss');
body.append(countdown);

const button = document.createElement('button');
button.textContent = 'Start!';
body.append(button);

const log = document.createElement('ul');
body.append(log);

const logPomodoroToUi = function (elapsedSeconds: number, finished: boolean) {
    const logItem = document.createElement('li');

    const nowFormatted = dayjs().format('YYYY-MM-DD HH:mm');
    const durationFormatted = dayjs.duration(elapsedSeconds * 1000).format('mm:ss');
    const finishedMessage = finished ? '✅' : '❌';
    logItem.textContent = `${nowFormatted} duration ${durationFormatted} ${finishedMessage}`;

    log.append(logItem);
};

let ticker: number | undefined;
let startTime: dayjs.Dayjs | undefined;
button.addEventListener('click', () => {
    if (ticker !== undefined) {
        window.clearInterval(ticker);
        ticker = undefined;

        console.log(dayjs(), startTime);

        const elapsedSeconds = dayjs.duration(dayjs().diff(startTime)).as('seconds');
        console.log(elapsedSeconds);
        logPomodoroToUi(elapsedSeconds, false);
    }

    startTime = dayjs();

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    ticker = window.setInterval(async function () {
        const elapsedInterval = dayjs.duration(dayjs().diff(startTime));
        const elapsedSeconds = elapsedInterval.as('seconds');

        const remainingSeconds = POMODORO_DURATION_SECONDS - elapsedSeconds;
        const remainingDuration = dayjs.duration(remainingSeconds * 1000);
        countdown.textContent = remainingDuration.format('mm:ss');

        document.title = `${remainingDuration.format('mm:ss')} ${defaultTitle}`;

        if (elapsedSeconds >= POMODORO_DURATION_SECONDS) {
            clearInterval(ticker);
            ticker = undefined;
            countdown.textContent = dayjs.duration(POMODORO_DURATION_SECONDS * 1000).format('mm:ss');

            logPomodoroToUi(elapsedSeconds, true);

            document.title = defaultTitle;

            const myAudio = new Audio(ding);
            await myAudio.play();
        }
    }, 100);
});
