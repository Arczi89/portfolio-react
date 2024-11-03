import { Section } from "../models/Section";

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export const getSections = async (): Promise<Section[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/sections`);
    if (!response.ok) {
      throw new Error(`Error fetching sections: ${response.statusText}`);
    }
    const data: Section[] = await response.json() as Section[];
    return data;
  } catch (error) {
    console.error("Error in getSections:", error);
    throw error;
  }
};
