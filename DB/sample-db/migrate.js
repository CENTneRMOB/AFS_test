const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");
const { migrate } = require("drizzle-orm/node-postgres/migrator");
// eslint-disable-next-line import/no-extraneous-dependencies
const dbsConfig = require("../../config").dbs;
// eslint-disable-next-line import/extensions
const config = require("../../drizzle.config.js").default;
const logger = require("../../services/logger.service")(module);

const pool = new Pool({
  connectionString: dbsConfig.sample_db.uri,
});

const db = drizzle(pool);

async function main() {
  if (config.out) {
    await migrate(db, { migrationsFolder: config.out });
    logger.info("Migration done!");
  }
}

main()
  .catch((err) => {
    logger.error(err);
  })
  .finally(async () => {
    await pool.end();
  });
