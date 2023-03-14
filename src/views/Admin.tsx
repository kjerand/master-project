import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";

import Login from "../components/Admin/Login";
import AdminMenu from "../components/Admin/AdminMenu";

const Admin = () => {
  const admin = useSelector((state: RootState) => state.admin.admin);
  return !admin ? <Login /> : <AdminMenu />;
};

export default Admin;
