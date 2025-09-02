const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./dbConnection');
const MainPageSection = require('./mainPageSection');
const ContactMessage = require('./contactMessage');
const { sendContactEmail, sendConfirmationEmail } = require('./emailService');
const { encryptContactData, decryptData } = require('./encryptionService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Simple rate limiting for contact form
const contactAttempts = new Map();

const contactLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  if (!contactAttempts.has(ip)) {
    contactAttempts.set(ip, { count: 0, resetTime: now + windowMs });
  }

  const attempts = contactAttempts.get(ip);

  if (now > attempts.resetTime) {
    attempts.count = 0;
    attempts.resetTime = now + windowMs;
  }

  if (attempts.count >= maxAttempts) {
    return res.status(429).json({
      success: false,
      message: 'Too many attempts. Try again in 15 minutes.',
    });
  }

  attempts.count++;
  next();
};

// Fallback data for when database is unavailable
const fallbackSections = [
  {
    id: 1,
    tag: 'me',
    item_order: 1,
    title: 'O mnie',
    body: 'Jestem programistą z ponad 10-letnim doświadczeniem w komercyjnym tworzeniu oprogramowania. Przez całą swoją karierę pracowałem zarówno z technologiami webowymi, jak i backendem, jednak moją główną specjalizacją są technologie frontendowe, w szczególności Angular oraz ekosystem JavaScript.\r\nPosiadam doświadczenie w pracy w zespołach o różnych wielkościach, pracując w metodykach SCRUM i Kanban. Z sukcesem współpracowałem z klientami międzynarodowymi i w zespołach wielokulturowych, w których językiem komunikacji był angielski.\r\nStaram się tworzyć wydajny i wysokiej jakości kod, z dużym naciskiem na zasady czystego kodu. Sumiennie wykonuję przeglądy kodu i szczególnie interesuję się testami jednostkowymi oraz TDD.\r\nMam umiejętność rozwijania nowych funkcjonalności, a także utrzymywania i poprawiania kodu w istniejących aplikacjach. Biegle posługuję się systemem kontroli wersji Git, którego używam od początku mojej kariery. Jestem osobą szybko uczącą się – wielokrotnie miałem możliwość pracy z nowymi technologiami i dążę do bycia proaktywnym.\r\nWszechstronność to moja mocna strona: posiadam doświadczenie nie tylko w JavaScript, ale także w Javie, Kotlinie na Androida, Django oraz w pracy z bazami danych, takimi jak MongoDB, MySQL, Oracle DB i PostgreSQL. Karierę zaczynałem od PHP i frameworka Symfony2.',
    image: '/images/me.webp',
  },
  {
    id: 5,
    tag: 'projects',
    item_order: 1,
    title: 'Projekty',
    body: '',
    image: '/images/projects.webp',
  },
  {
    id: 6,
    tag: 'projects',
    item_order: 2,
    title: 'Projekty',
    body: 'https://relaksownia.org.pl/\r\nStrona internetowa Justyny która prowadzi mobilne centrum masażu. Strona składa się z kilku podstron oraz ma panel do zarządzania zawartością. Projekt jest napisany z użyciem frameworka Django w pythonie.',
    image: '/images/relaksownia.webp',
  },
  {
    id: 7,
    tag: 'projects',
    item_order: 3,
    title: 'Projekty',
    body: 'Moja własna strona internetowa napisana w React.js.',
    image: '/images/szwagrzak_pl.webp',
  },
  {
    id: 50,
    tag: 'abilities',
    item_order: 1,
    title: 'Umiejętności',
    body: 'Podczas mojej kariery programistycznej zdobyłem parę umiejętności, są to:',
    image: '/images/abilities.webp',
  },
  {
    id: 51,
    tag: 'abilities',
    item_order: 2,
    title: 'Angular',
    body: ' ',
    image: '/images/angular2.webp',
  },
  {
    id: 52,
    tag: 'abilities',
    item_order: 3,
    title: 'HTML',
    body: ' ',
    image: '/images/html.webp',
  },
  {
    id: 53,
    tag: 'abilities',
    item_order: 4,
    title: 'Git',
    body: ' ',
    image: '/images/git.webp',
  },
  {
    id: 54,
    tag: 'abilities',
    item_order: 5,
    title: 'CSS',
    body: ' ',
    image: '/images/css.webp',
  },
  {
    id: 55,
    tag: 'abilities',
    item_order: 6,
    title: 'Java',
    body: ' ',
    image: '/images/java.webp',
  },
  {
    id: 66,
    tag: 'abilities',
    item_order: 8,
    title: 'Kotlin',
    body: ' ',
    image: '/images/kotlin.webp',
  },
  {
    id: 67,
    tag: 'abilities',
    item_order: 9,
    title: 'django',
    body: ' ',
    image: '/images/django.webp',
  },
  {
    id: 68,
    tag: 'abilities',
    item_order: 10,
    title: 'Symfony2',
    body: ' ',
    image: '/images/symfony2.webp',
  },
  {
    id: 69,
    tag: 'abilities',
    item_order: 11,
    title: 'Unit tests',
    body: ' ',
    image: '/images/unit_tests.webp',
  },
  {
    id: 70,
    tag: 'abilities',
    item_order: 12,
    title: 'Angielski',
    body: ' ',
    image: '/images/english.webp',
  },
  {
    id: 71,
    tag: 'abilities',
    item_order: 13,
    title: 'React.js',
    body: ' ',
    image: '/images/react.webp',
  },
  {
    id: 100,
    tag: 'hobbies',
    item_order: 1,
    title: 'Planszówki',
    body: 'Jednym z moich największych hobby są planszówki. Mam kolekcję kilkudziesięciu gier które też często ogrywam ze znajomymi. Spotykam się regularnie na różnych wydarzeniach związanych z tym tematem. Uczestniczę aktywnie w życiu stowarzyszenia SGP Gambit w Gliwicach.',
    image: '/images/board_games.webp',
  },
];

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// CORS configuration with logging
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      // Produkcja - główna domena
      'https://szwagrzak.pl',
      'http://szwagrzak.pl',
      'https://www.szwagrzak.pl',
      'http://www.szwagrzak.pl',

      // Produkcja - serwer API
      'https://server.szwagrzak.pl',
      'http://server.szwagrzak.pl',
      'https://www.server.szwagrzak.pl',
      'http://www.server.szwagrzak.pl',

      // Lokalne środowisko deweloperskie
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:3002',
      'https://localhost:3002',
      'http://127.0.0.1:3000',
      'https://127.0.0.1:3000',
      'http://127.0.0.1:3002',
      'https://127.0.0.1:3002',

      // Z portami (na wypadek)
      'https://szwagrzak.pl:80',
      'http://szwagrzak.pl:80',
      'https://szwagrzak.pl:443',
      'http://szwagrzak.pl:443',
      'https://szwagrzak.pl:3000',
      'http://szwagrzak.pl:3000',
      'https://szwagrzak.pl:3002',
      'http://szwagrzak.pl:3002',
      'https://www.szwagrzak.pl:80',
      'http://www.szwagrzak.pl:80',
      'https://www.szwagrzak.pl:443',
      'http://www.szwagrzak.pl:443',
      'https://www.szwagrzak.pl:3000',
      'http://www.szwagrzak.pl:3000',
      'https://www.szwagrzak.pl:3002',
      'http://www.szwagrzak.pl:3002',

      // Serwer API z portami
      'https://server.szwagrzak.pl:80',
      'http://server.szwagrzak.pl:80',
      'https://server.szwagrzak.pl:443',
      'http://server.szwagrzak.pl:443',
      'https://server.szwagrzak.pl:3000',
      'http://server.szwagrzak.pl:3000',
      'https://server.szwagrzak.pl:3002',
      'http://server.szwagrzak.pl:3002',
      'https://www.server.szwagrzak.pl:80',
      'http://www.server.szwagrzak.pl:80',
      'https://www.server.szwagrzak.pl:443',
      'http://www.server.szwagrzak.pl:443',
      'https://www.server.szwagrzak.pl:3000',
      'http://www.server.szwagrzak.pl:3000',
      'https://www.server.szwagrzak.pl:3002',
      'http://www.server.szwagrzak.pl:3002',
    ];

    if (!origin) {
      console.log('✅ Allowing request with no origin');
      return callback(null, true);
    }

    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log(`✅ Origin ${origin} is allowed`);
      callback(null, true);
    } else {
      console.log(`❌ Origin ${origin} is NOT allowed`);
      console.log(`📋 Allowed origins:`, allowedOrigins);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'X-Requested-With',
  ],
  exposedHeaders: [
    'Content-Length',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
  ],
};

app.use(cors(corsOptions));

// CORS error handling middleware
app.use((error, req, res, next) => {
  if (error.message === 'Not allowed by CORS') {
    console.log(`🚫 CORS Error: ${error.message}`);
    console.log(`🌐 Blocked origin: ${req.get('origin') || 'NO_ORIGIN'}`);
    console.log(`📡 Method: ${req.method}`);
    console.log(`🔗 URL: ${req.url}`);

    return res.status(403).json({
      success: false,
      message: 'CORS policy violation - origin not allowed',
      error: 'CORS_ERROR',
      blockedOrigin: req.get('origin'),
      allowedOrigins: corsOptions.origin.toString().includes('function')
        ? 'Dynamic validation'
        : corsOptions.origin,
      timestamp: new Date().toISOString(),
    });
  }
  next(error);
});

app.use(bodyParser.json({ limit: '10mb' }));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// CORS logging middleware
app.use((req, res, next) => {
  const origin = req.get('origin');
  const method = req.method;
  const url = req.url;
  const userAgent = req.get('user-agent');
  const referer = req.get('referer');

  console.log('=== CORS REQUEST LOG ===');
  console.log(`🕐 Time: ${new Date().toISOString()}`);
  console.log(`🌐 Origin: ${origin || 'NO_ORIGIN'}`);
  console.log(`📡 Method: ${method}`);
  console.log(`🔗 URL: ${url}`);
  console.log(`👤 User-Agent: ${userAgent || 'NO_USER_AGENT'}`);
  console.log(`📄 Referer: ${referer || 'NO_REFERER'}`);
  console.log(`🌍 Host: ${req.get('host') || 'NO_HOST'}`);
  console.log(`🔒 Protocol: ${req.protocol}`);
  console.log(`📊 Headers:`, JSON.stringify(req.headers, null, 2));
  console.log('========================');

  next();
});

app.get('/api/test', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send('Connection has been established successfully.');
  } catch (error) {
    res.status(500).send('Unable to connect to the database: ' + error.message);
  }
});

app.get('/api/sections', async (req, res) => {
  try {
    const sections = await MainPageSection.findAll();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(sections);
  } catch (error) {
    console.error('Database error, using fallback data:', error.message);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(fallbackSections);
  }
});

app.get('/api/health', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: '1.0.0',
    });
  } catch (error) {
    res.json({
      status: 'degraded',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      version: '1.0.0',
      message: 'Using fallback data',
    });
  }
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    const ipAddress =
      req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'];

    // Encrypt sensitive data before database storage
    const encryptedData = encryptContactData({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    const contactMessage = await ContactMessage.create(encryptedData);

    console.log('📝 Przetwarzanie wiadomości kontaktowej...');
    console.log('👤 Dane użytkownika:', {
      name: name.trim(),
      email: email.trim(),
      ip: ipAddress,
      userAgent: userAgent?.substring(0, 100) + '...',
    });

    const emailResult = await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    const confirmationResult = await sendConfirmationEmail({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    console.log('📊 Podsumowanie wysyłania emaili:');
    console.log(
      `  📧 Email do Ciebie: ${emailResult.success ? '✅ Wysłany' : '❌ Błąd'}`
    );
    if (!emailResult.success) {
      console.log(`    🔍 Błąd: ${emailResult.error}`);
    }
    console.log(
      `  📬 Email potwierdzający: ${confirmationResult.success ? '✅ Wysłany' : '❌ Błąd'}`
    );
    if (!confirmationResult.success) {
      console.log(`    🔍 Błąd: ${confirmationResult.error}`);
    }

    const allEmailsSent = emailResult.success && confirmationResult.success;

    if (allEmailsSent) {
      res.json({
        success: true,
        message: 'Message sent successfully! Check your email.',
        id: contactMessage.id,
      });
    } else {
      const emailErrors = [];
      if (!emailResult.success) {
        emailErrors.push(`Main email: ${emailResult.error}`);
      }
      if (!confirmationResult.success) {
        emailErrors.push(`Confirmation email: ${confirmationResult.error}`);
      }

      res.json({
        success: false,
        message:
          'Message saved but email delivery failed. Please contact support.',
        id: contactMessage.id,
        emailErrors: emailErrors,
        logs: {
          mainEmail: emailResult.success ? 'Sent' : emailResult.error,
          confirmationEmail: confirmationResult.success
            ? 'Sent'
            : confirmationResult.error,
        },
      });
    }
  } catch (error) {
    console.error('Error processing contact message:', error);
    res.status(500).json({
      success: false,
      message:
        'An error occurred while sending the message. Please try again later.',
    });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required for verification',
      });
    }

    const contactMessage = await ContactMessage.findByPk(id);

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    const decryptedEmail = decryptData(contactMessage.email);
    if (decryptedEmail !== email.toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: 'No permission to delete this message',
      });
    }

    await contactMessage.destroy();

    res.json({
      success: true,
      message: 'Data deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleting data',
    });
  }
});

// Response logging middleware
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (data) {
    console.log('=== RESPONSE LOG ===');
    console.log(`📤 Response for: ${req.method} ${req.url}`);
    console.log(`📊 Status: ${res.statusCode}`);
    console.log(`🌐 Origin: ${req.get('origin') || 'NO_ORIGIN'}`);
    console.log(`📄 Content-Type: ${res.get('Content-Type')}`);
    console.log(`🔒 CORS Headers:`, {
      'Access-Control-Allow-Origin': res.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': res.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': res.get('Access-Control-Allow-Headers'),
      'Access-Control-Allow-Credentials': res.get(
        'Access-Control-Allow-Credentials'
      ),
    });
    console.log('===================');
    originalSend.call(this, data);
  };
  next();
});

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Global Error Handler:', error);
  console.error('📊 Request details:', {
    method: req.method,
    url: req.url,
    origin: req.get('origin'),
    userAgent: req.get('user-agent'),
    ip: req.ip || req.connection.remoteAddress,
  });

  // Handle different types of errors
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: 'VALIDATION_ERROR',
      details: error.errors.map(e => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  if (error.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      success: false,
      message: 'Database connection error',
      error: 'DB_CONNECTION_ERROR',
      timestamp: new Date().toISOString(),
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: 'INTERNAL_ERROR',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`✅ Database connected successfully`);
    console.log(`🔍 CORS logging enabled - check console for detailed logs`);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    console.log(`🔄 Server will run with fallback data`);
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔍 CORS logging enabled - check console for detailed logs`);
  }
});
