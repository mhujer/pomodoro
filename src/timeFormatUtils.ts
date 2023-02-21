export function formatPomodoroTime(secondsInput: number): string {
    const secondsInputRounded = Math.round(secondsInput);

    const minutes = Math.floor(secondsInputRounded / 60);
    const seconds = (secondsInputRounded % 60).toFixed();

    return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}
