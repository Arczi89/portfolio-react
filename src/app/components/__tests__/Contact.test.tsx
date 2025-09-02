import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from '../Contact';
import * as contactService from '../../services/contactService';

// Mock the contact service
jest.mock('../../services/contactService');
const mockSendContactMessage =
  contactService.sendContactMessage as jest.MockedFunction<
    typeof contactService.sendContactMessage
  >;

// Mock the Header component
jest.mock('../Header', () => {
  return function MockHeader() {
    return <div data-testid="header">Header</div>;
  };
});

describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders contact form with all required fields', () => {
    render(<Contact />);

    expect(screen.getByText('Kontakt')).toBeInTheDocument();
    expect(
      screen.getByText('Masz pytania? Skontaktuj się ze mną:')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Imię')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Wiadomość')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Wyślij' })).toBeInTheDocument();
  });

  it('renders privacy notice', () => {
    render(<Contact />);

    expect(
      screen.getByText(/Informacja o przetwarzaniu danych osobowych/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Administratorem Twoich danych osobowych jest Artur Szwagrzak/
      )
    ).toBeInTheDocument();
    expect(screen.getAllByText(/artur@szwagrzak.pl/)).toHaveLength(2); // W privacy notice i footer
  });

  it('handles form input changes', () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText('Imię');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Wiadomość');

    fireEvent.change(nameInput, { target: { value: 'Jan Kowalski' } });
    fireEvent.change(emailInput, { target: { value: 'jan@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    expect(nameInput).toHaveValue('Jan Kowalski');
    expect(emailInput).toHaveValue('jan@example.com');
    expect(messageInput).toHaveValue('Test message');
  });

  it('submits form successfully', async () => {
    mockSendContactMessage.mockResolvedValueOnce({
      success: true,
      message: 'Message sent successfully! Check your email.',
      id: 123,
    });

    render(<Contact />);

    const nameInput = screen.getByLabelText('Imię');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Wiadomość');
    const submitButton = screen.getByRole('button', { name: 'Wyślij' });

    fireEvent.change(nameInput, { target: { value: 'Jan Kowalski' } });
    fireEvent.change(emailInput, { target: { value: 'jan@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSendContactMessage).toHaveBeenCalledWith({
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        message: 'Test message',
      });
    });

    await waitFor(() => {
      expect(
        screen.getByText('Message sent successfully! Check your email.')
      ).toBeInTheDocument();
    });

    // Check that form is cleared after successful submission
    expect(nameInput).toHaveValue('');
    expect(emailInput).toHaveValue('');
    expect(messageInput).toHaveValue('');
  });

  it('handles form submission error', async () => {
    mockSendContactMessage.mockRejectedValueOnce(new Error('Network error'));

    render(<Contact />);

    const nameInput = screen.getByLabelText('Imię');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Wiadomość');
    const submitButton = screen.getByRole('button', { name: 'Wyślij' });

    fireEvent.change(nameInput, { target: { value: 'Jan Kowalski' } });
    fireEvent.change(emailInput, { target: { value: 'jan@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    // Create a promise that we can resolve later
    let resolvePromise: (value: any) => void;
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });

    mockSendContactMessage.mockReturnValueOnce(promise);

    render(<Contact />);

    const nameInput = screen.getByLabelText('Imię');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Wiadomość');
    const submitButton = screen.getByRole('button', { name: 'Wyślij' });

    fireEvent.change(nameInput, { target: { value: 'Jan Kowalski' } });
    fireEvent.change(emailInput, { target: { value: 'jan@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);

    // Check loading state
    expect(
      screen.getByRole('button', { name: 'Wysyłanie...' })
    ).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    // Resolve the promise
    resolvePromise!({
      success: true,
      message: 'Success',
    });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Wyślij' })
      ).toBeInTheDocument();
    });
  });

  it('requires all fields to be filled', () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText('Imię');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Wiadomość');

    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageInput).toBeRequired();
  });

  it('validates email format', () => {
    render(<Contact />);

    const emailInput = screen.getByLabelText('Email');
    expect(emailInput).toHaveAttribute('type', 'email');
  });
});
