import App from './App';
import { expect, it } from 'vitest';
import renderer from 'react-test-renderer';

it('renders App', () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
});
