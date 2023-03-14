import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAdmin } from "../app/admin";
import { RootState } from "../app/store";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Header from "../components/base/Header";
import Login from "../components/Login";
import AdminMenu from "./AdminMenu";

const Admin = () => {
  const admin = useSelector((state: RootState) => state.admin.admin);
  return !admin ? <Login /> : <AdminMenu />;
};

export default Admin;
