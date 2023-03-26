import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import admin, { setUserID } from "./store/admin";
import { RootState } from "./store/store";
import NavBar from "./components/base/NavBar";
import ROUTES from "./ROUTES";
import { useEffect } from "react";
import { initDatabase } from "./database/database";
import { setQuestions } from "./store/questions";
import { fetchQuestions } from "./database/questions";
import { v4 as uuidv4 } from "uuid";

const experimentMode = true;

const Router = () => {
  const admin = useSelector((state: RootState) => state.admin.admin);
  const userID = useSelector((state: RootState) => state.admin.userID);
  const dispatch = useDispatch();
  useEffect(() => {
    //initDatabase().then(() => {});
    fetchQuestions().then((questions) => dispatch(setQuestions(questions)));

    if (!experimentMode) dispatch(setUserID(uuidv4()));
  }, []);

  if (experimentMode && userID === "") {
    return (
      <BrowserRouter>
        <Routes>
          <Route {...ROUTES.userLogin} />
        </Routes>
      </BrowserRouter>
    );
  }

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
