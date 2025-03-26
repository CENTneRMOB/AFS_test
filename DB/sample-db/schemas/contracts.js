const {
  pgTable,
  serial,
  timestamp,
  integer,
  text,
} = require("drizzle-orm/pg-core");
const { companies } = require("./companies");

const contracts = pgTable("contracts", {
  id: serial("id").primaryKey().notNull(),
  no: text("no").notNull(),
  companyId: integer("company_id").references(() => companies.id),
  issueDate: timestamp("issue_date").notNull(),
});

module.exports = {
  contracts,
};
