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
        <Header title="Main menu" size="4xl" />
        <Button
          text="Create questions"
          onClick={() => {
            navigate(ROUTES.create.path);
          }}
          className="bg-blue-700 flex mt-10 px-20"
        />
        <Button
          text="Answer questions"
          onClick={() => {
            navigate(ROUTES.submitCode.path);
          }}
          className="bg-blue-700 flex px-20 my-5"
        />
      </Card>
    </Container>
  );
};

export default Menu;
