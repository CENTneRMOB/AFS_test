DO $$ BEGIN
 CREATE TYPE "public"."company_status" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

--> statement-breakpoint
CREATE TABLE
	"companies" (
		"id" serial PRIMARY KEY NOT NULL,
		"contact_id" INTEGER,
		"name" TEXT NOT NULL,
		"short_name" TEXT NOT NULL,
		"business_entity" VARCHAR(256) NOT NULL,
		"type" TEXT[] DEFAULT '{}'::TEXT[] NOT NULL,
		"status" "company_status" DEFAULT 'active',
		"created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
		"updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
		"address" TEXT DEFAULT '' NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"contacts" (
		"id" serial PRIMARY KEY NOT NULL,
		"lastname" VARCHAR(256) NOT NULL,
		"firstname" VARCHAR(256) NOT NULL,
		"patronymic" VARCHAR(256) DEFAULT '' NOT NULL,
		"phone" VARCHAR(256) NOT NULL,
		"email" VARCHAR(256) NOT NULL,
		"created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
		"updated_at" TIMESTAMP DEFAULT NOW() NOT NULL,
		"deleted" BOOLEAN DEFAULT FALSE NOT NULL,
		CONSTRAINT "contacts_email_unique" UNIQUE ("email")
	);

--> statement-breakpoint
CREATE TABLE
	"contracts" (
		"id" serial PRIMARY KEY NOT NULL,
		"no" TEXT NOT NULL,
		"company_id" INTEGER,
		"issue_date" TIMESTAMP NOT NULL
	);

--> statement-breakpoint
CREATE TABLE
	"users" (
		"id" serial PRIMARY KEY NOT NULL,
		"login" VARCHAR(256) NOT NULL,
		"password" TEXT NOT NULL,
		"created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
		"deleted" BOOLEAN DEFAULT FALSE NOT NULL,
		CONSTRAINT "users_login_unique" UNIQUE ("login")
	);

--> statement-breakpoint
CREATE TABLE
	"photos" (
		"id" serial PRIMARY KEY NOT NULL,
		"company_id" INTEGER,
		"name" TEXT NOT NULL,
		"filepath" TEXT NOT NULL,
		"thumbpath" TEXT NOT NULL
	);

--> statement-breakpoint
ALTER TABLE "companies"
ADD CONSTRAINT "companies_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

--> statement-breakpoint
ALTER TABLE "contracts"
ADD CONSTRAINT "contracts_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

--> statement-breakpoint
ALTER TABLE "photos"
ADD CONSTRAINT "photos_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;