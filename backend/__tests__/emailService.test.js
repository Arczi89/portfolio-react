const nodemailer = require('nodemailer');
const { sendContactEmail, sendConfirmationEmail } = require('../emailService');

// Mock nodemailer
jest.mock('nodemailer');

describe('Email Service', () => {
  let mockTransporter;
  let mockSendMail;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup mock transporter
    mockSendMail = jest.fn();
    mockTransporter = {
      sendMail: mockSendMail,
    };

    nodemailer.createTransporter.mockReturnValue(mockTransporter);
  });

  describe('sendContactEmail', () => {
    const mockContactData = {
      name: 'Jan Kowalski',
      email: 'jan@example.com',
      message: 'Test message content',
    };

    it('should send contact email successfully', async () => {
      const mockResult = {
        messageId: 'test-message-id-123',
      };

      mockSendMail.mockResolvedValueOnce(mockResult);

      const result = await sendContactEmail(mockContactData);

      expect(nodemailer.createTransporter).toHaveBeenCalledWith({
        host: 'arturszwagrzak.atthost24.pl',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER || 'artur@szwagrzak.pl',
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      expect(mockSendMail).toHaveBeenCalledWith({
        from: process.env.EMAIL_USER || 'artur@szwagrzak.pl',
        to: 'artur@szwagrzak.pl',
        subject: `Nowa wiadomość kontaktowa od ${mockContactData.name}`,
        html: expect.stringContaining(mockContactData.name),
      });

      expect(result).toEqual({
        success: true,
        messageId: 'test-message-id-123',
      });
    });

    it('should handle email sending error', async () => {
      const mockError = new Error('SMTP connection failed');
      mockSendMail.mockRejectedValueOnce(mockError);

      const result = await sendContactEmail(mockContactData);

      expect(result).toEqual({
        success: false,
        error: 'SMTP connection failed',
      });
    });

    it('should include correct email content', async () => {
      mockSendMail.mockResolvedValueOnce({ messageId: 'test' });

      await sendContactEmail(mockContactData);

      const callArgs = mockSendMail.mock.calls[0][0];

      expect(callArgs.html).toContain(mockContactData.name);
      expect(callArgs.html).toContain(mockContactData.email);
      expect(callArgs.html).toContain(mockContactData.message);
      expect(callArgs.html).toContain('Nowa wiadomość kontaktowa');
      expect(callArgs.html).toContain('szwagrzak.pl');
    });

    it('should use environment variables for email configuration', async () => {
      const originalEmailUser = process.env.EMAIL_USER;
      const originalEmailPass = process.env.EMAIL_PASS;

      process.env.EMAIL_USER = 'test@example.com';
      process.env.EMAIL_PASS = 'test-password';

      mockSendMail.mockResolvedValueOnce({ messageId: 'test' });

      await sendContactEmail(mockContactData);

      expect(nodemailer.createTransporter).toHaveBeenCalledWith(
        expect.objectContaining({
          auth: {
            user: 'test@example.com',
            pass: 'test-password',
          },
        })
      );

      // Restore original environment
      process.env.EMAIL_USER = originalEmailUser;
      process.env.EMAIL_PASS = originalEmailPass;
    });
  });

  describe('sendConfirmationEmail', () => {
    const mockContactData = {
      name: 'Jan Kowalski',
      email: 'jan@example.com',
      message: 'Test message content',
    };

    it('should send confirmation email successfully', async () => {
      const mockResult = {
        messageId: 'confirmation-message-id-456',
      };

      mockSendMail.mockResolvedValueOnce(mockResult);

      const result = await sendConfirmationEmail(mockContactData);

      expect(mockSendMail).toHaveBeenCalledWith({
        from: process.env.EMAIL_USER || 'artur@szwagrzak.pl',
        to: mockContactData.email,
        subject: 'Potwierdzenie wysłania wiadomości - Artur Szwagrzak',
        html: expect.stringContaining(mockContactData.name),
      });

      expect(result).toEqual({
        success: true,
        messageId: 'confirmation-message-id-456',
      });
    });

    it('should handle confirmation email sending error', async () => {
      const mockError = new Error('SMTP authentication failed');
      mockSendMail.mockRejectedValueOnce(mockError);

      const result = await sendConfirmationEmail(mockContactData);

      expect(result).toEqual({
        success: false,
        error: 'SMTP authentication failed',
      });
    });

    it('should include correct confirmation email content', async () => {
      mockSendMail.mockResolvedValueOnce({ messageId: 'test' });

      await sendConfirmationEmail(mockContactData);

      const callArgs = mockSendMail.mock.calls[0][0];

      expect(callArgs.html).toContain('Dziękuję za wiadomość!');
      expect(callArgs.html).toContain(mockContactData.name);
      expect(callArgs.html).toContain(mockContactData.message);
      expect(callArgs.html).toContain('Artur Szwagrzak');
      expect(callArgs.html).toContain('automatyczna wiadomość potwierdzająca');
    });

    it('should send to the correct recipient email', async () => {
      mockSendMail.mockResolvedValueOnce({ messageId: 'test' });

      await sendConfirmationEmail(mockContactData);

      const callArgs = mockSendMail.mock.calls[0][0];
      expect(callArgs.to).toBe(mockContactData.email);
    });
  });

  describe('SMTP Configuration', () => {
    it('should use correct SMTP settings', async () => {
      mockSendMail.mockResolvedValueOnce({ messageId: 'test' });

      await sendContactEmail({
        name: 'Test',
        email: 'test@test.com',
        message: 'Test',
      });

      expect(nodemailer.createTransporter).toHaveBeenCalledWith({
        host: 'arturszwagrzak.atthost24.pl',
        port: 587,
        secure: false,
        auth: expect.any(Object),
        tls: {
          rejectUnauthorized: false,
        },
      });
    });
  });
});
