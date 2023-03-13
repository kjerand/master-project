import React from "react";
import AnswerQuestion from "./views/AnswerQuestion";
import CreateQuestion from "./views/CreateQuestion";
import Menu from "./views/Menu";
import QuestionBank from "./views/QuestionBank";
import SubjectMenu from "./views/SubjectMenu";

const ROUTES = {
  menu: {
    exact: true,
    path: "/",
    element: <Menu />,
  },
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
  subjects: {
    exact: true,
    path: "/subjects",
    element: <SubjectMenu />,
  },
};

export default ROUTES;
