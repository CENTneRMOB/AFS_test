const {
  pgTable,
  serial,
  timestamp,
  varchar,
  text,
  integer,
  pgEnum,
} = require("drizzle-orm/pg-core");
const { sql } = require("drizzle-orm");
const { contacts } = require("./contacts");

const CompanyStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

const companyStatusEnum = pgEnum(
  "company_status",
  Object.values(CompanyStatus)
);

const companies = pgTable("companies", {
  id: serial("id").primaryKey().notNull(),
  contactId: integer("contact_id").references(() => contacts.id),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  businessEntity: varchar("business_entity", { length: 256 }).notNull(),
  type: text("type")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  status: companyStatusEnum("status").default(CompanyStatus.ACTIVE),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  address: text("address").notNull().default(""),
});

module.exports = {
  companies,
  CompanyStatus,
};
