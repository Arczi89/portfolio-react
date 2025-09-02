# Portfolio React

## License

This project is licensed under a custom license. See [LICENSE.md](LICENSE.md) for details.

**Key points:**

- ✅ **Allowed**: Code review, analysis, educational use
- ❌ **Prohibited**: Copying, redistribution, commercial use
- 👔 **For recruiters**: Full permission to review and assess skills

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
- **Git Hooks**: Pre-commit format checking

## Deployment

### Production Environment

The application is deployed on **Domenomania** with the following setup:

- **Frontend**: `https://szwagrzak.pl` (React build)
- **Backend API**: `https://server.szwagrzak.pl` (Node.js + Passenger)
- **Database**: MySQL on Domenomania
- **Server**: Apache + Phusion Passenger

### Deployment Process

#### Automated Deployment (GitHub Actions)

1. **Push to `release_build` branch** triggers deployment
2. **Tests run** - linting, type checking, unit tests
3. **Build process** - React production build
4. **Deployment** - Files uploaded via SSH to Domenomania
5. **Application restart** - Passenger restarts Node.js app
6. **Health check** - Verifies deployment success

#### Manual Deployment

```bash
# Deploy using deploy.sh script
./deploy.sh

# Or manually:
# 1. Build frontend
npm run build

# 2. Upload files
scp -P 22 -r build/* dm77338@dm77338.domenomania.eu:/home/dm77338/szwagrzak.pl/
scp -P 22 -r backend/* dm77338@dm77338.domenomania.eu:/home/dm77338/server.szwagrzak.pl/

# 3. Upload environment file (if changed)
scp -P 22 .env-portfolio-react dm77338@dm77338.domenomania.eu:/home/dm77338/.env-portfolio-react

# 4. Restart application
ssh -p 22 dm77338@dm77338.domenomania.eu "cd /home/dm77338/server.szwagrzak.pl && touch tmp/restart.txt"
```

### Environment Configuration

#### Project-Specific Environment Files

Each project has its own environment file:

- **`.env-portfolio-react`** - Environment variables for portfolio-react project
- **`.env-[project-name]`** - Future projects will have their own files

**⚠️ Important**: After making changes to `.env-portfolio-react`, you must manually upload the updated file to the hosting server. The automated deployment process does not sync environment files for security reasons.

#### Domenomania Configuration

The application is hosted on **Domenomania** with the following setup:

- **SSH Access**: `dm77338@dm77338.domenomania.eu` (port 22)
- **Frontend Directory**: `/home/dm77338/szwagrzak.pl/`
- **Backend Directory**: `/home/dm77338/server.szwagrzak.pl/`
- **SSH Key Management**: Managed through Domenomania panel
- **Environment Files**: Copied from parent directory during deployment

#### Environment File Structure

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name

# Email Configuration
EMAIL_USER=your_email@domain.com
EMAIL_PASS=your_email_password

# Security
ENCRYPTION_KEY=your_32_character_encryption_key

# Frontend API Configuration
REACT_APP_API_BASE_URL=https://server.szwagrzak.pl/api

# Server Configuration
PORT=3002
NODE_ENV=production
```

### Server Management

#### Application Restart

```bash
# Method 1: Touch restart file (recommended)
ssh -p 22 dm77338@dm77338.domenomania.eu "cd /home/dm77338/server.szwagrzak.pl && touch tmp/restart.txt"

# Method 2: Manual process management
ssh -p 22 dm77338@dm77338.domenomania.eu "pkill -f 'node app.js'"
ssh -p 22 dm77338@dm77338.domenomania.eu "cd /home/dm77338/server.szwagrzak.pl && nohup node app.js > app.log 2>&1 &"
```

#### Status Monitoring

```bash
# Check application health
ssh -p 22 dm77338@dm77338.domenomania.eu "curl -k -I https://server.szwagrzak.pl/api/health"

# Check application logs
ssh -p 22 dm77338@dm77338.domenomania.eu "tail -f /home/dm77338/server.szwagrzak.pl/app.log"

# Check running processes
ssh -p 22 dm77338@dm77338.domenomania.eu "ps aux | grep node"
```

### Troubleshooting

#### Common Issues

**1. SSH Authentication Errors (GitHub Actions)**

```
Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password)
```

**Solution:**

This is the most common issue with automated deployments. Follow these steps:

**Step 1: Generate New SSH Keys**

```bash
# Generate new SSH key pair
ssh-keygen -t rsa -b 4096 -f ~/.ssh/github_actions_deploy -C "github-actions-deploy" -N ""
```

**Step 2: Add Public Key to Server**

- Copy the public key from `~/.ssh/github_actions_deploy.pub`
- Add it to your hosting provider's SSH key management (e.g., Domenomania panel)
- Ensure the key is authorized

**Step 3: Update GitHub Secrets**

- Copy the private key from `~/.ssh/github_actions_deploy`
- Go to GitHub → Settings → Secrets and variables → Actions
- Update `SSH_PRIVATE_KEY` secret with the private key content

**Step 4: Fix File Permissions (if needed)**

```bash
# On the server, check and fix permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

**2. NPM Installation Errors**

```
npm error code E403
npm error 403 403 Forbidden - GET https://registry.npmjs.org/yn/-/yn-3.1.1.tgz
```

**Solution:**

- Clear npm cache: `npm cache clean --force`
- Use official registry: Add `registry-url: 'https://registry.npmjs.org'` to GitHub Actions
- Fallback to npm install: Use `npm ci --no-audit || npm install --no-audit`

**3. CORS Errors**

```
Access to fetch at 'https://server.szwagrzak.pl/api/sections' has been blocked by CORS policy
```

**Solution:**

- Check if application is running: `curl -k -I https://server.szwagrzak.pl/api/health`
- Verify CORS configuration in `backend/app.js`
- Restart application: `touch tmp/restart.txt`

**4. Database Connection Issues**

```
Database connection failed, using fallback data
```

**Solution:**

- Check database credentials in `.env` file
- Verify database server is running
- Check network connectivity

**5. Passenger Application Errors**

```
Web application could not be started by the Phusion Passenger(R) application server
```

**Solution:**

- Verify `.htaccess` file exists in `~/websites/server/`
- Check Node.js version compatibility
- Review application logs: `tail -f ~/websites/server/app.log`

**6. Deployment Failures**

**Check deployment status:**

```bash
# Verify files were uploaded
ssh -p 22 dm77338@dm77338.domenomania.eu "ls -la /home/dm77338/server.szwagrzak.pl/"

# Check if .htaccess exists
ssh -p 22 dm77338@dm77338.domenomania.eu "cat /home/dm77338/server.szwagrzak.pl/.htaccess"

# Verify environment file
ssh -p 22 dm77338@dm77338.domenomania.eu "ls -la /home/dm77338/server.szwagrzak.pl/.env"
```

#### Debug Commands

```bash
# Check server status
curl -k -I https://server.szwagrzak.pl/api/health

# Test CORS preflight
curl -H 'Origin: https://szwagrzak.pl' -H 'Access-Control-Request-Method: GET' -X OPTIONS https://server.szwagrzak.pl/api/sections -v

# Check application locally on server
ssh -p 22 dm77338@dm77338.domenomania.eu "curl -s http://localhost:3002/api/health"

# View recent logs
ssh -p 22 dm77338@dm77338.domenomania.eu "tail -n 50 /home/dm77338/server.szwagrzak.pl/app.log"

# Test SSH connection
ssh -v -o ConnectTimeout=10 user@your-server.com "echo 'SSH connection successful'"

# Check SSH key fingerprint
ssh-keygen -lf ~/.ssh/id_rsa
```

#### Best Practices for Deployment

**1. SSH Key Management**

- Use dedicated deployment keys (not personal SSH keys)
- Rotate keys regularly for security
- Store private keys securely in GitHub Secrets
- Use descriptive comments for key identification

**2. Environment Configuration**

- Use separate environment files for different projects
- Never commit sensitive data to version control
- Use strong encryption keys for production
- Validate environment variables during startup

**3. Deployment Process**

- Always run tests before deployment
- Use blue-green deployment when possible
- Implement health checks after deployment
- Monitor application logs for errors

**4. Security Considerations**

- Use HTTPS for all production traffic
- Implement rate limiting on API endpoints
- Validate and sanitize all user inputs
- Keep dependencies updated regularly

### Configuration Files

#### `.htaccess` (Passenger Configuration)

```apache
PassengerNodejs /usr/bin/node
PassengerAppRoot /home/dm77338/server.szwagrzak.pl
PassengerAppType node
PassengerStartupFile app.js
PassengerAppEnv production
PassengerFriendlyErrorPages on
```

#### `deploy.sh` (Deployment Script)

```bash
#!/bin/bash
# Uploads frontend build and backend files
# Copies environment files
# Restarts application
# Performs health check
```

## CI/CD Pipeline

This project uses GitHub Actions for automated testing and deployment:

### **Automated Testing** (`main` branch)

- **Trigger**: Push to `main` branch or pull requests
- **Tests**: Linting, type checking, unit tests
- **Quality Gates**: Code quality validation before merge
- **Format Checking**: Handled by git hooks (pre-commit)

### **Automated Deployment** (`release_build` branch)

- **Trigger**: Push to `release_build` branch
- **Pipeline**: Test → Build → Deploy to production
- **Security**: SSH key authentication for deployment (Domenomania)
- **Environment**: Production build with optimized settings

### **Branch Protection**

- **Main branch**: Protected with required status checks
- **Release branch**: Automated deployment to production
- **Access control**: Only repository owner can push to protected branches

### **Deployment Process**

1. **Testing**: All tests must pass before deployment
2. **Building**: Production build with Tailwind CSS compilation
3. **Deployment**: Automatic deployment to Domenomania via SSH
4. **Verification**: Health checks and monitoring

### **Pipeline Optimization**

- **Test Pipeline**: Fast validation (linting + type checking + tests)
- **Deploy Pipeline**: Full build and deployment process
- **Format Checking**: Git hooks ensure consistent code style

## Support

For questions or issues, please contact the project maintainer.
