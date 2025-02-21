import React from "react";
import { RoomListTable } from "./RoomListTable";
import SubHeading from "../SubHeading";

const RoomDetails = () => {
  return (
    <div>
      <SubHeading
        text={"Room Details"}
        className={"my-4 ml-1 text-2xl text-white font-bold"}
      />
      <RoomListTable />
    </div>
  );
};

export default RoomDetails;
