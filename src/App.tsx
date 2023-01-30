import React from "react";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";

const App = () => {
  return (
    <>
      <NavBar />
      <Router>
        <Routes>
          <Route {...ROUTES.create} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
