"use client";
import Cards from "@/components/faculty/Cards";
import RoomDetails from "@/components/faculty/RoomDetails";
import LoadingComponent from "@/components/LoadingComponent";
import LoadingGif from "@/components/LoadingGif";
import { useUser } from "@clerk/nextjs";

const FacultyPage = () => {
  const { user, isSignedIn } = useUser();
  if (!user || !isSignedIn) {
    return <LoadingGif />;
  }
  return (
    <div className="flex flex-col gap-3">
      <LoadingComponent>
        <Cards />
      </LoadingComponent>
      <LoadingComponent>
        <RoomDetails />
      </LoadingComponent>
    </div>
  );
};
export default FacultyPage;
