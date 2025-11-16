import { useState, useEffect } from 'react';
import styles from '../styles/interests.module.scss';
import {
  getSectionsByTag,
  groupSectionsByTag,
} from '../services/sectionService';
import { SectionModel } from '../models/SectionModel';
import Section from './Section';
import Header from './Header';
import Footer from './Footer';
import { TAGS } from '../constants/tags';

const Interests: React.FC = () => {
  const [sections, setSections] = useState<SectionModel[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await getSectionsByTag(TAGS.HOBBIES);
        setSections(data);
      } catch (error) {
        console.error('Error fetching sections:', error);
        setError('Failed to fetch sections');
      }
    };

    void fetchSections();
  }, []);

  const groupedSections = groupSectionsByTag(sections);
  const hobbiesGroup = groupedSections[TAGS.HOBBIES] || [];

  return (
    <div
      className={`flex flex-col min-h-screen bg-background ${styles.interests}`}
    >
      <Header />
      <main className={`flex-grow ${styles.container}`}>
        {error && <div className={styles.error}>{error}</div>}
        {hobbiesGroup.length > 0 && (
          <Section group={hobbiesGroup} tag={TAGS.HOBBIES} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Interests;
