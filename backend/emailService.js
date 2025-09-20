const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const createTransporter = () => {
  // SMTP configuration for atthost hosting
  const smtpConfig = {
    host: process.env.EMAIL_HOST || 'mail.szwagrzak.pl',
    port: 587, // TLS port
    secure: false, // false for 587, true for 465
    auth: {
      user: process.env.EMAIL_USER || 'artur@szwagrzak.pl',
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  };

  return nodemailer.createTransport(smtpConfig);
};

const sendContactEmail = async contactData => {
  try {
    console.log('🚀 Rozpoczynam wysyłanie emaila kontaktowego...');
    console.log('📧 Dane emaila:', {
      from: process.env.EMAIL_USER || 'artur@szwagrzak.pl',
      to: 'artur@szwagrzak.pl',
      subject: `Nowa wiadomość kontaktowa od ${contactData.name}`,
    });

    const transporter = createTransporter();
    console.log('Transporter utworzony pomyślnie');

    const mailOptions = {
      from: process.env.EMAIL_USER || 'artur@szwagrzak.pl',
      to: 'artur@szwagrzak.pl',
      subject: `Nowa wiadomość kontaktowa od ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Nowa wiadomość kontaktowa</h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Dane kontaktowe:</h3>
            <p><strong>Imię:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            <p><strong>Data:</strong> ${new Date().toLocaleString('pl-PL')}</p>
          </div>
          
          <div style="background-color: #fefefe; padding: 20px; border-left: 4px solid #1e40af; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Treść wiadomości:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${contactData.message}</p>
          </div>
          
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #0369a1; font-size: 14px;">
              Wiadomość została wysłana z formularza kontaktowego na stronie szwagrzak.pl
            </p>
          </div>
        </div>
      `,
    };

    console.log('📤 Wysyłam email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Email wysłany pomyślnie:', result.messageId);
    console.log('📊 Szczegóły wysłania:', {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      response: result.response,
    });
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Błąd podczas wysyłania emaila:', error);
    console.error('🔍 Szczegóły błędu:', {
      message: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response,
    });
    return { success: false, error: error.message };
  }
};

const sendConfirmationEmail = async contactData => {
  try {
    console.log('🚀 Rozpoczynam wysyłanie emaila potwierdzającego...');
    console.log('📧 Dane emaila potwierdzającego:', {
      from: process.env.EMAIL_USER || 'artur@szwagrzak.pl',
      to: contactData.email,
      subject: 'Potwierdzenie wysłania wiadomości - Artur Szwagrzak',
    });

    const transporter = createTransporter();
    console.log('Transporter utworzony pomyślnie');

    const mailOptions = {
      from: process.env.EMAIL_USER || 'artur@szwagrzak.pl',
      to: contactData.email,
      subject: 'Potwierdzenie wysłania wiadomości - Artur Szwagrzak',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af;">Dziękuję za wiadomość!</h2>
          
          <p>Cześć ${contactData.name},</p>
          
          <p>Dziękuję za kontakt! Otrzymałem Twoją wiadomość i odpowiem na nią tak szybko, jak to możliwe.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Twoja wiadomość:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; font-style: italic;">${contactData.message}</p>
          </div>
          
          <p>Pozdrawiam,<br>
          <strong>Artur Szwagrzak</strong></p>
          
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #0369a1; font-size: 14px;">
              To jest automatyczna wiadomość potwierdzająca. Proszę nie odpowiadać na ten email.
            </p>
          </div>
        </div>
      `,
    };

    console.log('📤 Wysyłam email potwierdzający...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Email potwierdzający wysłany pomyślnie:', result.messageId);
    console.log('📊 Szczegóły wysłania potwierdzenia:', {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
      response: result.response,
    });
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Błąd podczas wysyłania emaila potwierdzającego:', error);
    console.error('🔍 Szczegóły błędu potwierdzenia:', {
      message: error.message,
      code: error.code,
      command: error.command,
      responseCode: error.responseCode,
      response: error.response,
    });
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContactEmail,
  sendConfirmationEmail,
};
