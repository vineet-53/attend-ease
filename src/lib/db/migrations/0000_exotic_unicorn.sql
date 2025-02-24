CREATE TABLE "attendances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section" varchar(10) NOT NULL,
	"universityRoll" varchar(7) NOT NULL,
	"officialMail" varchar(100) NOT NULL,
	"phoneNo" varchar(15) NOT NULL,
	"classCode" varchar(20) NOT NULL,
	"fingerprint" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"roomId" uuid,
	"clerkId" varchar(255) NOT NULL,
	"lat" varchar(50) NOT NULL,
	"long" varchar(50) NOT NULL,
	"altitude" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerkId" varchar(255) NOT NULL,
	"facultyEmail" varchar(255) NOT NULL,
	"class" varchar(10) NOT NULL,
	"batch" varchar(10) NOT NULL,
	"classCode" varchar(20) NOT NULL,
	"status" varchar(10) DEFAULT 'OPEN' NOT NULL,
	"lat" varchar(50) NOT NULL,
	"long" varchar(50) NOT NULL,
	"altitude" varchar(50),
	CONSTRAINT "rooms_classCode_unique" UNIQUE("classCode")
);
--> statement-breakpoint
CREATE TABLE "userAttendance" (
	"clerkId" varchar(255) NOT NULL,
	"attendanceId" uuid NOT NULL,
	CONSTRAINT "userAttendance_clerkId_attendanceId_pk" PRIMARY KEY("clerkId","attendanceId")
);
--> statement-breakpoint
CREATE TABLE "userRoom" (
	"clerkId" varchar(255) NOT NULL,
	"roomId" uuid NOT NULL,
	CONSTRAINT "userRoom_clerkId_roomId_pk" PRIMARY KEY("clerkId","roomId")
);
--> statement-breakpoint
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userAttendance" ADD CONSTRAINT "userAttendance_attendanceId_attendances_id_fk" FOREIGN KEY ("attendanceId") REFERENCES "public"."attendances"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userRoom" ADD CONSTRAINT "userRoom_roomId_rooms_id_fk" FOREIGN KEY ("roomId") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;