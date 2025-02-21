"use client";
import React from "react";
import { useSidebar } from "./ui/sidebar";
const PrimaryContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={`transition-all duration-1000 flex flex-col gap-10 py-6 mx-auto sm:w-[95%] md:w-[90%] lg:w-[80%]`}
    >
      {children}
    </div>
  );
};

export default PrimaryContainer;
