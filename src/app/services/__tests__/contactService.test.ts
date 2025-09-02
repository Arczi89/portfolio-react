import { sendContactMessage, ContactFormData } from '../contactService';

// Mock fetch globally
global.fetch = jest.fn();

describe('contactService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendContactMessage', () => {
    const mockFormData: ContactFormData = {
      name: 'Jan Kowalski',
      email: 'jan@example.com',
      message: 'Test message',
    };

    it('should send contact message successfully', async () => {
      const mockResponse = {
        success: true,
        message: 'Message sent successfully! Check your email.',
        id: 123,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await sendContactMessage(mockFormData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/contact'),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mockFormData),
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it('should handle server error response', async () => {
      const mockErrorResponse = {
        success: false,
        message: 'Server error occurred',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => mockErrorResponse,
      });

      await expect(sendContactMessage(mockFormData)).rejects.toThrow(
        'Server error occurred'
      );
    });

    it('should handle network error', async () => {
      const networkError = new Error('Network error');
      (fetch as jest.Mock).mockRejectedValueOnce(networkError);

      await expect(sendContactMessage(mockFormData)).rejects.toThrow(
        'Network error'
      );
    });

    it('should handle unknown error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce('Unknown error');

      await expect(sendContactMessage(mockFormData)).rejects.toThrow(
        'Nieznany błąd podczas wysyłania wiadomości'
      );
    });

    it('should use correct API base URL', async () => {
      // Mock the environment variable before importing the module
      const originalEnv = process.env.REACT_APP_API_BASE_URL;
      process.env.REACT_APP_API_BASE_URL = 'https://custom-api.com/api';

      // Re-import the module to get the updated BASE_URL
      jest.resetModules();
      const {
        sendContactMessage: sendContactMessageWithCustomUrl,
      } = require('../contactService');

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Success' }),
      });

      await sendContactMessageWithCustomUrl(mockFormData);

      expect(fetch).toHaveBeenCalledWith(
        'https://custom-api.com/api/contact',
        expect.any(Object)
      );

      // Restore original environment
      process.env.REACT_APP_API_BASE_URL = originalEnv;
    });

    it('should fallback to localhost when API base URL is not set', async () => {
      const originalEnv = process.env.REACT_APP_API_BASE_URL;
      delete process.env.REACT_APP_API_BASE_URL;

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true, message: 'Success' }),
      });

      await sendContactMessage(mockFormData);

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:3002/api/contact',
        expect.any(Object)
      );

      // Restore original environment
      process.env.REACT_APP_API_BASE_URL = originalEnv;
    });
  });
});
