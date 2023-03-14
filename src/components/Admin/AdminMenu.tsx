import Button from "../base/Button";
import Card from "../base/Card";
import Container from "../base/Container";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../ROUTES";
import Header from "../base/Header";
import { useEffect } from "react";
import { initDatabase } from "../../database/database";
import { useDispatch } from "react-redux";
import { setQuestions } from "../../store/questions";
import { setAdmin } from "../../store/admin";

const AdminMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <Card>
        <Header title="Admin" size="text-4xl" />
        <div className="grid grid-cols-1 gap-y-5 mt-8 mb-4">
          <Button
            text="Create questions"
            onClick={() => {
              navigate(ROUTES.create.path);
            }}
            className="bg-[#00509e] hover:bg-blue-700 w-1/3"
          />

          <Button
            text="Question bank"
            onClick={() => {
              navigate(ROUTES.questionBank.path);
            }}
            className="bg-[#00509e] hover:bg-blue-700 w-1/3"
          />

          <Button
            text="Log out"
            onClick={() => {
              dispatch(setAdmin(false));
            }}
            className="bg-gray-700 hover:bg-gray-600 w-1/3"
          />
        </div>
      </Card>
    </Container>
  );
};

export default AdminMenu;
