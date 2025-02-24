ALTER TABLE "rooms" ADD COLUMN "subject_code" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN "class";