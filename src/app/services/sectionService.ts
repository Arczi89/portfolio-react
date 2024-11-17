import { SectionModel } from "../models/SectionModel";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3002/api';

export const getSections = async (): Promise<SectionModel[]> => {
  try {
    const response = await fetch(`${BASE_URL}/sections`);
    if (!response.ok) {
      throw new Error(`Error fetching sections: ${response.statusText}`);
    }
    const data: SectionModel[] = await response.json() as SectionModel[];
    return data;
  } catch (error) {
    console.error("Error in getSections:", error);
    throw error;
  }
};
