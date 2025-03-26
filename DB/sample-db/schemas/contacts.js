const {
  pgTable,
  serial,
  timestamp,
  varchar,
  boolean,
} = require("drizzle-orm/pg-core");

const contacts = pgTable("contacts", {
  id: serial("id").primaryKey().notNull(),
  lastName: varchar("lastname", { length: 256 }).notNull(),
  firstName: varchar("firstname", { length: 256 }).notNull(),
  patronymic: varchar("patronymic", { length: 256 }).notNull().default(""),
  phone: varchar("phone", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  deleted: boolean("deleted").notNull().default(false),
});

module.exports = {
  contacts,
};
