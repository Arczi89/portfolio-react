import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test('renders main elements', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/szwagrzak/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
