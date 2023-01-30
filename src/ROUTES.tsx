import React from "react";
import TaskGenerator from "./views/TaskGenerator";

const ROUTES = {
  create: {
    exact: true,
    path: "/",
    //component: Dashboard,
    element: <TaskGenerator />,
    userRequired: true,
  },
};

export default ROUTES;
