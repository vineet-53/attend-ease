import React from "react";

const SubHeading = ({
  text,
  className,
}: {
  text: string;
  className: string;
}) => {
  return <h2 className={`${className}`}>{text}</h2>;
};

export default SubHeading;
