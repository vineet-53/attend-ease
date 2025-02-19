import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="m-auto flex justify-center items-center h-[calc(100vh-50px)]">
      <SignIn />
    </div>
  );
};

export default page;
