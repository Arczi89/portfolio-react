import { useEffect, useState } from 'react';
import styles from '../styles/home.module.scss';
import Header from './Header';
import Footer from './Footer';
import { getSiteContent, SiteContent } from '../services/siteContentService';

const Home: React.FC = () => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setContent(await getSiteContent());
      } catch (error) {
        console.error('Error fetching site content:', error);
        setError('Nie udało się pobrać treści. Spróbuj odświeżyć stronę.');
      }
    };

    void fetchContent();
  }, []);

  const profile = content?.profile;

  return (
    <div className={styles.home}>
      <Header />
      <main>
        {error && <div className={styles.error}>{error}</div>}
        {profile && (
          <>
            <section className={styles.hero} id="start">
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>
                  STRONY DLA FIRM I KONSULTING FRONTEND
                </p>
                <h2>{profile.headline}</h2>
                <p className={styles.lead}>{profile.introduction}</p>
                <div className={styles.heroActions}>
                  <a className={styles.primaryAction} href="#kontakt">
                    Porozmawiajmy o projekcie
                  </a>
                  <a className={styles.secondaryAction} href="#realizacje">
                    Zobacz realizacje
                  </a>
                </div>
              </div>
              <div className={styles.profilePanel}>
                {profile.photo_url && (
                  <img
                    src={profile.photo_url}
                    alt={`Portret ${profile.full_name}`}
                  />
                )}
                <p>{profile.full_name}</p>
                <span>{profile.location}</span>
              </div>
            </section>

            <section className={styles.section} id="oferta">
              <p className={styles.eyebrow}>WSPÓŁPRACA</p>
              <h2>Wybierz wsparcie dopasowane do celu</h2>
              <div className={styles.serviceGrid}>
                {content.services.map(service => (
                  <article className={styles.service} key={service.id}>
                    <h3>{service.name}</h3>
                    <p>{service.summary}</p>
                    <dl>
                      {service.starting_price && (
                        <div>
                          <dt>Budżet od</dt>
                          <dd>
                            {Number(service.starting_price).toLocaleString(
                              'pl-PL'
                            )}{' '}
                            zł
                          </dd>
                        </div>
                      )}
                      {service.delivery_hours && (
                        <div>
                          <dt>już za </dt>
                          <dd>{service.delivery_hours} za godzinę</dd>
                        </div>
                      )}
                      {service.delivery_days && (
                        <div>
                          <dt>Czas realizacji</dt>
                          <dd>{service.delivery_days} dni</dd>
                        </div>
                      )}
                    </dl>
                  </article>
                ))}
              </div>
            </section>

            <section
              className={`${styles.section} ${styles.projects}`}
              id="realizacje"
            >
              <p className={styles.eyebrow}>WYBRANE PROJEKTY</p>
              <h2>Praca, którą można zobaczyć</h2>
              <div className={styles.projectGrid}>
                {content.projects.map(project => (
                  <article className={styles.project} key={project.id}>
                    {project.cover_image_url && (
                      <div className={styles.projectPreview}>
                        <img
                          src={project.cover_image_url}
                          alt={`Górna część strony ${project.title}`}
                        />
                      </div>
                    )}
                    <div>
                      <p>{project.industry}</p>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Otwórz stronę
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.section} id="konsulting">
              <p className={styles.eyebrow}>DLA ZESPOŁÓW I REKRUTERÓW</p>
              <h2>Doświadczenie, które wnosi porządek do produktu</h2>
              <p className={styles.consultingLead}>
                Wspieram rozwój aplikacji frontendowych: od decyzji
                architektonicznych i implementacji po testy, dostępność oraz
                jakość dostarczania.
              </p>
              <div className={styles.skills}>
                {content.skills.map(skill => (
                  <span key={skill.id}>{skill.name}</span>
                ))}
              </div>
            </section>

            <section
              className={`${styles.section} ${styles.contactSection}`}
              id="kontakt"
            >
              <div>
                <p className={styles.eyebrow}>KONTAKT</p>
                <h2>Opowiedz, nad czym pracujesz</h2>
                <p>
                  Napisz w sprawie strony dla firmy, konsultingu lub współpracy
                  rekrutacyjnej.
                </p>
              </div>
              <a className={styles.primaryAction} href="/contact">
                Przejdź do formularza
              </a>
            </section>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;
