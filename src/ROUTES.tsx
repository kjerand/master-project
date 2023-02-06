import React from "react";
import CodeSubmission from "./views/CodeSubmission";
import Menu from "./views/Menu";
import TaskGenerator from "./views/TaskGenerator";

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
    element: <TaskGenerator />,
  },
  submitCode: {
    exact: true,
    path: "submit",
    element: <CodeSubmission />,
  },
};

export default ROUTES;
