import { Section } from "../models/Section";

export const getSections = async (): Promise<Section[]> => {
  try {
    const response = await fetch('http://localhost:3001/api/sections');
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
