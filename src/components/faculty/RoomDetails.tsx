import React from "react";
import { RoomListTable } from "./RoomListTable";
import SubHeading from "../SubHeading";
import { TRoom } from "@/types/Faculty-types";

const RoomDetails = ({ rooms }: { rooms: TRoom[] }) => {
  return (
    <div>
      <SubHeading
        text={"Room Details"}
        className={"my-4 ml-1 text-2xl text-white font-bold"}
      />
      {rooms.length ? (
        <RoomListTable rooms={rooms} />
      ) : (
        <div className="pl-2 text-xl font-bold text-gray-500">
          No rooms created...
        </div>
      )}
    </div>
  );
};

export default RoomDetails;
