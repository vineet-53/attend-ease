ALTER TABLE "attendances" DROP CONSTRAINT "attendances_roomId_rooms_id_fk";
--> statement-breakpoint
ALTER TABLE "rooms" ADD PRIMARY KEY ("clerkId");--> statement-breakpoint
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_roomId_rooms_clerkId_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("clerkId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" DROP COLUMN "id";