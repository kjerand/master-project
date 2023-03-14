import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ArrowBackIos } from "@mui/icons-material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

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
          <div className="flex justify-center">
            <ArrowBackIos
              style={{
                width: 25,
                height: 25,
              }}
            />

            <p className="font-mono text-base my-auto">Return</p>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
