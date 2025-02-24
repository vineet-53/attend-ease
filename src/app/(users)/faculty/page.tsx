"use client";
import Cards from "@/components/faculty/Cards";
import RoomDetails from "@/components/faculty/RoomDetails";
import LoadingComponent from "@/components/LoadingComponent";
import { RoomFormContextProvider } from "@/contexts/room-form-provider";
import { useRoom } from "@/hooks/use-rooms";

const FacultyPage = () => {
  const { rooms } = useRoom();

  return (
    <RoomFormContextProvider>
      <div className="flex flex-col gap-3">
        <LoadingComponent>
          <Cards />
        </LoadingComponent>
        <LoadingComponent>
          <RoomDetails rooms={rooms} />
        </LoadingComponent>
      </div>
    </RoomFormContextProvider>
  );
};
export default FacultyPage;
