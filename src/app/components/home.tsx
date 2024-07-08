import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-text py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Witaj na mojej stronie głównej!</h1>
          <p className="mt-2">Jestem programistą z pasją do tworzenia aplikacji webowych.</p>
        </div>
      </header>
      <main className="container mx-auto py-6 flex-grow">
        <section className="mb-8">
          <h2 className="text-2xl font-bold">O mnie</h2>
          <p className="mt-2">
            Jestem entuzjastą technologii i pasjonatem pisania kodu. Moje zainteresowania obejmują frontend, backend oraz wszystko, co związane z aplikacjami internetowymi.
          </p>
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
            Masz pytania lub chcesz się skontaktować? Skorzystaj z formularza kontaktowego lub odwiedź moje profile na mediach społecznościowych.
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
