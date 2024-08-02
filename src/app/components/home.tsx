'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-primary text-text py-4">
        <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold">{t('welcome')}</h1>
        <p className="mt-2">{t('aboutMe')}</p>
        </div>
      </header>
      <main className="container mx-auto py-6 flex-grow bg">
        <section className="mb-8">
        <h2 className="text-2xl font-bold">{t('projects')}</h2>
        <p className="mt-2">{t('projectsDescription')}</p>
        </section>
        <section>
        <h2 className="text-2xl font-bold">{t('contact')}</h2>
        <p className="mt-2">{t('contactDescription')}</p>
        </section>
      </main>
      <footer className="bg-primary text-text py-4 text-center">
      <p>{t('footerText')}</p>
      </footer>
    </div>
  );
};

export default Home;
