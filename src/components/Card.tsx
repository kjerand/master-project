import React from "react";

const Card = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="py-4 px-8 bg-white shadow-lg rounded-lg my-5 w-1/2">
      {children}
    </div>
  );
};

export default Card;
