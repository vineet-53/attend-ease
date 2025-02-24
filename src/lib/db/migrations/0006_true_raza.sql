ALTER TABLE "rooms" DROP CONSTRAINT "rooms_classCode_unique";--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "lat" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "lat" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "long" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "long" DROP NOT NULL;