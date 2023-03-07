import React from "react";
import CodeSubmission from "./views/CodeSubmission";
import QuestionForm from "./views/QuestionForm";
import Menu from "./views/Menu";

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
};

export default ROUTES;
