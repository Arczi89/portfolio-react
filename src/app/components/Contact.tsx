import React from 'react';
import styles from '../styles/contact.module.scss';
import stylesForm from '../styles/form.module.scss';
import stylesSections from '../styles/section.module.scss';
import Header from './Header';

const Contact: React.FC = () => {
  return (
    <div
      className={`min-h-screen flex flex-col bg-background ${styles.contact}`}
    >
      <Header />
      <main className={`flex-grow mx-auto py-6 ${styles.container}`}>
        <section className={`mb-8 ${stylesSections.section}`}>
          <div className={stylesSections['section-inner']}>
            <h2 className="text-4xl font-bold">Kontakt</h2>
            <p>Masz pytania? Skontaktuj się ze mną:</p>
            <div>
              {/* <img src="">aaaa</img> */}
              <div className={stylesSections['paragraph-body']}>
                <form className={stylesForm.form}>
                  <label htmlFor="name">Imię</label>
                  <input type="text" id="name" name="name" required />

                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />

                  <label htmlFor="message">Wiadomość</label>
                  <textarea id="message" name="message" required></textarea>

                  <button className="btn" type="submit">
                    Wyślij
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <p>
          &copy; 2024 Szwagrzak Artur. Wszelkie prawa zastrzeżone. Kontakt:
          artur@szwagrzak.pl
        </p>
      </footer>
    </div>
  );
};

export default Contact;
