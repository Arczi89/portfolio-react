CREATE TABLE IF NOT EXISTS consultant_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  headline VARCHAR(255) NOT NULL,
  introduction TEXT NOT NULL,
  photo_url VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  linkedin_url VARCHAR(255),
  github_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  starting_price DECIMAL(10, 2),
  delivery_days INT,
  delivery_hours INT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT NOT NULL,
  feature VARCHAR(255) NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  client_name VARCHAR(255),
  industry VARCHAR(255),
  summary TEXT NOT NULL,
  challenge TEXT,
  solution TEXT,
  project_url VARCHAR(255),
  cover_image_url VARCHAR(255),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  published_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL,
  proficiency VARCHAR(50),
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_name VARCHAR(255) NOT NULL,
  author_role VARCHAR(255),
  company_name VARCHAR(255),
  quote TEXT NOT NULL,
  project_id INT NULL,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE contact_messages
  ADD COLUMN phone VARCHAR(255) NULL AFTER email,
  ADD COLUMN company VARCHAR(255) NULL AFTER phone,
  ADD COLUMN inquiry_type ENUM('website', 'consulting', 'recruitment', 'other') NOT NULL DEFAULT 'other' AFTER company,
  ADD COLUMN budget_range VARCHAR(100) NULL AFTER inquiry_type,
  ADD COLUMN contact_status ENUM('new', 'contacted', 'qualified', 'archived') NOT NULL DEFAULT 'new' AFTER budget_range,
  ADD COLUMN consent_at TIMESTAMP NULL AFTER message,
  ADD COLUMN consent_version VARCHAR(50) NULL AFTER consent_at;

INSERT INTO consultant_profiles (full_name, headline, introduction, photo_url, email, location)
SELECT
  'Artur Szwagrzak',
  'Tworzę strony, które budują zaufanie. Wspieram zespoły jako frontend consultant.',
  'Łączę ponad 10 lat doświadczenia w tworzeniu produktów cyfrowych z praktycznym podejściem do potrzeb małych firm i zespołów technologicznych.',
  '/images/me.webp',
  'artur@szwagrzak.pl',
  'Gliwice / zdalnie'
WHERE NOT EXISTS (SELECT 1 FROM consultant_profiles);

INSERT INTO services (slug, name, summary, starting_price, delivery_days, display_order)
SELECT 'strony-wizytowki', 'Strony wizytówki', 'Czytelna strona dla firmy, która ułatwia klientom kontakt i prezentuje ofertę.', 3000.00, 14, 1
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'strony-wizytowki');

INSERT INTO services (slug, name, summary, delivery_days, display_order)
SELECT 'frontend-consulting', 'Konsulting frontendowy', 'Wsparcie zespołu w React, Angular, jakości kodu, dostępności i wydajności.', 5, 2
WHERE NOT EXISTS (SELECT 1 FROM services WHERE slug = 'frontend-consulting');

INSERT INTO projects (slug, title, client_name, industry, summary, project_url, cover_image_url, is_featured, display_order, published_at)
SELECT 'relaksownia', 'Relaksownia', 'Mobilne centrum masażu', 'Usługi', 'Strona z ofertą, treściami zarządzanymi przez klientkę i prostą drogą do kontaktu.', 'https://relaksownia.org.pl/', '/images/relaksownia.webp', TRUE, 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM projects WHERE slug = 'relaksownia');

INSERT INTO skills (name, category, display_order)
SELECT 'React', 'Frontend', 1 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'React');
INSERT INTO skills (name, category, display_order)
SELECT 'Angular', 'Frontend', 2 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Angular');
INSERT INTO skills (name, category, display_order)
SELECT 'TypeScript', 'Frontend', 3 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'TypeScript');
INSERT INTO skills (name, category, display_order)
SELECT 'Testy jednostkowe', 'Jakość', 4 WHERE NOT EXISTS (SELECT 1 FROM skills WHERE name = 'Testy jednostkowe');