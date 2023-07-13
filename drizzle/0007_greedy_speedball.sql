ALTER TABLE "studentCourses" ADD COLUMN "batchQuarterId" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "studentCourses" ADD CONSTRAINT "studentCourses_batchQuarterId_batchQuarters_batchQuarterId_fk" FOREIGN KEY ("batchQuarterId") REFERENCES "batchQuarters"("batchQuarterId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
