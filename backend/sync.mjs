import sequelize from "./dbConnection.mjs";

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

void syncDatabase();
