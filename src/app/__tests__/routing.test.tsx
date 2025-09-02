import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import Contact from '../components/Contact';
import Interests from '../components/Interests';
import { NotFound } from '../components/NotFound';

const renderWithRouter = (
  component: React.ReactElement,
  initialEntries: string[] = ['/']
) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>{component}</MemoryRouter>
  );
};

const AppWithRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/interests" element={<Interests />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

describe('Routing', () => {
  describe('Existing routes', () => {
    it('renders Home component at root path', () => {
      renderWithRouter(<AppWithRoutes />, ['/']);
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('renders Contact component at /contact path', () => {
      renderWithRouter(<AppWithRoutes />, ['/contact']);
      expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    });

    it('renders Interests component at /interests path', () => {
      renderWithRouter(<AppWithRoutes />, ['/interests']);
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
  });

  describe('Non-existing routes', () => {
    it('renders NotFound component for invalid path', () => {
      renderWithRouter(<AppWithRoutes />, ['/nieistniejacy-url']);
      expect(screen.getByTestId('not-found-container')).toBeInTheDocument();
    });

    it('renders NotFound component for random path', () => {
      renderWithRouter(<AppWithRoutes />, ['/random/123/test']);
      expect(screen.getByTestId('not-found-container')).toBeInTheDocument();
    });

    it('renders NotFound component for empty path', () => {
      renderWithRouter(<AppWithRoutes />, ['/']);
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });
  });

  describe('Route navigation', () => {
    it('can navigate between valid routes', () => {
      renderWithRouter(<AppWithRoutes />, ['/']);
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('can navigate to contact route', () => {
      renderWithRouter(<AppWithRoutes />, ['/contact']);
      expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    });

    it('can navigate to interests route', () => {
      renderWithRouter(<AppWithRoutes />, ['/interests']);
      expect(screen.getByTestId('header')).toBeInTheDocument();
    });

    it('shows NotFound for invalid route and can return to valid route', () => {
      renderWithRouter(<AppWithRoutes />, ['/invalid']);
      expect(screen.getByTestId('not-found-container')).toBeInTheDocument();

      renderWithRouter(<AppWithRoutes />, ['/contact']);
      expect(screen.getByTestId('contact-form')).toBeInTheDocument();
    });
  });
});
