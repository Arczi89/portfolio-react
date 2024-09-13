import Image from 'next/image';
import MainPageSection from '@/models/mainPageSection';
import React from 'react';
import styles from './home.module.scss';

interface HomeProps {
  sections: MainPageSection[];
}

const groupByTag = (sections: MainPageSection[]) => {
  return sections?.reduce((groups: { [key: string]: MainPageSection[] }, section) => {
    const tag = section.tag;
    if (!groups[tag]) {
      groups[tag] = [];
    }
    groups[tag].push(section);
    return groups;
  }, {});
};
const Home: React.FC<HomeProps> = ({ sections }) => {
  const groupedSections = groupByTag(sections);
  return (
    <div className={`flex flex-col min-h-screen bg-background ${styles.home}`}>
      <header className={`bg-primary text-text py-4 ${styles.header}`}>
        <div className="container mx-auto text-center">
          <h1 className={styles.logo}><span>&lt;szwagrzak_pl/&gt;</span></h1>
        </div>
      </header>
      <main className={`mx-auto py-6 flex-grow ${styles.container}`}>
        {groupedSections && Object.keys(groupedSections).map(tag => {
          const group = groupedSections[tag];
          const firstSection = group[0];
          return (
            <section key={tag} className={`mb-8 ${styles.section}`}>
              {firstSection.image && <div className={styles["section-image"]}>
                <Image className={styles.me} src={firstSection.image} alt='' width={400} height={400} />
              </div>}
              <div className={styles["section-inner"]}>
                <h2 className="text-4xl font-bold">
                  {firstSection.title}
                </h2>
                <div className={styles[tag]}>
                  {group.map(section => (
                    <div key={section.id} className={styles.paragraph}>
                      {firstSection.image !== section.image && section.image && <div className={styles["paragraph-image"]}>
                        <Image className={styles.me} src={section.image} alt={section.title} width={400} height={400} />
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
        <p>&copy; 2024 Szwagrzak Artur. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
};

export default Home;
