import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../ROUTES";
import logo from "../../assets/logo.png";
import KeyIcon from "@mui/icons-material/Key";
import { Person } from "@mui/icons-material";
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
      <div
        className=" text-white ml-auto flex cursor-pointer"
        onClick={() => navigate(ROUTES.admin.path)}
      >
        <Person
          className="items-center flex"
          style={{ height: 22, width: 22 }}
        />
        <div className="font-mono  ml-1">Admin</div>
      </div>
    </nav>
  );
};

export default NavBar;
