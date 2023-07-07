CREATE TABLE IF NOT EXISTS "batchConfig" (
	"batchConfigId" serial PRIMARY KEY NOT NULL,
	"batchId" integer,
	"instructionsForMale" text[],
	"instructionsForFemale" text[],
	"admitCardMessage" varchar(1000),
	"attestationDate" date,
	"entryTestDate" date,
	"createdOn" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "batchCourses" (
	"batchCourseId" serial PRIMARY KEY NOT NULL,
	"batchId" integer,
	"courseId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "batchQuarters" (
	"batchQuarterId" serial PRIMARY KEY NOT NULL,
	"quarterId" integer,
	"batchCourseId" integer,
	"isClassStarted" boolean,
	"isRegistrationActive" boolean,
	"isClassCompleted" boolean,
	"isActive" boolean DEFAULT false,
	"regStartDate" date,
	"regEndDate" date,
	"classStartDate" date,
	"classEndDate" date,
	"createdOn" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "batches" (
	"batchId" serial PRIMARY KEY NOT NULL,
	"batchName" varchar(50),
	"isRegistrationActive" boolean,
	"cityId" integer,
	"isBatchActive" boolean,
	"isActive" boolean,
	"regStartDate" date,
	"regEndDate" date,
	"batchEndDate" date,
	"isRestricted" boolean,
	"isEntryTestMandatory" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"course_id" serial PRIMARY KEY NOT NULL,
	"course_name" varchar(200),
	"inital" varchar(200),
	"long_description" varchar(3000),
	"short_description" varchar(1500),
	"created_on" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "emailRecords" (
	"emailRecordId" serial PRIMARY KEY NOT NULL,
	"studentId" integer,
	"email" varchar(200),
	"isEmailSent" boolean DEFAULT false,
	"createdOn" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entryTests" (
	"entryTestId" serial PRIMARY KEY NOT NULL,
	"studentId" integer,
	"batchId" integer,
	"percentile" numeric(2),
	"rank" integer,
	"testDate" date,
	"testPassed" boolean DEFAULT false,
	"createdOn" timestamp DEFAULT now(),
	"createdBy" integer,
	"updatedOn" timestamp,
	"updatedBy" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quarters" (
	"quarterId" serial PRIMARY KEY NOT NULL,
	"quarterName" varchar(50) NOT NULL,
	"createdOn" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "statusLog" (
	"statusLogId" serial PRIMARY KEY NOT NULL,
	"studentCourseId" integer,
	"status" varchar(50),
	"statusDesc" varchar(500),
	"statusDate" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "studentCourses" (
	"studentCourseId" serial PRIMARY KEY NOT NULL,
	"studentId" integer,
	"batchCourseId" integer,
	"currentlyOnsite" boolean,
	"isGraduated" boolean,
	"isActive" boolean,
	"isDropout" boolean,
	"registrationDate" date,
	"graduationDate" date,
	"dropoutDate" date,
	"dropOutReason" varchar(200),
	"courseStatus" varchar(50),
	"currentQtr" varchar(20),
	"completedQtrs" text[],
	"createdOn" timestamp DEFAULT now(),
	"createdBy" integer,
	"updatedOn" timestamp,
	"updatedBy" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "timeSlots" (
	"timeSlotId" serial PRIMARY KEY NOT NULL,
	"slotName" varchar(100) NOT NULL,
	"centerId" integer,
	"batchQuarterId" integer,
	"location" varchar(100),
	"qtrFee" numeric(2),
	"slotYear" integer,
	"slotMonth" integer,
	"slotDay" integer,
	"slotStart" time,
	"slotEnd" time,
	"totalSeats" integer,
	"bookedSeats" integer,
	"confirmedSeats" integer,
	"createdOn" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batchConfig" ADD CONSTRAINT "batchConfig_batchId_batches_batchId_fk" FOREIGN KEY ("batchId") REFERENCES "batches"("batchId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batchCourses" ADD CONSTRAINT "batchCourses_batchId_batches_batchId_fk" FOREIGN KEY ("batchId") REFERENCES "batches"("batchId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batchCourses" ADD CONSTRAINT "batchCourses_courseId_courses_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "courses"("course_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batchQuarters" ADD CONSTRAINT "batchQuarters_quarterId_quarters_quarterId_fk" FOREIGN KEY ("quarterId") REFERENCES "quarters"("quarterId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batchQuarters" ADD CONSTRAINT "batchQuarters_batchCourseId_batchCourses_batchCourseId_fk" FOREIGN KEY ("batchCourseId") REFERENCES "batchCourses"("batchCourseId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batches" ADD CONSTRAINT "batches_cityId_cities_city_id_fk" FOREIGN KEY ("cityId") REFERENCES "cities"("city_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "emailRecords" ADD CONSTRAINT "emailRecords_studentId_reg_students_student_id_fk" FOREIGN KEY ("studentId") REFERENCES "reg_students"("student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entryTests" ADD CONSTRAINT "entryTests_studentId_reg_students_student_id_fk" FOREIGN KEY ("studentId") REFERENCES "reg_students"("student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entryTests" ADD CONSTRAINT "entryTests_batchId_batches_batchId_fk" FOREIGN KEY ("batchId") REFERENCES "batches"("batchId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "statusLog" ADD CONSTRAINT "statusLog_studentCourseId_studentCourses_studentCourseId_fk" FOREIGN KEY ("studentCourseId") REFERENCES "studentCourses"("studentCourseId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "studentCourses" ADD CONSTRAINT "studentCourses_studentId_reg_students_student_id_fk" FOREIGN KEY ("studentId") REFERENCES "reg_students"("student_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "studentCourses" ADD CONSTRAINT "studentCourses_batchCourseId_batchCourses_batchCourseId_fk" FOREIGN KEY ("batchCourseId") REFERENCES "batchCourses"("batchCourseId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "timeSlots" ADD CONSTRAINT "timeSlots_centerId_centers_center_id_fk" FOREIGN KEY ("centerId") REFERENCES "centers"("center_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "timeSlots" ADD CONSTRAINT "timeSlots_batchQuarterId_batchQuarters_batchQuarterId_fk" FOREIGN KEY ("batchQuarterId") REFERENCES "batchQuarters"("batchQuarterId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
