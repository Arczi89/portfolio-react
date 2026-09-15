const fs = require('fs/promises');
const path = require('path');
const sequelize = require('./dbConnection');

const migrationsDirectory = path.join(__dirname, 'migration');

async function runMigrations() {
  await sequelize.authenticate();
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const migrationFiles = (await fs.readdir(migrationsDirectory))
    .filter(file => /^\d+_.*\.sql$/.test(file))
    .sort();

  for (const file of migrationFiles) {
    const [applied] = await sequelize.query(
      'SELECT version FROM schema_migrations WHERE version = ?',
      { replacements: [file] }
    );

    if (applied.length) {
      continue;
    }

    const sql = await fs.readFile(path.join(migrationsDirectory, file), 'utf8');
    await sequelize.query(sql);
    await sequelize.query('INSERT INTO schema_migrations (version) VALUES (?)', {
      replacements: [file],
    });
    console.log(`Applied migration: ${file}`);
  }

  await sequelize.close();
}

runMigrations().catch(error => {
  console.error('Migration failed:', error);
  process.exitCode = 1;
});