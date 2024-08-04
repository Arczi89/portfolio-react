import MainPageSection from '../models/mainPageSection';

interface SectionAttributes {
  id: number;
  section: string;
  title: string;
  body: string;
}

async function getSections(): Promise<SectionAttributes[]> {
  try {
    const sections = await MainPageSection.findAll();
    return sections.map(section => section.toJSON());
  } catch (error) {
    console.error('Error fetching sections:', error);
    throw error;
  }
}

export { getSections };
