import React, { useState } from 'react';
import styles from '../styles/contact.module.scss';
import stylesForm from '../styles/form.module.scss';
import stylesSections from '../styles/section.module.scss';
import Header from './Header';
import Footer from './Footer';
import {
  sendContactMessage,
  ContactFormData,
} from '../services/contactService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await sendContactMessage(formData);

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message,
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message,
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-background ${styles.contact}`}
    >
      <Header />
      <main
        className={`flex-grow flex items-center justify-center py-6 ${styles.container}`}
      >
        <section className={`w-full max-w-4xl ${stylesSections.section}`}>
          <div className={stylesSections['section-inner']}>
            <h2 className="text-4xl font-bold text-center mb-4">Kontakt</h2>
            <p className={styles.contactIntro}>
              Masz pytania? Skontaktuj się ze mną:
            </p>

            <div className={styles.privacyNotice}>
              <p>
                <strong>Informacja o przetwarzaniu danych osobowych:</strong>
                <br />
                Administratorem Twoich danych osobowych jest Artur Szwagrzak.
                Dane będą przetwarzane w celu udzielenia odpowiedzi na Twoją
                wiadomość. Podstawą prawną jest art. 6 ust. 1 lit. b RODO. Dane
                będą przechowywane przez okres niezbędny do udzielenia
                odpowiedzi, a następnie przez 3 lata w celach archiwalnych. Masz
                prawo do wglądu, poprawiania, usuwania i przenoszenia danych.
                Więcej informacji: artur@szwagrzak.pl
              </p>
            </div>

            <div className="flex justify-center">
              <div className={stylesSections['paragraph-body']}>
                <form
                  data-testid="contact-form"
                  className={stylesForm.form}
                  onSubmit={handleSubmit}
                >
                  <label htmlFor="name">Imię</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />

                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />

                  <label htmlFor="message">Wiadomość</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>

                  {submitStatus.type && (
                    <div
                      className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-error'}`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <button className="btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Wysyłanie...' : 'Wyślij'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
