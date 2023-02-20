import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

it('renders App', () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
});
