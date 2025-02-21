import React, { Suspense, ReactNode } from "react";
import LoadingGif from "./LoadingGif";

const LoadingComponent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<LoadingGif />}>{children}</Suspense>
    </>
  );
};

export default LoadingComponent;
