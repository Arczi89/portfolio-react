const sequelize = require('./dbConnection'); // Zmienione na require
const MainPageSection = require('./mainPageSection'); // Upewnij się, że masz zaimportowaną klasę

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

// Uruchom synchronizację
syncDatabase().catch(console.error); // Dodano obsługę błędów
