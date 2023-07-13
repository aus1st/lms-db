CREATE TABLE IF NOT EXISTS "announcements" (
	"announcementId" serial PRIMARY KEY NOT NULL,
	"title" varchar(200),
	"description" varchar(2000),
	"url" varchar(500),
	"createdOn" timestamp DEFAULT now(),
	"createdBy" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "banks" (
	"bankId" serial PRIMARY KEY NOT NULL,
	"bankCode" varchar(5),
	"bankName" varchar(100),
	"createdOn" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "branches" (
	"branchId" serial PRIMARY KEY NOT NULL,
	"bankId" integer,
	"cityId" integer,
	"branchCode" varchar(5),
	"branchName" varchar(100),
	"branchAddress" varchar(500),
	"createdOn" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feeVouchers" (
	"feeVoucherId" serial PRIMARY KEY NOT NULL,
	"studentId" integer,
	"feeVoucherNo" varchar(20),
	"batchQuarterId" integer,
	"timeSlotId" integer,
	"distanceLearning" boolean,
	"isPaid" boolean,
	"imgUrl" varchar(250),
	"paymentDeadline" date,
	"feeAmount" numeric(2),
	"isValid" boolean,
	"paymentId" integer,
	"paidDate" date,
	"branchId" integer,
	"isAutoPaid" boolean,
	"isPaymentDelayed" boolean,
	"paymentDelayReason" varchar(500),
	"createdOn" timestamp DEFAULT now(),
	"createdBy" integer,
	"updatedOn" timestamp,
	"updatedBy" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feeVouchersActivity" (
	"voucherActivityId" serial PRIMARY KEY NOT NULL,
	"feeVoucherId" integer,
	"stepNo" integer,
	"tableName" varchar(500),
	"errorDtls" varchar(500),
	"createdOn" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "studentDocuments" (
	"stDocId" serial PRIMARY KEY NOT NULL,
	"documentName" varchar(100),
	"documentUrl" varchar(200)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "studentQtrResults" (
	"studentQtrRsltId" serial PRIMARY KEY NOT NULL,
	"studentId" integer,
	"batchQuarterId" integer,
	"isPassed" boolean,
	"percentile" numeric(2),
	"distanceLearning" boolean DEFAULT false,
	"grade" varchar(5),
	"testsMissed" integer,
	"rank" integer,
	"createdOn" timestamp DEFAULT now(),
	"createdBy" integer,
	"updatedOn" timestamp,
	"updatedBy" timestamp
);
--> statement-breakpoint
DROP TABLE "student_documents";--> statement-breakpoint
ALTER TABLE "reg_students" RENAME TO "regStudents";--> statement-breakpoint
ALTER TABLE "centers" RENAME COLUMN "center_id" TO "centerId";--> statement-breakpoint
ALTER TABLE "centers" RENAME COLUMN "center_name" TO "centerName";--> statement-breakpoint
ALTER TABLE "centers" RENAME COLUMN "city_id" TO "cityId";--> statement-breakpoint
ALTER TABLE "centers" RENAME COLUMN "created_date" TO "createdOn";--> statement-breakpoint
ALTER TABLE "cities" RENAME COLUMN "city_id" TO "cityId";--> statement-breakpoint
ALTER TABLE "cities" RENAME COLUMN "city_name" TO "cityName";--> statement-breakpoint
ALTER TABLE "cities" RENAME COLUMN "created_date" TO "createdOn";--> statement-breakpoint
ALTER TABLE "roles" RENAME COLUMN "role_id" TO "roleId";--> statement-breakpoint
ALTER TABLE "roles" RENAME COLUMN "role_name" TO "roleName";--> statement-breakpoint
ALTER TABLE "roles" RENAME COLUMN "created_date" TO "createdOn";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "user_name" TO "userName";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email_verification_token" TO "emailVerificationToken";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "email_verfied" TO "emailVerified";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "is_active" TO "isActive";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "role_id" TO "roleId";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "is_blocked" TO "isBlocked";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "block_reason" TO "blockReason";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "created_date" TO "createdOn";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updated_date" TO "updatedOn";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "update_by" TO "updatedBy";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "student_id" TO "studentId";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "user_id" TO "userId";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "full_name" TO "fullName";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "contact_no" TO "contactNo";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "last_qualification" TO "lastQualification";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "home_address" TO "homeAddress";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "image_url" TO "imgUrl";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "city_id" TO "cityId";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "distance_learning" TO "distanceLearning";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "roll_internal" TO "rollInternal";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "roll_no" TO "rollNo";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "reject_reason" TO "rejectReason";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "signup_date" TO "signUpDate";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "entry_test_result" TO "entryTestResult";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "student_ref_id" TO "studentRefId";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "on_site_allowed" TO "onSiteAllowed";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "is_new_user" TO "isNewUser";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "have_laptop" TO "haveLaptop";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "is_profile_completed" TO "isProfileCompleted";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "phone_verification_token" TO "phoneVerificationToken";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "phone_verified" TO "phoneVerified";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "is_document_uploaded" TO "isDocumentUploaded";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "created_date" TO "createdOn";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "updated_date" TO "updatedOn";--> statement-breakpoint
ALTER TABLE "regStudents" RENAME COLUMN "update_by" TO "updatedBy";--> statement-breakpoint
ALTER TABLE "batches" DROP CONSTRAINT "batches_cityId_cities_city_id_fk";
--> statement-breakpoint
ALTER TABLE "centers" DROP CONSTRAINT "centers_city_id_cities_city_id_fk";
--> statement-breakpoint
ALTER TABLE "emailRecords" DROP CONSTRAINT "emailRecords_studentId_reg_students_student_id_fk";
--> statement-breakpoint
ALTER TABLE "entryTests" DROP CONSTRAINT "entryTests_studentId_reg_students_student_id_fk";
--> statement-breakpoint
ALTER TABLE "studentCourses" DROP CONSTRAINT "studentCourses_studentId_reg_students_student_id_fk";
--> statement-breakpoint
ALTER TABLE "timeSlots" DROP CONSTRAINT "timeSlots_centerId_centers_center_id_fk";
--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_role_id_roles_role_id_fk";
--> statement-breakpoint
ALTER TABLE "regStudents" DROP CONSTRAINT "reg_students_user_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "regStudents" DROP CONSTRAINT "reg_students_city_id_cities_city_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batches" ADD CONSTRAINT "batches_cityId_cities_cityId_fk" FOREIGN KEY ("cityId") REFERENCES "cities"("cityId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "centers" ADD CONSTRAINT "centers_cityId_cities_cityId_fk" FOREIGN KEY ("cityId") REFERENCES "cities"("cityId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "emailRecords" ADD CONSTRAINT "emailRecords_studentId_regStudents_studentId_fk" FOREIGN KEY ("studentId") REFERENCES "regStudents"("studentId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "entryTests" ADD CONSTRAINT "entryTests_studentId_regStudents_studentId_fk" FOREIGN KEY ("studentId") REFERENCES "regStudents"("studentId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "studentCourses" ADD CONSTRAINT "studentCourses_studentId_regStudents_studentId_fk" FOREIGN KEY ("studentId") REFERENCES "regStudents"("studentId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "timeSlots" ADD CONSTRAINT "timeSlots_centerId_centers_centerId_fk" FOREIGN KEY ("centerId") REFERENCES "centers"("centerId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_roleId_roles_roleId_fk" FOREIGN KEY ("roleId") REFERENCES "roles"("roleId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "regStudents" ADD CONSTRAINT "regStudents_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "regStudents" ADD CONSTRAINT "regStudents_cityId_cities_cityId_fk" FOREIGN KEY ("cityId") REFERENCES "cities"("cityId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "branches" ADD CONSTRAINT "branches_bankId_banks_bankId_fk" FOREIGN KEY ("bankId") REFERENCES "banks"("bankId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "branches" ADD CONSTRAINT "branches_cityId_cities_cityId_fk" FOREIGN KEY ("cityId") REFERENCES "cities"("cityId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feeVouchers" ADD CONSTRAINT "feeVouchers_studentId_regStudents_studentId_fk" FOREIGN KEY ("studentId") REFERENCES "regStudents"("studentId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feeVouchers" ADD CONSTRAINT "feeVouchers_batchQuarterId_batchQuarters_batchQuarterId_fk" FOREIGN KEY ("batchQuarterId") REFERENCES "batchQuarters"("batchQuarterId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feeVouchers" ADD CONSTRAINT "feeVouchers_timeSlotId_timeSlots_timeSlotId_fk" FOREIGN KEY ("timeSlotId") REFERENCES "timeSlots"("timeSlotId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feeVouchers" ADD CONSTRAINT "feeVouchers_branchId_branches_branchId_fk" FOREIGN KEY ("branchId") REFERENCES "branches"("branchId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feeVouchersActivity" ADD CONSTRAINT "feeVouchersActivity_feeVoucherId_feeVouchers_feeVoucherId_fk" FOREIGN KEY ("feeVoucherId") REFERENCES "feeVouchers"("feeVoucherId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "studentQtrResults" ADD CONSTRAINT "studentQtrResults_studentId_regStudents_studentId_fk" FOREIGN KEY ("studentId") REFERENCES "regStudents"("studentId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "studentQtrResults" ADD CONSTRAINT "studentQtrResults_batchQuarterId_batchQuarters_batchQuarterId_fk" FOREIGN KEY ("batchQuarterId") REFERENCES "batchQuarters"("batchQuarterId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
