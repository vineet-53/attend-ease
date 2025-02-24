import { TRoom } from "@/types/Faculty-types";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

export function useRoom() {
  const [rooms, setRooms] = useState<TRoom[]>([]);

  const fetchRoomList = useCallback(async () => {
    try {
      const response = await axios.get("/api/room/rooms");

      console.log(response);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to fetch rooms");
      }

      setRooms(response.data.rooms || []);
      toast.success("Loaded room details successfully...");
    } catch (err) {
      console.error("Error fetching rooms:", err);
      toast.error("Error loading room details...");
    }
  }, []);

  useEffect(() => {
    fetchRoomList();
  }, [fetchRoomList]);

  return { rooms, setRooms, fetchRoomList };
}
