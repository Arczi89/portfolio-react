import MainPageSection from '../models/mainPageSection';

interface SectionAttributes {
  id: number;
  tag: string;
  item_order: number;
  title?: string;
  body: string;
  created_at?: Date;
  updated_at?: Date;
  image?: string;
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
