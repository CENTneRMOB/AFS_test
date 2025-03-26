const {
  pgTable,
  serial,
  timestamp,
  varchar,
  text,
  boolean,
} = require("drizzle-orm/pg-core");

const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  login: varchar("login", { length: 256 }).unique().notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  deleted: boolean("deleted").notNull().default(false),
});

module.exports = {
  users,
};
