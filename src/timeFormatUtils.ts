export function formatPomodoroTime(secondsInput: number): string {
    const minutes = Math.floor(secondsInput / 60);
    const seconds = (secondsInput % 60).toFixed();

    return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}
