import { Loader } from "lucide-react";
import React from "react";

const LoadingGif = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-center">
      <Loader size={70} />
    </div>
  );
};

export default LoadingGif;
