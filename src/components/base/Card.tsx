import React from "react";

const Card = ({
  children,
  width,
}: {
  children: JSX.Element | JSX.Element[];
  width?: string;
}) => {
  return (
    <div
      className={`py-4 px-8 bg-white shadow-lg rounded-lg my-5 ${
        width ? width : "w-1/2"
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
