import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="m-auto w-fit">
      <SignUp />
    </div>
  );
};

export default page;
