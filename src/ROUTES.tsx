import React from "react";
import CodeSubmission from "./views/CodeSubmission";
import QuestionForm from "./views/QuestionForm";
import Menu from "./views/Menu";
import QuestionBank from "./views/QuestionBank";

const ROUTES = {
  menu: {
    exact: true,
    path: "/",
    element: <Menu />,
  },
  create: {
    exact: true,
    path: "/create",
    //component: Dashboard,
    element: <QuestionForm />,
  },
  submitCode: {
    exact: true,
    path: "submit",
    element: <CodeSubmission />,
  },
  questionBank: {
    exact: true,
    path: "bank",
    element: <QuestionBank />,
  },
};

export default ROUTES;
