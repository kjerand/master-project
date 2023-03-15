import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Card = ({
  children,
  width,
  goBack,
  skip,
}: {
  children: JSX.Element | JSX.Element[];
  width?: string;
  goBack?: Function;
  skip?: Function;
}) => {
  const [windowWidth, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = windowWidth <= 768;
  return (
    <div
      className={`py-4 relative px-8 bg-white shadow-lg rounded-lg my-3 ${
        isMobile ? "w-full" : width ? width : "w-1/2"
      }`}
    >
      {goBack && (
        <div
          className="absolute mt-1 cursor-pointer"
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

      {skip && (
        <div
          className="absolute right-0 px-8 mt-1 cursor-pointer"
          onClick={() => {
            skip();
          }}
        >
          <div className="flex justify-center">
            <p className="font-mono text-base my-auto">Skip</p>
            <ArrowForwardIos
              style={{
                width: 25,
                height: 25,
              }}
            />
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
