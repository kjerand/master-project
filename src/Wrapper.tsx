import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import admin from "./app/admin";
import { RootState } from "./app/store";
import NavBar from "./components/base/NavBar";
import ROUTES from "./ROUTES";

const Wrapper = () => {
  const admin = useSelector((state: RootState) => state.admin.admin);
  return (
    <Router>
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
    </Router>
  );
};

export default Wrapper;
