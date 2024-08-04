'use client';
import Link from 'next/link';
import React from 'react';
import { FaLinkedin } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="bg-primary text-text py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Witaj na mojej stronie głównej!</h1>
          <p className="mt-2">Jestem programistą z pasją do tworzenia aplikacji webowych.</p>
        </div>
      </header>
      <main className="container mx-auto py-6 flex-grow bg">
        <section className="mb-8">
          <h2 className="text-2xl font-bold">O mnie</h2>
          <p className="mt-2"></p>
          <p>Jestem programistą z ponad 10-letnim doświadczeniem, obejmującym pisanie aplikacji internetowych (Java Struts, Angular), aplikacji na system Android (Kotlin) oraz pracę na backendzie (Java, SQL). W mojej karierze zajmowałem się tworzeniem i naprawianiem różnorodnych funkcjonalności, a także pisałem testy, korzystając z nowoczesnych frameworków.</p>
          <p>Pracowałem zarówno w zespołach SCRUMowych, jak i międzynarodowych, gdzie konieczna była ciągła komunikacja i współpraca z klientami zagranicznymi w języku angielskim. Moje główne zainteresowania skupiają się na technologiach webowych, JavaScript, zwłaszcza na frameworku Angular. Dodatkowo, pasjonuję się tematyką testów jednostkowych oraz podejścia TDD. Zawsze stawiam na wysoką jakość kodu, przestrzegając zasad clean code.</p>
          <p>Posiadam zdolność do kreatywnej pracy nad nowymi funkcjonalnościami, ale również do efektywnej współpracy z kodem legacy. Doskonale znam system kontroli wersji git, korzystając z niego praktycznie od początku mojej kariery zawodowej. Moje doświadczenie obejmuje szeroki zakres języków programowania, praktyki pracy z CD/CI (m.in. GitLab, webpack, tworzenie pipelinów), operowanie narzędziem Docker, pisanie testów jednostkowych i automatycznych, oraz analizowanie dokumentacji i szkiców, np. w programie Figma.</p>
          <p>Jestem otwarty na rozwój umiejętności miękkich i poznawanie nowych technologii i bibliotek. Staram się mieć dobre stosunki z zespołem i dbać o team spirit. Lubię współpracować i wymieniać się wiedzą.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold">Projekty</h2>
          <p className="mt-2">
            Tutaj możesz zaprezentować swoje projekty lub plany na przyszłość.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">Kontakt</h2>
          <p className="mt-2">
            Masz pytania lub chcesz się skontaktować? Skorzystaj z formularza kontaktowego lub odwiedź moje profile na mediach społecznościowych. <a className='social' target="_blank" rel="noopener noreferrer" href={'https://www.linkedin.com/in/artur-szwagrzak-744431102/'}><FaLinkedin size={28} /></a>
          </p>
        </section>
      </main>
      <footer className="bg-primary text-text py-4 text-center">
        <p>&copy; 2024 Moja Strona. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
};

export default Home;
