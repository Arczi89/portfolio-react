import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  // Sprawdź czy aplikacja się renderuje bez błędów
  expect(document.body).toBeInTheDocument();
});

test('app contains main content', () => {
  render(<App />);
  // Sprawdź czy główne elementy są obecne
  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeInTheDocument();
});
