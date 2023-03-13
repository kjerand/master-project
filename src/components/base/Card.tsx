import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Card = ({
  children,
  width,
  goBack,
}: {
  children: JSX.Element | JSX.Element[];
  width?: string;
  goBack?: Function;
}) => {
  return (
    <div
      className={`py-4 px-8 bg-white shadow-lg rounded-lg my-3 ${
        width ? width : "w-1/2"
      }`}
    >
      {goBack && (
        <div
          className="justify-end absolute mt-1 cursor-pointer"
          onClick={() => {
            goBack();
          }}
        >
          <ArrowBackIcon
            style={{
              width: 30,
              height: 30,
            }}
          />
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
