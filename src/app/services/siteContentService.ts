const BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://server.szwagrzak.pl/api'
    : 'http://localhost:3002/api');

export interface ConsultantProfile {
  full_name: string;
  headline: string;
  introduction: string;
  photo_url?: string;
  email: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
}

export interface Service {
  id: number;
  slug: string;
  name: string;
  summary: string;
  starting_price?: string;
  delivery_days?: number;
  delivery_hours?: number;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  client_name?: string;
  industry?: string;
  summary: string;
  project_url?: string;
  cover_image_url?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
}

export interface Testimonial {
  id: number;
  author_name: string;
  author_role?: string;
  company_name?: string;
  quote: string;
}

export interface SiteContent {
  profile: ConsultantProfile;
  services: Service[];
  projects: Project[];
  skills: Skill[];
  testimonials: Testimonial[];
}

const localSiteContent: SiteContent = {
  profile: {
    full_name: 'Artur Szwagrzak',
    headline:
      'Buduję strony dla firm i wspieram zespoły jako full-stack consultant.',
    introduction:
      'Mam ponad 10 lat doświadczenia w komercyjnym tworzeniu oprogramowania. Specjalizuję się w frontendzie, szczególnie Angularze, React i TypeScript, a doświadczenie backendowe w Java, Spring Boot, Django i Node.js pozwala mi patrzeć na produkt całościowo.',
    photo_url: '/images/me.webp',
    email: 'artur@szwagrzak.pl',
    location: 'Gliwice / zdalnie',
    linkedin_url: 'https://www.linkedin.com/in/artur-szwagrzak-744431102/',
    github_url: 'https://github.com/Arczi89',
  },
  services: [
    {
      id: 1,
      slug: 'strony-wizytowki',
      name: 'Strony wizytówki',
      summary:
        'Czytelna strona dla firmy, która ułatwia klientom kontakt i prezentuje ofertę.',
      starting_price: '3000.00',
      delivery_hours: 14,
    },
    {
      id: 2,
      slug: 'frontend-consulting',
      name: 'Konsulting frontendowy',
      summary:
        'Wsparcie zespołu w React, Angular, jakości kodu, dostępności i wydajności.',
      delivery_hours: 5,
    },
    {
      id: 3,
      slug: 'audyt-frontend',
      name: 'Audyt frontendowy',
      summary:
        'Audyt jakości, dostępności, wydajności i architektury aplikacji wraz z listą praktycznych rekomendacji.',
      starting_price: '1800.00',
      delivery_hours: 5,
    },
  ],
  projects: [
    {
      id: 1,
      slug: 'relaksownia',
      title: 'Relaksownia',
      client_name: 'Mobilne centrum masażu',
      industry: 'Usługi',
      summary:
        'Strona z ofertą, treściami zarządzanymi przez klientkę i prostą drogą do kontaktu.',
      project_url: 'https://relaksownia.org.pl/',
      cover_image_url: '/images/relaksownia.webp',
    },
    {
      id: 2,
      slug: 'portfolio-react',
      title: 'Portfolio React',
      client_name: 'Projekt własny',
      industry: 'Technologia',
      summary: 'Strona portfolio z React, Node.js, MySQL, Docker i TypeScript.',
      project_url: 'https://szwagrzak.pl/',
      cover_image_url: '/images/szwagrzak_pl.webp',
    },
    {
      id: 3,
      slug: 'angular-base',
      title: 'Angular Base',
      client_name: 'Projekt własny',
      industry: 'Component library',
      summary:
        'Rozwijana biblioteka komponentów i szablon dla nowych aplikacji Angular.',
      project_url: 'https://demo.szwagrzak.pl/',
    },
    {
      id: 4,
      slug: 'bgpack',
      title: 'bgpack',
      client_name: 'Projekt własny',
      industry: 'Aplikacja webowa',
      summary:
        'Agregator kolekcji gier planszowych BoardGameGeek z sortowaniem, filtrowaniem i zapisywaniem list.',
    },
  ],
  skills: [
    { id: 1, name: 'Angular', category: 'Frontend' },
    { id: 2, name: 'React', category: 'Frontend' },
    { id: 3, name: 'TypeScript', category: 'Frontend' },
    { id: 4, name: 'JavaScript', category: 'Frontend' },
    { id: 5, name: 'Java i Spring Boot', category: 'Backend' },
    { id: 6, name: 'Django i Python', category: 'Backend' },
    { id: 7, name: 'MySQL i PostgreSQL', category: 'Bazy danych' },
    { id: 8, name: 'Jest i TDD', category: 'Jakość' },
    { id: 9, name: 'Docker i CI/CD', category: 'DevOps' },
  ],
  testimonials: [],
};

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const response = await fetch(`${BASE_URL}/site-content`);

    if (!response.ok) {
      return localSiteContent;
    }

    return response.json() as Promise<SiteContent>;
  } catch {
    return localSiteContent;
  }
}
