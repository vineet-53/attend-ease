import {
  pgTable,
  varchar,
  timestamp,
  decimal,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const RoomStatus = pgEnum("status", ["OPEN", "CLOSED"]);

// Room Table
export const rooms = pgTable("rooms", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerkId", { length: 255 }),
  facultyName: varchar("facultyName", { length: 255 }).notNull(),
  facultyEmail: varchar("facultyEmail", { length: 255 }).notNull(),
  subjectCode: varchar("subject_code", { length: 20 }).notNull(),
  batch: varchar("batch", { length: 20 }).notNull(),
  classCode: varchar("classCode", { length: 20 }).notNull(),
  status: RoomStatus().default("OPEN"),
  lat: decimal("lat").notNull(),
  long: decimal("long").notNull(),
  altitude: decimal("altitude"),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

// Attendance Table
export const attendances = pgTable("attendances", {
  id: uuid("id").primaryKey().defaultRandom(),
  clerkId: varchar("clerkId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  section: varchar("section", { length: 20 }).notNull(),
  universityRoll: varchar("universityRoll", { length: 7 }).notNull(),
  officialMail: varchar("officialMail", { length: 100 }).notNull(),
  phoneNo: varchar("phoneNo", { length: 15 }).notNull(),
  classCode: varchar("classCode", { length: 20 }).notNull(),
  fingerprint: varchar("fingerprint", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),

  roomId: uuid("roomId").references(() => rooms.id, {
    onDelete: "cascade",
  }),

  lat: decimal("lat").notNull(),
  long: decimal("long").notNull(),
  altitude: decimal("altitude"),
});
