import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import admin from "./store/admin";
import { RootState } from "./store/store";
import NavBar from "./components/base/NavBar";
import ROUTES from "./ROUTES";

const Router = () => {
  const admin = useSelector((state: RootState) => state.admin.admin);
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
