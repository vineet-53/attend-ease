import React, { useState } from "react";

import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TRoom } from "@/types/Faculty-types";
import { useFormContext } from "@/contexts/room-form-provider";
import { toast } from "sonner";

const RoomListDropdown = ({ room }: { room: TRoom }) => {
  const { setEdit, open, setOpen, setFormDefaultValues, setRoomId } =
    useFormContext();

  const {
    batch,
    roomid,
    status,
    classCode,
    subjectCode,
    facultyName,
    facultyEmail,
  } = room;

  const [isRoomOpen, setIsRoomOpen] = useState(
    room?.status === "OPEN" ? true : false,
  );

  const handleOpenRoom = (roomid: string) => {
    // TODO: backend request to open the room
    setIsRoomOpen((prev) => !prev);
  };
  const handleCloseRoom = (roomid: string) => {
    // TODO: backend request to close the room
    console.log("closing room ", roomid);
    setIsRoomOpen((prev) => !prev);
  };
  const handleEditRoom = (roomid: string) => {
    toast.message("Edting Room Form...");
    setFormDefaultValues({
      class_code: classCode || "",
      batch: batch || "",
      email: facultyEmail || "",
      faculty_name: facultyName || "",
      subject_code: subjectCode || "",
    });
    setOpen(true);
    setEdit(true);
    setRoomId(roomid || null);
  };

  const handleDeleteRoom = (roomid: string) => {
    console.log("deleting room ", roomid);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(room.roomid)}
        >
          Copy room ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleEditRoom(room.roomid)}>
          Edit Room
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDeleteRoom(room.roomid)}>
          Delete Room
        </DropdownMenuItem>
        {!isRoomOpen && (
          <DropdownMenuItem onClick={() => handleCloseRoom(room.roomid)}>
            Close Room
          </DropdownMenuItem>
        )}
        {isRoomOpen && (
          <DropdownMenuItem onClick={() => handleOpenRoom(room.roomid)}>
            Open Room
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoomListDropdown;
