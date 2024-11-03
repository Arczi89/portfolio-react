import { useState, useEffect } from "react";
import styles from '../styles/home.module.scss';
import { getSections } from "../services/sectionService";
import { Section } from "../models/Section";

const groupByTag = (sections: Section[]) => {
  return sections?.reduce((groups: { [key: string]: Section[] }, section) => {
    const tag = section.tag;
    if (!groups[tag]) {
      groups[tag] = [];
    }
    groups[tag].push(section);
    return groups;
  }, {});
};
const Home: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getSections();
        setSections(data);
      } catch (error) {
        console.error('Error fetching sections:', error);
        setError("Failed to fetch sections");
      }
    };

    void fetchSections();
  }, []);

  const groupedSections = groupByTag(sections);
  return (
    <div className={`flex flex-col min-h-screen bg-background ${styles.home}`}>
      <header className={`bg-primary text-text py-4 ${styles.header}`}>
        <div className="container mx-auto text-center">
          <h1 className={styles.logo}><span>&lt;szwagrzak_pl/&gt;</span></h1>
        </div>
      </header>
      <main className={`mx-auto py-6 flex-grow ${styles.container}`}>
      {error && <div className="text-red-500">{error}</div>} 
        {groupedSections && Object.keys(groupedSections).map(tag => {
          const group = groupedSections[tag];
          const firstSection = group[0];
          return (
            <section key={tag} className={`mb-8 ${styles.section}`}>
              {firstSection.image && <div className={styles["section-image"]}>
                <img className={styles.me} src={firstSection.image} alt='Artur' />
              </div>}
              <div className={styles["section-inner"]}>
                <h2 className="text-4xl font-bold">
                  {firstSection.title}
                </h2>
                <div className={styles[tag]}>
                  {group.map(section => (
                    <div key={section.id} className={styles.paragraph}>
                      {firstSection.image !== section.image && section.image && <div className={styles["paragraph-image"]}>
                        <img className={styles.me} src={section.image} alt={section.title} />
                      </div>}
                      <div className={styles['paragraph-body']}>{section.body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>
      <footer className="bg-primary text-text py-4 text-center">
        <p>&copy; 2024 Szwagrzak Artur. Wszelkie prawa zastrzeżone. Kontakt: artur@szwagrzak.pl</p>
      </footer>
    </div>
  );
};

export default Home;
