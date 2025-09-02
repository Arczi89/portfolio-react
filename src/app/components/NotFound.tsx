import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div
          data-testid="not-found-container"
          className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center"
        >
          <div data-testid="not-found-header" className="mb-6">
            <h1
              data-testid="not-found-title"
              className="text-6xl font-bold text-red-600 mb-4"
            >
              404
            </h1>
            <h2
              data-testid="not-found-subtitle"
              className="text-2xl font-semibold text-gray-800 mb-2"
            >
              Strona nie została znaleziona
            </h2>
            <p data-testid="not-found-description" className="text-gray-600">
              Przepraszamy, ale strona której szukasz nie istnieje.
            </p>
          </div>

          <Link
            data-testid="not-found-home-button"
            to="/"
            className="inline-block w-full bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Wróć do strony głównej
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
