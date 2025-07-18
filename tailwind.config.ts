import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        // Fioletowa kolorystyka - kreatywna i nowoczesna
        primary: '#8B5CF6',      // Główny fioletowy
        accent: '#7C3AED',       // Ciemniejszy fioletowy (akcent)
        background: '#FAFAFA',   // Jasny tło
        heading: '#1F2937',      // Ciemny tekst dla nagłówków
        text: '#374151',         // Ciemny szary dla tekstu
        button: '#8B5CF6',       // Fioletowy dla przycisków
        border: '#E5E7EB',       // Jasny szary dla obramowań
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
