-- Portfolio database initialization
USE dm77338_portfolio;

-- UTF-8 encoding setup
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

-- Main page sections table
CREATE TABLE IF NOT EXISTS main_page_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tag VARCHAR(50) NOT NULL,
  item_order INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample data insertion
INSERT INTO main_page_sections (id, tag, item_order, title, body, image) VALUES
(1, 'me', 1, 'O mnie', 'Jestem programistą z ponad 10-letnim doświadczeniem w komercyjnym tworzeniu oprogramowania. Przez całą swoją karierę pracowałem zarówno z technologiami webowymi, jak i backendem, jednak moją główną specjalizacją są technologie frontendowe, w szczególności Angular oraz ekosystem JavaScript.\r\nPosiadam doświadczenie w pracy w zespołach o różnych wielkościach, pracując w metodykach SCRUM i Kanban. Z sukcesem współpracowałem z klientami międzynarodowymi i w zespołach wielokulturowych, w których językiem komunikacji był angielski.\r\nStaram się tworzyć wydajny i wysokiej jakości kod, z dużym naciskiem na zasady czystego kodu. Sumiennie wykonuję przeglądy kodu i szczególnie interesuję się testami jednostkowymi oraz TDD.\r\nMam umiejętność rozwijania nowych funkcjonalności, a także utrzymywania i poprawiania kodu w istniejących aplikacjach. Biegle posługuję się systemem kontroli wersji Git, którego używam od początku mojej kariery. Jestem osobą szybko uczącą się – wielokrotnie miałem możliwość pracy z nowymi technologiami i dążę do bycia proaktywnym.\r\nWszechstronność to moja mocna strona: posiadam doświadczenie nie tylko w JavaScript, ale także w Javie, Kotlinie na Androida, Django oraz w pracy z bazami danych, takimi jak MongoDB, MySQL, Oracle DB i PostgreSQL. Karierę zaczynałem od PHP i frameworka Symfony2.', '/images/me.webp'),
(5, 'projects', 1, 'Projekty', '', '/images/projects.webp'),
(6, 'projects', 2, 'Projekty', 'https://relaksownia.org.pl/\r\nStrona internetowa Justyny która prowadzi mobilne centrum masażu. Strona składa się z kilku podstron oraz ma panel do zarządzania zawartością. Projekt jest napisany z użyciem frameworka Django w pythonie.', '/images/relaksownia.webp'),
(7, 'projects', 3, 'Projekty', 'Moja własna strona internetowa napisana w React.js.', '/images/szwagrzak_pl.webp'),
(50, 'abilities', 1, 'Umiejętności', 'Podczas mojej kariery programistycznej zdobyłem parę umiejętności, są to:', '/images/abilities.webp'),
(51, 'abilities', 2, 'Angular', ' ', '/images/angular2.webp'),
(52, 'abilities', 3, 'HTML', ' ', '/images/html.webp'),
(53, 'abilities', 4, 'Git', ' ', '/images/git.webp'),
(54, 'abilities', 5, 'CSS', ' ', '/images/css.webp'),
(55, 'abilities', 6, 'Java', ' ', '/images/java.webp'),
(66, 'abilities', 8, 'Kotlin', ' ', '/images/kotlin.webp'),
(67, 'abilities', 9, 'django', ' ', '/images/django.webp'),
(68, 'abilities', 10, 'Symfony2', ' ', '/images/symfony2.webp'),
(69, 'abilities', 11, 'Unit tests', ' ', '/images/unit_tests.webp'),
(70, 'abilities', 12, 'Angielski', ' ', '/images/english.webp'),
(71, 'abilities', 13, 'React.js', ' ', '/images/react.webp'),
(100, 'hobbies', 1, 'Planszówki', 'Jednym z moich największych hobby są planszówki. Mam kolekcję kilkudziesięciu gier które też często ogrywam ze znajomymi. Spotykam się regularnie na różnych wydarzeniach związanych z tym tematem. Uczestniczę aktywnie w życiu stowarzyszenia SGP Gambit w Gliwicach.', '/images/board_games.webp');

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
); 