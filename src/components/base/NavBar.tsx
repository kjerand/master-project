import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../ROUTES";
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-[#00509e] w-full flex relative justify-between items-center mx-auto px-8 h-16">
      <p
        className="font-medium leading-tight text-xl text-slate-100 cursor-pointer"
        onClick={() => navigate(ROUTES.menu.path)}
      >
        NTNU
      </p>
    </nav>
  );
};

export default NavBar;
