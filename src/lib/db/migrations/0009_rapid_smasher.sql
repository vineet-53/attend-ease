ALTER TABLE "attendances" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "attendances" ALTER COLUMN "roomId" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "id" SET DATA TYPE uuid;