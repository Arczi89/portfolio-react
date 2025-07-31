import { useState, useEffect } from 'react';
import styles from '../styles/home.module.scss';
import { getSections, groupSectionsByTag } from '../services/sectionService';
import { SectionModel } from '../models/SectionModel';
import Section from './Section';
import Header from './Header';
import { MAIN_PAGE_TAGS } from '../constants/tags';

const Home: React.FC = () => {
  const [sections, setSections] = useState<SectionModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getSections();
        setSections(data);
      } catch (error) {
        console.error('Error fetching sections:', error);
        setError('Failed to fetch sections');
      }
    };

    void fetchSections();
  }, []);

  const filteredSections = sections.filter(section =>
    MAIN_PAGE_TAGS.includes(section.tag as any)
  );
  const groupedSections = groupSectionsByTag(filteredSections);

  return (
    <div className={`flex flex-col min-h-screen bg-background ${styles.home}`}>
      <Header />
      <main
        className={`mx-auto py-6 flex-grow px-4 sm:px-6 lg:px-8 ${styles.container}`}
      >
        {error && <div className={styles.error}>{error}</div>}
        {groupedSections &&
          Object.keys(groupedSections).map(tag => {
            const group = groupedSections[tag];
            return <Section group={group} tag={tag} key={tag} />;
          })}
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

export default Home;
