import React from "react";
import NavBar from "./components/base/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import { RootState, store } from "./app/store";
import { Provider, useSelector } from "react-redux";
import Wrapper from "./Wrapper";

const App = () => {
  return (
    <Provider store={store}>
      <Wrapper />
    </Provider>
  );
};

export default App;
