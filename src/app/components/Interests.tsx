import { useState, useEffect } from "react";
import styles from "../styles/interests.module.scss";
import { getSections } from "../services/sectionService";
import { SectionModel } from "../models/SectionModel";
import Section from "./Section";
import Header from "./Header";

const tag = "hobbies";

const groupByTag = (sections: SectionModel[]) => {
  return sections?.reduce(
    (groups: { [key: string]: SectionModel[] }, section) => {
      const tag = section.tag;
      if (!groups[tag]) {
        groups[tag] = [];
      }
      groups[tag].push(section);
      return groups;
    },
    {},
  );
};

const Interests: React.FC = () => {
  const [sections, setSections] = useState<SectionModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getSections();
        setSections(data);
      } catch (error) {
        console.error("Error fetching sections:", error);
        setError("Failed to fetch sections");
      }
    };

    void fetchSections();
  }, []);

  const groupedSections = groupByTag(sections);
  const group = groupedSections[tag] || [];

  return (
    <div
      className={`min-h-screen flex flex-col bg-background ${styles.interests}`}
    >
      <Header />
      <main className={`mx-auto py-6 flex-grow ${styles.container}`}>
        {error && <div className={styles.error}>{error}</div>}
        {group.length > 0 && <Section group={group} tag={tag} />}
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

export default Interests;
