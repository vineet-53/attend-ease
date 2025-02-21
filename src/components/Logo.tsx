"use client";
import React from "react";
import logo from "@/app/attendease_logo.webp";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex gap-2 ">
      <Link className="cursor-pointer" href={"/"}>
        <img
          width={50}
          className="rounded-md"
          height={50}
          src={logo.src}
          alt="logo"
        />
      </Link>
    </div>
  );
};

export default Logo;
