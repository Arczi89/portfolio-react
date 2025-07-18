import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./dbConnection.mjs";
import MainPageSection from "./mainPageSection.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Mock data jako fallback
const fallbackSections = [
  {
    id: 1,
    tag: "me",
    item_order: 1,
    title: "O mnie",
    body: "Jestem programistą z ponad 10-letnim doświadczeniem w komercyjnym tworzeniu oprogramowania. Przez całą swoją karierę pracowałem zarówno z technologiami webowymi, jak i backendem, jednak moją główną specjalizacją są technologie frontendowe, w szczególności Angular oraz ekosystem JavaScript.\r\nPosiadam doświadczenie w pracy w zespołach o różnych wielkościach, pracując w metodykach SCRUM i Kanban. Z sukcesem współpracowałem z klientami międzynarodowymi i w zespołach wielokulturowych, w których językiem komunikacji był angielski.\r\nStaram się tworzyć wydajny i wysokiej jakości kod, z dużym naciskiem na zasady czystego kodu. Sumiennie wykonuję przeglądy kodu i szczególnie interesuję się testami jednostkowymi oraz TDD.\r\nMam umiejętność rozwijania nowych funkcjonalności, a także utrzymywania i poprawiania kodu w istniejących aplikacjach. Biegle posługuję się systemem kontroli wersji Git, którego używam od początku mojej kariery. Jestem osobą szybko uczącą się – wielokrotnie miałem możliwość pracy z nowymi technologiami i dążę do bycia proaktywnym.\r\nWszechstronność to moja mocna strona: posiadam doświadczenie nie tylko w JavaScript, ale także w Javie, Kotlinie na Androida, Django oraz w pracy z bazami danych, takimi jak MongoDB, MySQL, Oracle DB i PostgreSQL. Karierę zaczynałem od PHP i frameworka Symfony2.",
    image: "/images/me.webp"
  },
  {
    id: 5,
    tag: "projects",
    item_order: 1,
    title: "Projekty",
    body: "",
    image: "/images/projects.webp"
  },
  {
    id: 6,
    tag: "projects",
    item_order: 2,
    title: "Projekty",
    body: "https://relaksownia.org.pl/\r\nStrona internetowa Justyny która prowadzi mobilne centrum masażu. Strona składa się z kilku podstron oraz ma panel do zarządzania zawartością. Projekt jest napisany z użyciem frameworka Django w pythonie.",
    image: "/images/relaksownia.webp"
  },
  {
    id: 7,
    tag: "projects",
    item_order: 3,
    title: "Projekty",
    body: "Moja własna strona internetowa napisana w React.js.",
    image: "/images/szwagrzak_pl.webp"
  },
  {
    id: 50,
    tag: "abilities",
    item_order: 1,
    title: "Umiejętności",
    body: "Podczas mojej kariery programistycznej zdobyłem parę umiejętności, są to:",
    image: "/images/abilities.webp"
  },
  {
    id: 51,
    tag: "abilities",
    item_order: 2,
    title: "Angular",
    body: " ",
    image: "/images/angular2.webp"
  },
  {
    id: 52,
    tag: "abilities",
    item_order: 3,
    title: "HTML",
    body: " ",
    image: "/images/html.webp"
  },
  {
    id: 53,
    tag: "abilities",
    item_order: 4,
    title: "Git",
    body: " ",
    image: "/images/git.webp"
  },
  {
    id: 54,
    tag: "abilities",
    item_order: 5,
    title: "CSS",
    body: " ",
    image: "/images/css.webp"
  },
  {
    id: 55,
    tag: "abilities",
    item_order: 6,
    title: "Java",
    body: " ",
    image: "/images/java.webp"
  },
  {
    id: 66,
    tag: "abilities",
    item_order: 8,
    title: "Kotlin",
    body: " ",
    image: "/images/kotlin.webp"
  },
  {
    id: 67,
    tag: "abilities",
    item_order: 9,
    title: "django",
    body: " ",
    image: "/images/django.webp"
  },
  {
    id: 68,
    tag: "abilities",
    item_order: 10,
    title: "Symfony2",
    body: " ",
    image: "/images/symfony2.webp"
  },
  {
    id: 69,
    tag: "abilities",
    item_order: 11,
    title: "Unit tests",
    body: " ",
    image: "/images/unit_tests.webp"
  },
  {
    id: 70,
    tag: "abilities",
    item_order: 12,
    title: "Angielski",
    body: " ",
    image: "/images/english.webp"
  },
  {
    id: 71,
    tag: "abilities",
    item_order: 13,
    title: "React.js",
    body: " ",
    image: "/images/react.webp"
  },
  {
    id: 100,
    tag: "hobbies",
    item_order: 1,
    title: "Planszówki",
    body: "Jednym z moich największych hobby są planszówki. Mam kolekcję kilkudziesięciu gier które też często ogrywam ze znajomymi. Spotykam się regularnie na różnych wydarzeniach związanych z tym tematem. Uczestniczę aktywnie w życiu stowarzyszenia SGP Gambit w Gliwicach.",
    image: "/images/board_games.webp"
  }
];

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(
  cors({
    origin: [
      "https://szwagrzak.pl",
      "http://szwagrzak.pl",
      "http://localhost:3000",
      "http://localhost:3002",
    ],
    methods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(bodyParser.json({ limit: '10mb' }));

// Set UTF-8 encoding for all responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url} - ${req.get("origin") || 'unknown'}`,
  );
  next();
});

app.get("/api/test", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send("Connection has been established successfully.");
  } catch (error) {
    res.status(500).send("Unable to connect to the database: " + error.message);
  }
});

app.get("/api/sections", async (req, res) => {
  try {
    // Próbuj pobrać z bazy danych
    const sections = await MainPageSection.findAll();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(sections);
  } catch (error) {
    console.error("Database error, using fallback data:", error.message);
    // Fallback na mock data
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(fallbackSections);
  }
});

// Health check endpoint
app.get("/api/health", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      version: "1.0.0"
    });
  } catch (error) {
    res.json({
      status: "degraded",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      version: "1.0.0",
      message: "Using fallback data"
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
    console.error("❌ Unable to connect to the database:", error.message);
    console.log(`🔄 Server will run with fallback data`);
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  }
});
