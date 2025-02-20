import React from "react";
const PrimaryContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-10 py-6 mx-auto sm:w-[95%] md:w-[90%] lg:w-[80%] ">
      {children}
    </div>
  );
};

export default PrimaryContainer;
