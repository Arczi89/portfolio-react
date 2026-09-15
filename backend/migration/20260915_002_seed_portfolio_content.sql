UPDATE consultant_profiles
SET
  headline = 'Buduję strony dla firm i wspieram zespoły jako full-stack consultant.',
  introduction = 'Mam ponad 10 lat doświadczenia w komercyjnym tworzeniu oprogramowania. Specjalizuję się w frontendzie, szczególnie Angularze, React i TypeScript, a doświadczenie backendowe w Java, Spring Boot, Django i Node.js pozwala mi patrzeć na produkt całościowo.',
  photo_url = '/images/me.webp',
  email = 'artur@szwagrzak.pl',
  location = 'Gliwice / zdalnie',
  linkedin_url = 'https://www.linkedin.com/in/artur-szwagrzak-744431102/',
  github_url = 'https://github.com/Arczi89'
WHERE full_name = 'Artur Szwagrzak';

INSERT INTO services (slug, name, summary, starting_price, delivery_days, delivery_hours, display_order)
SELECT 'audyt-frontend', 'Audyt frontendowy', 'Audyt jakości, dostępności, wydajności i architektury aplikacji wraz z listą praktycznych rekomendacji.', 1800.00, null, 5, 3
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'audyt-frontend');

INSERT INTO service_features (service_id, feature, display_order)
SELECT s.id, 'Responsywny projekt dla telefonów i desktopów', 1
FROM services s
WHERE s.slug = 'strony-wizytowki'
  AND NOT EXISTS (SELECT 1 FROM service_features f WHERE f.service_id = s.id AND f.feature = 'Responsywny projekt dla telefonów i desktopów');

INSERT INTO service_features (service_id, feature, display_order)
SELECT s.id, 'Formularz kontaktowy i podstawy SEO', 2
FROM services s
WHERE s.slug = 'strony-wizytowki'
  AND NOT EXISTS (SELECT 1 FROM service_features f WHERE f.service_id = s.id AND f.feature = 'Formularz kontaktowy i podstawy SEO');

INSERT INTO service_features (service_id, feature, display_order)
SELECT s.id, 'Code review i wsparcie architektoniczne', 1
FROM services s
WHERE s.slug = 'frontend-consulting'
  AND NOT EXISTS (SELECT 1 FROM service_features f WHERE f.service_id = s.id AND f.feature = 'Code review i wsparcie architektoniczne');

INSERT INTO service_features (service_id, feature, display_order)
SELECT s.id, 'React, Angular, TypeScript, testy i dostępność', 2
FROM services s
WHERE s.slug = 'frontend-consulting'
  AND NOT EXISTS (SELECT 1 FROM service_features f WHERE f.service_id = s.id AND f.feature = 'React, Angular, TypeScript, testy i dostępność');

INSERT INTO projects (slug, title, client_name, industry, summary, challenge, solution, project_url, cover_image_url, is_featured, display_order, published_at)
SELECT 'portfolio-react', 'Portfolio React', 'Projekt własny', 'Technologia', 'Strona portfolio z React, Node.js, MySQL, Docker i TypeScript.', 'Stworzenie szybkiego portfolio z bezpiecznym kontaktem i możliwością dalszej rozbudowy treści.', 'Responsywny frontend React, API Express, szyfrowanie danych formularza i powiadomienia e-mail.', 'https://szwagrzak.pl/', '/images/szwagrzak_pl.webp', TRUE, 2, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'portfolio-react');

INSERT INTO projects (slug, title, client_name, industry, summary, challenge, solution, project_url, cover_image_url, is_featured, display_order, published_at)
SELECT 'angular-base', 'Angular Base', 'Projekt własny', 'Component library', 'Rozwijana biblioteka komponentów i szablon dla nowych aplikacji Angular.', 'Ujednolicenie powtarzalnych elementów interfejsu i ustanowienie modularnej bazy dla kolejnych projektów.', 'Współdzielone komponenty Angular, TypeScript i SCSS z modularną architekturą.', 'https://demo.szwagrzak.pl/', NULL, FALSE, 3, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'angular-base');

INSERT INTO projects (slug, title, client_name, industry, summary, challenge, solution, is_featured, display_order, published_at)
SELECT 'bgpack', 'bgpack', 'Projekt własny', 'Aplikacja webowa', 'Agregator kolekcji gier planszowych BoardGameGeek z sortowaniem, filtrowaniem i zapisywaniem list.', 'Połączenie danych użytkowników BoardGameGeek w jedną, wygodną do przeglądania listę.', 'Frontend React i TypeScript połączony z backendem Java Spring Boot.', FALSE, 4, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'bgpack');

INSERT INTO skills (name, category, proficiency, display_order)
SELECT 'Angular', 'Frontend', 'Zaawansowany', 1 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Angular');
INSERT INTO skills (name, category, proficiency, display_order)
SELECT 'React', 'Frontend', 'Zaawansowany', 2 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'React');
INSERT INTO skills (name, category, proficiency, display_order)
SELECT 'TypeScript', 'Frontend', 'Zaawansowany', 3 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'TypeScript');
INSERT INTO skills (name, category, proficiency, display_order)
SELECT 'JavaScript', 'Frontend', 'Zaawansowany', 4 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'JavaScript');
INSERT INTO skills (name, category, proficiency, display_order)
SELECT 'Java i Spring Boot', 'Backend', 'Zaawansowany', 5 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Java i Spring Boot');
INSERT INTO skills (name, category, proficiency, display_order)
SELECT 'Node.js i Express', 'Backend', 'Praktyczny', 6 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Node.js i Express');
INSERT INTO skills (name, category, proficiency, display_order)
SELECT 'Django i Python', 'Backend', 'Praktyczny', 7 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Django i Python');
INSERT INTO skills (name, category, proficiency, display_order)
SELECT 'MySQL, PostgreSQL i MongoDB', 'Bazy danych', 'Praktyczny', 8 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'MySQL, PostgreSQL i MongoDB');
INSERT INTO skills (name, category, proficiency, display_order)
SELECT 'Jest, TDD i testy jednostkowe', 'Jakość', 'Zaawansowany', 9 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Jest, TDD i testy jednostkowe');
INSERT INTO skills (name, category, proficiency, display_order)
SELECT 'Docker, Git i CI/CD', 'DevOps', 'Praktyczny', 10 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Docker, Git i CI/CD');