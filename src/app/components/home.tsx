import Image from 'next/image';
import MainPageSection from '@/models/mainPageSection';
import React from 'react';
import styles from './home.module.scss';

interface HomeProps {
  sections: MainPageSection[];
}

const Home: React.FC<HomeProps> = ({ sections }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className={"bg-primary text-text py-4 " + styles.header}>
        <div className="container mx-auto text-center">
          <h1 className={styles.logo}>szwagrzak.pl</h1>
        </div>
      </header>
      <main className="container mx-auto py-6 flex-grow bg">
        {sections.map(section => (
          <section key={section.id} className={`mb-8 ${section.id === 1 ? styles['align-with-image'] : ''}`}>
            <h2 className="text-2xl font-bold">
              {section.title}
            </h2>
            <p className="mt-2">
              <span className={styles.body}>{section.body}</span>
              {section.id === 1 && <Image src='/images/me2.png' alt='' width={100} height={100} />}
            </p>
            <small>~ updated: {new Date(section.updated_at).toLocaleString()} ~</small>
          </section>
        ))}
      </main>
      <footer className="bg-primary text-text py-4 text-center">
        <p>&copy; 2024 Szwagrzak Artur. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
};

export default Home;
