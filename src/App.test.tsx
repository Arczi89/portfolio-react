import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
});

test('renders main elements', () => {
  render(<App />);
  const linkElement = screen.getByText(/szwagrzak/i);
  expect(linkElement).toBeInTheDocument();
});
