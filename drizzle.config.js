// eslint-disable-next-line import/no-extraneous-dependencies
const { defineConfig } = require("drizzle-kit");

const dbsConfig = require("./config").dbs;

/** @type { import("drizzle-orm").Config } */

exports.default = defineConfig({
  schema: "./DB/sample-db/schemas/*.js",
  out: "./DB/sample-db/drizzle",
  dialect: "postgresql",
  dbCredentials: { url: dbsConfig.sample_db.uri },
  verbose: true,
  strict: true,
});
