import { db } from "@/lib/db/db";
import { attendances, rooms } from "@/lib/db/schema/schema";
import { currentUser, User } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { formData } = await req.json();

  const {
    altitude,
    class_code,
    lat,
    long,
    name,
    official_mail,
    phone_no,
    room_id,
    university_roll,
    fingerprint,
    section,
  } = formData;

  try {
    if (
      !altitude ||
      !class_code ||
      !lat ||
      !long ||
      !name ||
      !official_mail ||
      !phone_no ||
      !room_id ||
      !university_roll ||
      !section ||
      !fingerprint
    ) {
      throw new Error("details missing..");
    }

    const room = await db
      .select({
        roomid: rooms.id,
        classCode: rooms.classCode,
        status: rooms.status,
      })
      .from(rooms)
      .where(eq(rooms.id, room_id));

    if (!room.length) {
      throw new Error("Room not found");
    }

    if (room[0].status === "CLOSED") {
      throw new Error("room is closed try again...");
    }

    const user: User | null = await currentUser();

    if (!user) {
      return Response.json({
        message: "user not existed",
        success: false,
      });
    }

    const checkUserIsExisted = await db
      .select({ userid: attendances.clerkId })
      .from(attendances)
      .where(eq(attendances.fingerprint, fingerprint));
    if (checkUserIsExisted.length) {
      throw new Error("user is already existed... ");
    }
    if (class_code !== room[0].classCode) {
      throw new Error("incorrect class code...");
    }

    await db.insert(attendances).values({
      //@ts-ignore
      lat: parseFloat(lat),
      long: parseFloat(long),
      classCode: class_code,
      name: name,
      clerkId: user.id,
      fingerprint: fingerprint,
      officialMail: official_mail,
      phoneNo: phone_no,
      section: section,
      universityRoll: university_roll,
      roomId: room[0].roomid,
    });

    return Response.json({
      message: "created attendance form successfully",
      success: true,
      status: 201,
    });
  } catch (err: any) {
    return Response.json({
      message: err?.message || err,
      success: false,
      status: err?.status,
    });
  }
}
