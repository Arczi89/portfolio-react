import { SectionModel } from '../models/SectionModel';

const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3002/api';

const FALLBACK_URL = 'http://localhost:3002/api';
const REQUEST_TIMEOUT = 5000;

export const getSections = async (): Promise<SectionModel[]> => {
  const urls = [BASE_URL, FALLBACK_URL];

  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      console.log(`Trying to fetch from: ${url}`);
      const response = await fetch(`${url}/sections`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json; charset=utf-8',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SectionModel[] = await response.json();
      console.log(`Successfully fetched data from: ${url}`);
      return data;
    } catch (error) {
      console.warn(`Failed to fetch from ${url}:`, error);
      if (url === urls[urls.length - 1]) {
        if (error instanceof Error) {
          if (error.name === 'AbortError') {
            console.error('Request timeout:', error.message);
            throw new Error('Request timeout - server is not responding');
          }
          console.error('Error in getSections:', error.message);
          throw error;
        }
        console.error('Unknown error in getSections:', error);
        throw new Error('Unknown error occurred');
      }
      continue;
    }
  }

  throw new Error('All API endpoints failed');
};

export const getSectionsByTag = async (
  tag: string
): Promise<SectionModel[]> => {
  const allSections = await getSections();
  return allSections.filter(section => section.tag === tag);
};

export const getAvailableTags = async (): Promise<string[]> => {
  const allSections = await getSections();
  const tags = [...new Set(allSections.map(section => section.tag))];
  return tags.sort();
};

export const groupSectionsByTag = (
  sections: SectionModel[]
): { [key: string]: SectionModel[] } => {
  return sections.reduce(
    (groups: { [key: string]: SectionModel[] }, section) => {
      const tag = section.tag;
      if (!groups[tag]) {
        groups[tag] = [];
      }
      groups[tag].push(section);
      return groups;
    },
    {}
  );
};
