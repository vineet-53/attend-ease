"use client";
import * as XLSX from "xlsx";
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
import axios from "axios";

const RoomListDropdown = ({ room }: { room: TRoom }) => {
  const { setEdit, setOpen, setFormDefaultValues, setRoomId } =
    useFormContext();

  const { batch, classCode, subjectCode, facultyName, facultyEmail } = room;

  const [isRoomOpen, setIsRoomOpen] = useState(
    room?.status == "OPEN" ? true : false,
  );

  const toggleRoomStatus = ({
    message,
    success,
    error,
    loading,
    status,
    roomid,
  }: {
    message: string;
    success: string;
    error: string;
    loading: string;
    status: "OPEN" | "CLOSED";
    roomid: string;
  }) => {
    console.log(message, roomid);
    (async () => {
      const toastid = toast.loading(`${loading}`);
      try {
        const response = await axios.put("/api/room/" + `${roomid}`, {
          status: status,
        });

        console.log(response);

        if (response.data?.success) {
          throw new Error(response.data?.message || error);
        }
        toast.success(success);
        setIsRoomOpen((prev) => !prev);
      } catch (err: any) {
        toast.error(err?.message || error);
        console.log(err?.message || error);
      } finally {
        toast.dismiss(toastid);
      }
    })();
    window.location.reload();
  };
  const handleOpenRoom = (roomid: string) => {
    toggleRoomStatus({
      message: "opening room",
      loading: "opening room...",
      error: "error opening room status!",
      success: "opened room successfully...",
      status: "OPEN",
      roomid,
    });
  };
  const handleCloseRoom = (roomid: string) => {
    toggleRoomStatus({
      message: "closing room",
      loading: "closing room...",
      error: "error closing room status!",
      success: "closed room successfully...",
      status: "CLOSED",
      roomid,
    });
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
    (async () => {
      const toastid = toast.loading("deleting room ...");
      console.log("deleting room ", roomid);
      try {
        const response = await axios.delete("/api/room/" + `${roomid}`);
        console.log(response);
        if (response.data?.success) {
          throw new Error(response.data?.message || "error deleting form");
        }
        toast.success("deleted room success...");
      } catch (err: any) {
        toast.error(err?.message || err);
        console.log(err?.message || err);
      } finally {
        toast.dismiss(toastid);
      }
    })();
    window.location.reload();
  };

  const ExportExcel = (data: any[]) => {
    console.log(data);
    const sheetData = data.map((student) => {
      const {
        name,
        section,
        universityRoll,
        officialMail,
        phoneNo,
        classCode,
      } = student;
      return {
        name,
        section,
        universityRoll,
        officialMail,
        phoneNo,
        classCode,
      };
    });
    console.log(sheetData);
    const worksheet = XLSX.utils.json_to_sheet(sheetData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelData = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "binary",
    });

    XLSX.writeFile(workbook, new Date().toLocaleString() + ".xlsx");
  };

  const handleDownloadSheet = (roomid: string) => {
    (async () => {
      try {
        const response = await axios.get("/api/room/" + `${roomid}`);
        if (response.data?.success) {
          throw new Error(response.data?.message || "error downloading sheet");
        }

        console.log(response);

        const students: any[] = response.data?.students || [];

        if (!students.length) {
          toast.error("0 students in this room.");
          return;
        }
        const downloadToastId = toast.loading("downloading sheet....");
        // TODO: do download stuff and convert to the xl format

        ExportExcel(response.data.students);
        setTimeout(() => {
          toast.dismiss(downloadToastId);
        }, 3000);
      } catch (err: any) {
        console.log(err?.message || err);
        toast.error(err?.message || err);
      }
    })();
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
        {isRoomOpen && (
          <DropdownMenuItem onClick={() => handleCloseRoom(room.roomid)}>
            Close Room
          </DropdownMenuItem>
        )}
        {!isRoomOpen && (
          <DropdownMenuItem onClick={() => handleOpenRoom(room.roomid)}>
            Open Room
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => handleDownloadSheet(room.roomid)}>
          Download Sheet
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoomListDropdown;
