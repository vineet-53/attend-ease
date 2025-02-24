import { db } from "@/lib/db/db";
import { rooms } from "@/lib/db/schema/schema";
import { currentUser, User } from "@clerk/nextjs/server";
import { desc } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user: User | null = await currentUser();
    if (!user) {
      return Response.json({
        message: "user not existed",
        success: false,
      });
    }
    const { room_info } = await req.json();
    console.log(room_info);

    if (!room_info) {
      throw Error("room info not there");
    }

    const { faculty_name, email, subject_code, class_code, lat, long, batch } =
      room_info;

    if (
      !faculty_name ||
      !email ||
      !subject_code ||
      !class_code ||
      !lat ||
      !batch ||
      !long
    )
      throw new Error("room details are missing");

    await db.insert(rooms).values({
      //@ts-ignore
      clerkId: String(user.id),
      facultyName: room_info.faculty_name,
      facultyEmail: room_info.email,
      subjectCode: room_info.subject_code,
      batch: room_info.batch,
      classCode: room_info.class_code,
      lat: parseFloat(room_info.lat),
      long: parseFloat(room_info.long),
    });

    const roomList = await db
      .select({
        roomid: rooms.id,
        subjectCode: rooms.subjectCode,
        status: rooms.status,
        batch: rooms.batch,
        classCode: rooms.classCode,
      })
      .from(rooms)
      .orderBy(desc(rooms.createdAt));

    return Response.json({
      status: 200,
      message: "yes",
      success: true,
      rooms: roomList,
    });
  } catch (err: any) {
    return Response.json({
      message: err.message || err,
      status: 400,
      success: false,
    });
  }
}
