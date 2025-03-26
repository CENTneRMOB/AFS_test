const { pgTable, serial, text, integer } = require("drizzle-orm/pg-core");
const { companies } = require("./companies");

const photos = pgTable("photos", {
  id: serial("id").primaryKey().notNull(),
  companyId: integer("company_id").references(() => companies.id),
  name: text("name").notNull(),
  filepath: text("filepath").notNull(),
  thumbpath: text("thumbpath").notNull(),
});

module.exports = {
  photos,
};
