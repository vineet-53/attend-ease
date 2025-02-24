"use server";
import { db } from "@/lib/db/db";
import { rooms } from "@/lib/db/schema/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const roomList = await db
    .select({
      roomid: rooms.id,
      subjectCode: rooms.subjectCode,
      status: rooms.status,
      batch: rooms.batch,
      classCode: rooms.classCode,
      facultyEmail: rooms.facultyEmail,
      facultyName: rooms.facultyName,
    })
    .from(rooms)
    .orderBy(desc(rooms.createdAt));

  return Response.json({
    message: "fetched all rooms",
    success: true,
    status: 200,
    rooms: roomList,
  });
}
