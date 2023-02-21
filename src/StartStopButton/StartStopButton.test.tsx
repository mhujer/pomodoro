import { describe, expect, it, vi } from 'vitest';
import StartStopButton from './StartStopButton';
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('StartStopButton', () => {
    it('renderes isPomodoroActive=false', () => {
        const domTree = renderer
            .create(<StartStopButton isPomodoroActive={false} handleStart={vi.fn()} handleStop={vi.fn()} />)
            .toJSON();
        expect(domTree).toMatchSnapshot();
    });

    it('renderes isPomodoroActive=true', () => {
        const domTree = renderer
            .create(<StartStopButton isPomodoroActive={true} handleStart={vi.fn()} handleStop={vi.fn()} />)
            .toJSON();
        expect(domTree).toMatchSnapshot();
    });

    it('renders and clicks Start', () => {
        const startClickSpy = vi.fn();
        const stopClickSpy = vi.fn();

        render(<StartStopButton isPomodoroActive={false} handleStart={startClickSpy} handleStop={stopClickSpy} />);

        fireEvent.click(screen.getByText('Start!'));

        expect(startClickSpy).toHaveBeenCalled();
        expect(stopClickSpy).not.toHaveBeenCalled();
    });

    it('renders and clicks Stop', () => {
        const startClickSpy = vi.fn();
        const stopClickSpy = vi.fn();

        render(<StartStopButton isPomodoroActive={true} handleStart={startClickSpy} handleStop={stopClickSpy} />);

        fireEvent.click(screen.getByText('Stop!'));

        expect(startClickSpy).not.toHaveBeenCalled();
        expect(stopClickSpy).toHaveBeenCalled();
    });
});
