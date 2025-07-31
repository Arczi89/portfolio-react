const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:3002/api';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: number;
}

export const sendContactMessage = async (
  data: ContactFormData
): Promise<ContactResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result: ContactResponse = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || 'Wystąpił błąd podczas wysyłania wiadomości'
      );
    }

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Nieznany błąd podczas wysyłania wiadomości');
  }
};
