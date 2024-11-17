import { useState, useEffect } from "react";
import styles from '../styles/home-page.module.scss';
import { getSections } from "../services/sectionService";
import { SectionModel } from "../models/SectionModel";
import Section from "./Section";

const groupByTag = (sections: SectionModel[]) => {
  return sections?.reduce((groups: { [key: string]: SectionModel[] }, section) => {
    const tag = section.tag;
    if (!groups[tag]) {
      groups[tag] = [];
    }
    groups[tag].push(section);
    return groups;
  }, {});
};

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
          <h1 className={styles.logo}><div className={styles.animated}>&lt;szwagrzak_pl/&gt;</div></h1>
        </div>
      </header>
      <main className={`mx-auto py-6 flex-grow ${styles.container}`}>
        {error && <div className={styles.error}>{error}</div>}
        {groupedSections && Object.keys(groupedSections).map(tag => {
          const group = groupedSections[tag];
          return <Section group={group} tag={tag} key={tag} />;
        })}
      </main>
      <footer className="bg-primary text-text py-4 text-center">
        <p>&copy; 2024 Szwagrzak Artur. Wszelkie prawa zastrzeżone. Kontakt: artur@szwagrzak.pl</p>
      </footer>
    </div>
  );
};

export default Home;
