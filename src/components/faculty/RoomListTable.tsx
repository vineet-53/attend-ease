import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RoomListDropdown from "./RoomListDropdown";

const rooms = [
  {
    room_id: "123",
    room_name: "TCS-301",
    status: "Closed",
    students: "120",
  },
  {
    room_id: "123",
    room_name: "TCS-301",
    status: "Closed",
    students: "120",
  },
  {
    room_id: "123",
    room_name: "TCS-301",
    status: "Closed",
    students: "120",
  },
  {
    room_id: "123",
    room_name: "TCS-301",
    status: "Closed",
    students: "120",
  },
  {
    room_id: "123",
    room_name: "TCS-301",
    status: "Closed",
    students: "120",
  },
  {
    room_id: "123",
    room_name: "TCS-301",
    status: "Closed",
    students: "120",
  },
  {
    room_id: "123",
    room_name: "TCS-301",
    status: "Closed",
    students: "120",
  },
  {
    room_id: "123",
    room_name: "TCS-301",
    status: "Closed",
    students: "120",
  },
];

export function RoomListTable() {
  return (
    <ScrollArea className="h-[500px] rounded-md border p-4">
      <Table>
        <TableCaption>List of Rooms Created</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Room Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Room Name</TableHead>
            <TableHead className="text-right">Students</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{room.room_id}</TableCell>
              <TableCell>{room.status}</TableCell>
              <TableCell>{room.room_name}</TableCell>
              <TableCell className="text-right flex items-center gap-2 justify-end w-full">
                {room.students}
                <RoomListDropdown roomid={room.room_id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
