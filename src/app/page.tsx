'use client';
import { I18nextProvider } from 'react-i18next';
import Home from './components/home';
import { useEffect, useState } from 'react';
import { i18n } from 'next-i18next';
import { useRouter, usePathname } from 'next/navigation';

const Page = () => {
  const [i18nInitialized, setI18nInitialized] = useState(false);
  const defaultLocale = 'en';
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    const loadTranslations = async () => {
      const { serverSideTranslations } = await import('next-i18next/serverSideTranslations');
      const translations = await serverSideTranslations(defaultLocale, ['common']);
      if (i18n) {
        i18n.addResources(defaultLocale, 'common', translations);
        setI18nInitialized(true);
      }
    };
    
    void loadTranslations();
  }, [pathname, router]);

  if (!i18nInitialized) {
    return null; // TODO loading component
  }
  
  return (
    <I18nextProvider i18n={i18n!}>
      <Home/>
    </I18nextProvider>
  );
};

export default Page;
