CREATE TABLE IF NOT EXISTS `main_page_sections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) DEFAULT NULL,
  `item_order` int(11) DEFAULT 1,
  `title` varchar(255) DEFAULT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `image` char(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Zrzut danych tabeli `main_page_sections`
--

INSERT INTO `main_page_sections` (`id`, `tag`, `item_order`, `title`, `body`, `created_at`, `updated_at`, `image`) VALUES
(1, 'me', 1, 'O mnie', 'Jestem programistą z ponad 10-letnim doświadczeniem w komercyjnym tworzeniu oprogramowania. Przez całą swoją karierę pracowałem zarówno z technologiami webowymi, jak i backendem, jednak moją główną specjalizacją są technologie frontendowe, w szczególności Angular oraz ekosystem JavaScript.\r\nPosiadam doświadczenie w pracy w zespołach o różnych wielkościach, pracując w metodykach SCRUM i Kanban. Z sukcesem współpracowałem z klientami międzynarodowymi i w zespołach wielokulturowych, w których językiem komunikacji był angielski.\r\nStaram się tworzyć wydajny i wysokiej jakości kod, z dużym naciskiem na zasady czystego kodu. Sumiennie wykonuję przeglądy kodu i szczególnie interesuję się testami jednostkowymi oraz TDD.\r\nMam umiejętność rozwijania nowych funkcjonalności, a także utrzymywania i poprawiania kodu w istniejących aplikacjach. Biegle posługuję się systemem kontroli wersji Git, którego używam od początku mojej kariery. Jestem osobą szybko uczącą się – wielokrotnie miałem możliwość pracy z nowymi technologiami i dążę do bycia proaktywnym.\r\nWszechstronność to moja mocna strona: posiadam doświadczenie nie tylko w JavaScript, ale także w Javie, Kotlinie na Androida, Django oraz w pracy z bazami danych, takimi jak MongoDB, MySQL, Oracle DB i PostgreSQL. Karierę zaczynałem od PHP i frameworka Symfony2.', '2024-11-03 15:05:59', '2024-11-03 15:05:59', '/images/me.webp'),
(5, 'projects', 1, 'Projekty', '', '2024-09-12 16:03:37', '2024-09-12 16:03:37', '/images/projects.webp'),
(6, 'projects', 2, 'Projekty', 'https://relaksownia.org.pl/\r\nStrona internetowa Justyny która prowadzi mobilne centrum masażu. Strona składa się z kilku podstron oraz ma panel do zarządzania zawartością. Projekt jest napisany z użyciem frameworka Django w pythonie.', '2024-09-12 16:03:37', '2024-09-12 16:03:37', '/images/relaksownia.webp'),
(7, 'projects', 3, 'Projekty', 'Moja własna strona internetowa napisana w React.js.', '2024-09-12 16:03:37', '2024-09-12 16:03:37', '/images/szwagrzak_pl.webp'),
(50, 'abilities', 1, 'Umiejętności', 'Podczas mojej kariery programistycznej zdobyłem parę umiejętności, są to:', '2024-09-12 18:48:49', '2024-09-12 18:48:49', '/images/abilities.webp'),
(51, 'abilities', 2, 'Angular', ' ', '2024-09-12 18:51:48', '2024-09-12 18:51:48', '/images/angular2.webp'),
(52, 'abilities', 3, 'HTML', ' ', '2024-09-12 18:58:43', '2024-09-12 18:58:43', '/images/html.webp'),
(53, 'abilities', 4, 'Git', ' ', '2024-09-12 18:58:43', '2024-09-12 18:58:43', '/images/git.webp'),
(54, 'abilities', 5, 'CSS', ' ', '2024-09-12 18:58:43', '2024-09-12 18:58:43', '/images/css.webp'),
(55, 'abilities', 6, 'Java', ' ', '2024-09-12 18:58:43', '2024-09-12 18:58:43', '/images/java.webp'),
(66, 'abilities', 8, 'Kotlin', ' ', '2024-09-12 18:58:43', '2024-09-12 18:58:43', '/images/kotlin.webp'),
(67, 'abilities', 9, 'django', ' ', '2024-09-12 18:58:43', '2024-09-12 18:58:43', '/images/django.webp'),
(68, 'abilities', 10, 'Symfony2', ' ', '2024-09-12 18:58:43', '2024-09-12 18:58:43', '/images/symfony2.webp'),
(69, 'abilities', 11, 'Unit tests', ' ', '2024-09-12 18:58:43', '2024-09-12 18:58:43', '/images/unit_tests.webp'),
(70, 'abilities', 12, 'Angielski', ' ', '2024-09-12 18:58:43', '2024-09-12 18:58:43', '/images/english.webp'),
(71, 'abilities', 13, 'React.js', ' ', '2024-10-23 00:24:04', '2024-10-23 00:24:04', '/images/react.webp'),
(100, 'hobbies', 1, 'Planszówki', 'Jednym z moich największych hobby są planszówki. Mam kolekcję kilkudziesięciu gier które też często ogrywam ze znajomymi. Spotykam się regularnie na różnych wydarzeniach związanych z tym tematem. Uczestniczę aktywnie w życiu stowarzyszenia SGP Gambit w Gliwicach.', '2024-09-12 18:28:57', '2024-09-12 18:28:57', '/images/board_games.webp');
