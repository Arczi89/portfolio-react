const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const sequelize = require('./dbConnection'); // Upewnij się, że masz plik z eksportem CommonJS
const MainPageSection = require('./mainPageSection'); // Upewnij się, że masz plik z eksportem CommonJS

dotenv.config();

const app = express();
const PORT = 3002;

app.use(cors({
  origin: 'https://szwagrzak.pl',
  methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

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
    res.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Middleware do logowania
app.use((req, res, next) => {
  console.log(`Request method: ${req.method}, Request URL: ${req.url}, Request Origin: ${req.get('origin')}`);
  next();
});

// Uruchamianie serwera
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
