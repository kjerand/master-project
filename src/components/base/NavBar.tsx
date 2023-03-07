import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../ROUTES";
import logo from "../../assets/logo.png";
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-[#00509e] w-full flex relative justify-between items-center mx-auto px-8">
      <div
        className="my-4 cursor-pointer"
        onClick={() => navigate(ROUTES.menu.path)}
      >
        <img src={logo} width="180px" />
      </div>
    </nav>
  );
};

export default NavBar;
