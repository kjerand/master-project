import React from "react";
import NavBar from "./components/base/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import { store } from "./app/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Routes>
          <Route {...ROUTES.menu} />
          <Route {...ROUTES.create} />
          <Route {...ROUTES.submitCode} />
          <Route {...ROUTES.questionBank} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
