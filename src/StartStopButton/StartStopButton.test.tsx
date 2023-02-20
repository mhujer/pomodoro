import React from 'react';
import StartStopButton from './StartStopButton';
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

it('renderes and matches snapshot', () => {
    const domTree = renderer.create(<StartStopButton handleButtonClick={jest.fn()} />).toJSON();
    expect(domTree).toMatchSnapshot();
});

it('renders and clicks', () => {
    const clickSpy = jest.fn();

    render(<StartStopButton handleButtonClick={clickSpy} />);

    fireEvent.click(screen.getByText('Start!'));

    expect(clickSpy).toHaveBeenCalled();

});
