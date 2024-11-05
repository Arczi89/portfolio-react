import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './dbConnection.mjs';
import MainPageSection from './mainPageSection.mjs';

dotenv.config();

const app = express();
const PORT = 3002;

app.use(cors({
  origin: ['https://szwagrzak.pl', 'http://szwagrzak.pl', 'http://localhost:3000', 'http://localhost:3002'],
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

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

app.use((req, res, next) => {
    console.log(`Request method: ${req.method}, Request URL: ${req.url}, Request Origin: ${req.get('origin')}`);
    next();
});
