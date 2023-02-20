import React from 'react';
import Timer from './Timer';
import renderer from 'react-test-renderer';

describe('Timer', () => {
    test('renders timer for 0 seconds', () => {
        const domTree = renderer.create(<Timer remainingSeconds={0} />).toJSON();
        expect(domTree).toMatchSnapshot();
    });

    test('renders timer for 60 seconds', () => {
        const domTree = renderer.create(<Timer remainingSeconds={60} />).toJSON();
        expect(domTree).toMatchSnapshot();
    });

    test('renders timer for 1500 seconds (25 min)', () => {
        const domTree = renderer.create(<Timer remainingSeconds={1500} />).toJSON();
        expect(domTree).toMatchSnapshot();
    });
});
