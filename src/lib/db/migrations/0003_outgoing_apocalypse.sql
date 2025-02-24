ALTER TABLE "attendances" DROP CONSTRAINT "attendances_roomId_rooms_clerkId_fk";
--> statement-breakpoint
ALTER TABLE "attendances" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'rooms'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "rooms" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "rooms" ADD COLUMN "id" uuid PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;