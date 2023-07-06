ALTER TABLE "centers" ADD COLUMN "city_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "centers" ADD CONSTRAINT "centers_city_id_cities_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "cities"("city_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
