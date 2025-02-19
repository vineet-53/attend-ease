import React from "react";
const PrimaryContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-6 mx-auto sm:w-[95%] md:w-[90%] lg:w-[80%] ">
      {children}
    </div>
  );
};

export default PrimaryContainer;
