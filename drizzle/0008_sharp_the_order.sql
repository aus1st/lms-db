ALTER TABLE "courses" RENAME COLUMN "course_id" TO "courseId";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "course_name" TO "courseName";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "long_description" TO "longDescription";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "short_description" TO "shortDescription";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "created_on" TO "createdOn";--> statement-breakpoint
ALTER TABLE "batchCourses" DROP CONSTRAINT "batchCourses_courseId_courses_course_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batchCourses" ADD CONSTRAINT "batchCourses_courseId_courses_courseId_fk" FOREIGN KEY ("courseId") REFERENCES "courses"("courseId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
