import { useEffect, useState } from "react";

const useMobile = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return width;
};

export default useMobile;
