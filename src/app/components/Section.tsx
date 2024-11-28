import { SectionModel } from '../models/SectionModel';
import styles from '../styles/section.module.scss';

interface SectionProps {
  group: SectionModel[];
  tag: string;
}

const link = (text: string): string => {
  const links = /(http|https|ftp):\/\/(\S*)/.exec(text);
  return links?.length ? links[0] : '';
}

const woLink = (text: string): string => {
  return text.replace(link(text), '');
}

const Section: React.FC<SectionProps> = ({ group, tag }) => {

  const firstSection = group ? group[0] : null;

  return (
  <section className={`mb-8 ${styles.section}`}>
    {firstSection?.image && <div className={styles["section-image"]}>
      <img className={styles.me} src={firstSection.image} alt='Artur' />
    </div>}
    <div className={styles["section-inner"]}>
      <h2 className="text-4xl font-bold">
        {firstSection && firstSection.title}
      </h2>
      <div className={styles[tag]}>
        {group?.map(sectionElement => (
          <div key={sectionElement.id} className={styles.paragraph}>
            {firstSection && firstSection.image !== sectionElement.image && sectionElement.image && <div className={styles["paragraph-image"]}>
              <img className={styles.me} src={sectionElement.image} alt={sectionElement.title} />
            </div>}
            <div className={styles['paragraph-body']}><a className="bold" href={link(sectionElement.body)}>{link(sectionElement.body)}</a> {woLink(sectionElement.body)}</div>
          </div>
        ))}
      </div>
    </div>
  </section>);
}

export default Section;