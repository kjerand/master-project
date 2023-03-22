import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import admin from "./store/admin";
import { RootState } from "./store/store";
import NavBar from "./components/base/NavBar";
import ROUTES from "./ROUTES";
import { useEffect } from "react";
import { initDatabase } from "./database/database";
import { setQuestions } from "./store/questions";
import { fetchQuestions } from "./database/questions";

const Router = () => {
  const admin = useSelector((state: RootState) => state.admin.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    //initDatabase().then(() => {});
    fetchQuestions().then((questions) => dispatch(setQuestions(questions)));
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {admin && (
          <>
            <Route {...ROUTES.create} />
            <Route {...ROUTES.questionBank} />
          </>
        )}
        <Route {...ROUTES.menu} />
        <Route {...ROUTES.submitCode} />
        <Route {...ROUTES.admin} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
