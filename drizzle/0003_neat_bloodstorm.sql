CREATE TABLE IF NOT EXISTS "reg_students" (
	"student_id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"full_name" varchar(100),
	"dob" date,
	"gender" varchar(10),
	"contact_no" varchar(50),
	"last_qualification" varchar(50),
	"home_address" varchar(500),
	"image_url" varchar(200),
	"city_id" integer,
	"distance_learning" boolean,
	"roll_internal" varchar(20),
	"roll_no" varchar(20),
	"status" varchar(20),
	"reject_reason" varchar(200),
	"signup_date" date,
	"entry_test_result" varchar(200),
	"student_ref_id" integer,
	"percentile" numeric(3),
	"rank" integer,
	"on_site_allowed" boolean,
	"is_new_user" boolean,
	"have_laptop" boolean,
	"is_profile_completed" boolean,
	"phone_verification_token" varchar(2000),
	"phone_verified" boolean,
	"is_document_uploaded" boolean,
	"created_date" timestamp DEFAULT now(),
	"updated_date" timestamp,
	"update_by" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_documents" (
	"st_doc_id" serial PRIMARY KEY NOT NULL,
	"document_name" varchar(100),
	"document_url" varchar(200)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reg_students" ADD CONSTRAINT "reg_students_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reg_students" ADD CONSTRAINT "reg_students_city_id_cities_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "cities"("city_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
