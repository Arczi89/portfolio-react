import type { NextApiRequest, NextApiResponse } from 'next';
import { getSections } from '../../lib/content';

interface SectionAttributes {
  id: number;
  section: string;
  title: string;
  body: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const sections: SectionAttributes[] = await getSections();
    res.status(200).json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
