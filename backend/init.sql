-- Personal site database initialization
-- Docker Compose selects the database through MYSQL_DATABASE.

-- UTF-8 encoding setup
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET collation_connection = 'utf8mb4_unicode_ci';
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

-- Public consultant profile shown in the introduction section.
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
  delivery_hours BOOLEAN NOT NULL DEFAULT FALSE,
  delivery_days INT,
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

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  company VARCHAR(255),
  inquiry_type ENUM('website', 'consulting', 'recruitment', 'other') NOT NULL DEFAULT 'other',
  budget_range VARCHAR(100),
  contact_status ENUM('new', 'contacted', 'qualified', 'archived') NOT NULL DEFAULT 'new',
  message TEXT NOT NULL,
  consent_at TIMESTAMP NULL,
  consent_version VARCHAR(50),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_created_at (created_at)
); 