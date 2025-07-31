# Portfolio React

Portfolio website built with React, Node.js, and MySQL. Features a contact form with email notifications and GDPR-compliant data handling.

## Features

- **Responsive Design**: Modern UI with Tailwind CSS and SCSS modules
- **Contact Form**: Secure form with email notifications and data encryption
- **Database Integration**: MySQL database with Sequelize ORM
- **Security**: Rate limiting, data encryption, and GDPR compliance
- **Development Environment**: Docker Compose setup with MySQL and phpMyAdmin

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, SCSS
- **Backend**: Node.js, Express.js, Sequelize ORM
- **Database**: MySQL 8.0
- **Email**: Nodemailer with SMTP
- **Security**: CryptoJS encryption, express-rate-limit
- **Development**: Docker Compose, nodemon

## Quick Start

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd portfolio-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment**

   ```bash
   cp backend/env.example .env
   ```

   Edit `.env` file with your configuration:

   - Database credentials
   - Email settings
   - Encryption key

4. **Start development environment**

   ```bash
   npm run dev:full
   ```

   This will start:

   - MySQL database (port 3306)
   - phpMyAdmin (port 8080)
   - Backend server (port 3002)
   - React development server (port 3000)

## Available Scripts

- `npm run dev:full` - Start complete development environment
- `npm run dev:backend` - Start only backend with database
- `npm run dev:frontend` - Start only React development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
portfolio-react/
├── backend/                 # Backend API
│   ├── app.mjs             # Main server file
│   ├── emailService.mjs    # Email functionality
│   ├── encryptionService.mjs # Data encryption
│   └── init.sql            # Database initialization
├── src/
│   └── app/
│       ├── components/     # React components
│       ├── services/       # API services
│       └── styles/         # SCSS modules
├── docker-compose.dev.yml  # Development environment
└── package.json
```

## Security Features

- **Data Encryption**: Contact form data encrypted with AES-256
- **Rate Limiting**: Contact form limited to 5 requests per 15 minutes
- **GDPR Compliance**: Privacy policy and data deletion endpoint
- **Security Headers**: XSS protection, content type options
- **Input Validation**: Server-side validation for all inputs

## Environment Variables

Create `.env` file based on `backend/env.example`:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password

# Email
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_password

# Security
ENCRYPTION_KEY=your_32_character_encryption_key

# Server
PORT=3002
NODE_ENV=development
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/sections` - Get portfolio sections
- `POST /api/contact` - Submit contact form
- `DELETE /api/contact/:id` - Delete contact message (GDPR)

## Development

### Database Management

- **Start**: `npm run db:start`
- **Stop**: `npm run db:stop`
- **Reset**: `npm run db:reset`

### Code Quality

- **Lint**: `npm run lint`
- **Format**: `npm run format`
- **Type Check**: `npm run type-check`

## Deployment

The project includes deployment scripts for production hosting. See `deploy.sh` for details.

## License

This project is licensed under a custom license. See [LICENSE.md](LICENSE.md) for details.

**Key points:**

- ✅ **Allowed**: Code review, analysis, educational use
- ❌ **Prohibited**: Copying, redistribution, commercial use
- 👔 **For recruiters**: Full permission to review and assess skills

## Support

For questions or issues, please contact the project maintainer.
