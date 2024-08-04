import sequelize from './lib/dbConnection'; 

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

void syncDatabase();
