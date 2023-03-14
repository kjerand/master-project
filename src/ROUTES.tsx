import React from "react";
import AdminLogin from "./views/Admin";
import AnswerQuestion from "./views/AnswerQuestion";
import CreateQuestion from "./views/CreateQuestion";
import Menu from "./views/AdminMenu";
import QuestionBank from "./views/QuestionBank";
import SubjectMenu from "./views/SubjectMenu";
import Admin from "./views/Admin";

const ROUTES = {
  create: {
    exact: true,
    path: "/create",
    element: <CreateQuestion />,
  },
  submitCode: {
    exact: true,
    path: "/subjects/:subject",
    element: <AnswerQuestion />,
  },
  questionBank: {
    exact: true,
    path: "/bank",
    element: <QuestionBank />,
  },
  menu: {
    exact: true,
    path: "/",
    element: <SubjectMenu />,
  },
  admin: {
    exact: true,
    path: "/admin",
    element: <Admin />,
  },
};

export default ROUTES;
