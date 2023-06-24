CREATE TABLE IF NOT EXISTS "cities" (
	"city_id" serial PRIMARY KEY NOT NULL,
	"city_name" varchar(200) NOT NULL,
	"created_date" timestamp DEFAULT now()
);
