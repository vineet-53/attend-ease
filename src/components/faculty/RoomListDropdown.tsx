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

const RoomListDropdown = ({ roomid }: { roomid: string }) => {
  const [isRoomOpen, setIsRoomOpen] = useState(true);
  const handleOpenRoom = () => {
    // TODO: backend request to open the room
    console.log("opening room ", roomid);
    setIsRoomOpen((prev) => !prev);
  };
  const handleCloseRoom = () => {
    // TODO: backend request to close the room
    console.log("closing room ", roomid);
    setIsRoomOpen((prev) => !prev);
  };
  const handleEditRoom = () => {
    console.log("editing room ", roomid);
  };
  const handleDeleteRoom = () => {
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
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(roomid)}>
          Copy room ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEditRoom}>Edit Room</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteRoom}>
          Delete Room
        </DropdownMenuItem>
        {!isRoomOpen && (
          <DropdownMenuItem onClick={handleCloseRoom}>
            Close Room
          </DropdownMenuItem>
        )}
        {isRoomOpen && (
          <DropdownMenuItem onClick={handleOpenRoom}>
            Open Room
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoomListDropdown;
