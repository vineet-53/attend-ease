import { db } from "@/lib/db/db";
import { attendances, rooms } from "@/lib/db/schema/schema";
import { eq } from "drizzle-orm";

type TError = {
  message: string;
  data: any;
  success: boolean;
  status: number;
};

//delte the room details
export async function DELETE(
  req: Request,
  { params }: { params: { roomid: string } },
) {
  const roomid = (await params).roomid;

  try {
    if (!roomid || !roomid.length) {
      throw new Error("roomid missing");
    }

    await db.delete(rooms).where(eq(rooms.id, roomid));

    return Response.json({
      message: "deleted room success",
      success: true,
      status: 201,
    });
  } catch (err: TError | any) {
    return Response.json({
      message: err?.message,
      success: false,
      status: err?.status,
    });
  }
}

// update the room details
export async function PUT(
  req: Request,
  { params }: { params: { roomid: string } },
) {
  try {
    const roomid = (await params)?.roomid;
    if (!roomid || !roomid.length) throw new Error("room id missing");

    const { roomDetails, status } = await req.json();

    console.log("ROOM ID IS : ", roomid);

    if (status) {
      await db.update(rooms).set({
        status: status,
      });
      return Response.json({
        message: "updated status successfully",
        status: 200,
        success: true,
      });
    } else {
      //TODO: do this thing
      if (!roomDetails) {
        throw Error("room info not there");
      }
      const {
        faculty_name,
        email,
        subject_code,
        class_code,
        lat,
        long,
        batch,
      } = roomDetails;

      await db
        .update(rooms)
        .set({
          batch: batch,
          lat: lat,
          long: long,
          classCode: class_code,
          facultyEmail: email,
          facultyName: faculty_name,
          subjectCode: subject_code,
        })
        .where(eq(rooms.id, roomid));
    }

    // find that db and send to user
    return Response.json({
      message: "updated room details",
      success: true,
      status: 201,
    });
  } catch (err: TError | any) {
    return Response.json({
      message: err?.message,
      success: false,
      status: err?.status,
    });
  }
}
// fucntion to calculate the distance between 2 coords
function getDistanceFromLatLonInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371000; // Radius of the Earth in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters
  return distance;
}

export async function GET(
  req: Request,
  { params }: { params: { roomid: string } },
) {
  const roomid = (await params).roomid;
  try {
    if (!roomid || !roomid.length) {
      throw new Error("room id missing");
    }
    let students = await db
      .select()
      .from(attendances)
      .where(eq(attendances.roomId, roomid));

    // TODO: Filter the students by their location and timing of the form
    const allowedRange = 40;
    const room = await db
      .select({
        lat: rooms.lat,
        long: rooms.long,
        classCode: rooms.classCode,
      })
      .from(rooms)
      .where(eq(rooms.id, roomid));

    if (!room.length) {
      throw new Error("room not found");
    }

    if (students.length) {
      let rlat = parseFloat(room[0].lat);
      let rlong = parseFloat(room[0].long);

      students = students.filter((student) => {
        let slat = parseFloat(student.lat);
        let slong = parseFloat(student.long);
        const calcDistance = getDistanceFromLatLonInMeters(
          rlat,
          rlong,
          slat,
          slong,
        );
        if (calcDistance <= allowedRange) {
          return student;
        }
      });
    }

    return Response.json({
      message: "fetched students ",
      status: 200,
      students,
    });
  } catch (err: any) {
    return Response.json({
      message: err?.message || err,
      status: err?.status,
      success: false,
    });
  }
}
