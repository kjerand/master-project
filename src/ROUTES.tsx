import React from "react";
import AdminLogin from "./views/Admin";
import AnswerQuestion from "./views/AnswerQuestion";
import CreateQuestion from "./views/CreateQuestion";
import Menu from "./components/Admin/AdminMenu";
import QuestionBank from "./views/QuestionBank";
import SubjectMenu from "./views/SubjectMenu";
import Admin from "./views/Admin";
import UserLogin from "./components/Admin/UserLogin";

const prefix = "/master-project";
const ROUTES = {
  create: {
    exact: true,
    path: prefix + "/create",
    element: <CreateQuestion />,
  },
  submitCode: {
    exact: true,
    path: prefix + "/subjects/:subject",
    element: <AnswerQuestion />,
  },
  questionBank: {
    exact: true,
    path: prefix + "/bank",
    element: <QuestionBank />,
  },
  menu: {
    exact: true,
    path: prefix + "/",
    element: <SubjectMenu />,
  },
  admin: {
    exact: true,
    path: prefix + "/admin",
    element: <Admin />,
  },
  userLogin: {
    exact: false,
    path: prefix + "/",
    element: <UserLogin />,
  },
};

export default ROUTES;
