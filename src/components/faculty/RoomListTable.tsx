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
import { TRoom } from "@/types/Faculty-types";

export function RoomListTable({ rooms }: { rooms: TRoom[] }) {
  return (
    <ScrollArea className="h-[500px] rounded-md border p-4">
      <Table>
        <TableCaption>List of Rooms Created</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Room Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Room Name</TableHead>
            <TableHead className="text-right">Class Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms?.map((room, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {room.roomid.slice(0, 20) + "..."}
              </TableCell>
              <TableCell>{room.status}</TableCell>
              <TableCell>{room.subjectCode}</TableCell>
              <TableCell className="text-right flex items-center gap-2 justify-end w-full">
                {room.classCode}
                <RoomListDropdown room={room} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
