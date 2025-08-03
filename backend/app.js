const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const sequelize = require('./dbConnection');
const MainPageSection = require('./mainPageSection');
const ContactMessage = require('./contactMessage');
const { sendContactEmail, sendConfirmationEmail } = require('./emailService');
const { encryptContactData, decryptData } = require('./encryptionService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

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

app.use(
  cors({
    origin: [
      'https://szwagrzak.pl',
      'http://szwagrzak.pl',
      'http://localhost:3000',
      'http://localhost:3002',
    ],
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max 5 messages per 15 minutes
  message: {
    success: false,
    message: 'Too many attempts. Try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(bodyParser.json({ limit: '10mb' }));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url} - ${req.get('origin') || 'unknown'}`
  );
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

    console.log(`New contact message from: ${name} (${email})`);
    console.log(`Email to you: ${emailResult.success ? 'sent' : 'error'}`);
    console.log(
      `Confirmation email: ${confirmationResult.success ? 'sent' : 'error'}`
    );

    res.json({
      success: true,
      message: 'Message sent successfully! Check your email.',
      id: contactMessage.id,
    });
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

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`✅ Database connected successfully`);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    console.log(`🔄 Server will run with fallback data`);
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  }
});
