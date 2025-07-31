import React from 'react';
import styles from '../styles/section.module.scss';
import { SectionModel } from '../models/SectionModel';
import { TAG_LABELS } from '../constants/tags';

interface SectionProps {
  group: SectionModel[];
  tag: string;
}

const link = (text: string): string => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const match = text.match(urlRegex);
  return match ? match[0] : '';
};

const woLink = (text: string): string => {
  return text.replace(link(text), '');
};

const Section: React.FC<SectionProps> = ({ group, tag }) => {
  const firstSection = group ? group[0] : null;
  const tagLabel = TAG_LABELS[tag] || tag;

  return (
    <section className={`mb-8 ${styles.section}`}>
      {firstSection?.image && (
        <div className={styles['section-image']}>
          <img className={styles.me} src={firstSection.image} alt={tagLabel} />
        </div>
      )}
      <div className={styles['section-inner']}>
        <h2 className="text-4xl font-bold">
          {firstSection && firstSection.title}
        </h2>
        <div className={styles[tag]}>
          {group?.map(sectionElement => {
            const textContent = woLink(sectionElement.body).trim();
            const hasLink = link(sectionElement.body);
            const hasImage = sectionElement.image && firstSection?.image !== sectionElement.image;
            
            if (!hasImage && !textContent && !hasLink) {
              return null;
            }

            return (
              <div key={sectionElement.id} className={styles.paragraph}>
                {hasImage && (
                  <div className={styles['paragraph-image']}>
                    <img
                      className={styles.me}
                      src={sectionElement.image}
                      alt={sectionElement.title}
                    />
                  </div>
                )}
                <div className={styles['paragraph-body']}>
                  {hasLink && (
                    <a className="bold" href={hasLink}>
                      {hasLink}
                    </a>
                  )}
                  {textContent && (
                    <>
                      {hasLink && ' '}
                      {textContent}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Section;
