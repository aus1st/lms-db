ALTER TABLE "batchConfig" ALTER COLUMN "createdOn" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "createdOn" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "batches" ADD COLUMN "createdOn" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "studentDocuments" ADD COLUMN "createdOn" timestamp DEFAULT now();