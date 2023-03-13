import Button from "../components/base/Button";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import { useNavigate } from "react-router-dom";
import ROUTES from "../ROUTES";
import Header from "../components/base/Header";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card>
        <Header title="Main menu" size="text-4xl" />
        <div className="grid grid-cols-1 gap-y-5 mt-8 mb-4">
          <Button
            text="Create questions"
            onClick={() => {
              navigate(ROUTES.create.path);
            }}
            className="bg-[#00509e] hover:bg-blue-700 w-1/3"
          />
          <Button
            text="Answer questions"
            onClick={() => {
              navigate(ROUTES.subjects.path);
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
        </div>
      </Card>
    </Container>
  );
};

export default Menu;
