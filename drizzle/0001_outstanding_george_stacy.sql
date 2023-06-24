CREATE TABLE IF NOT EXISTS "centers" (
	"center_id" serial PRIMARY KEY NOT NULL,
	"center_name" varchar(200),
	"campus" varchar(200),
	"city_id" integer,
	"location" varchar(300),
	"created_date" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "roles" (
	"role_id" serial PRIMARY KEY NOT NULL,
	"role_name" varchar(50),
	"created_date" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "users" (
	"user_id" serial PRIMARY KEY NOT NULL,
	"user_name" varchar(500),
	"cnic" varchar(50),
	"password" varchar(3000),
	"email_verification_token" varchar(3000),
	"email_verfied" boolean,
	"is_active" boolean,
	"role_id" integer,
	"status" varchar(50),
	"is_blocked" boolean,
	"block_reason" varchar(1000),
	"created_date" timestamp DEFAULT now(),
	"updated_date" timestamp,
	"update_by" timestamp
);

DO $$ BEGIN
 ALTER TABLE "centers" ADD CONSTRAINT "centers_city_id_cities_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "cities"("city_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
