import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from '../NotFound';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('NotFound', () => {
  it('renders required elements with content', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByTestId('not-found-title');
    const subtitle = screen.getByTestId('not-found-subtitle');

    expect(title.textContent).toBeTruthy();
    expect(subtitle.textContent).toBeTruthy();
  });

  it('renders return to homepage button with correct attributes', () => {
    renderWithRouter(<NotFound />);

    const homeButton = screen.getByTestId('not-found-home-button');
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).toHaveAttribute('href', '/');
    expect(homeButton.textContent).toBeTruthy();
  });
});
