import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheck } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const SubmitModal = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-140px)]">
      <Alert className="flex flex-col  gap-y-2 justify-center w-[400px] mt-10">
        <div className="flex gap-2 items-center">
          <CircleCheck size={30} />
          <AlertTitle>Form Submitted</AlertTitle>
        </div>
        <AlertDescription>
          Attendance Form Submitted Successfully
        </AlertDescription>
        <Link href={"/"}>
          <Button className="w-full">Go Back</Button>
        </Link>
      </Alert>
    </div>
  );
};

export default SubmitModal;
