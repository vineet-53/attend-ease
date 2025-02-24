ALTER TABLE "attendances" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "attendances" ALTER COLUMN "roomId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "attendances" ALTER COLUMN "lat" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "attendances" ALTER COLUMN "lat" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "attendances" ALTER COLUMN "long" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "attendances" ALTER COLUMN "long" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "attendances" ALTER COLUMN "altitude" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "rooms" ALTER COLUMN "altitude" SET DATA TYPE integer;