import { useNavigate } from "react-router-dom";
import Button from "../components/base/Button";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Header from "../components/base/Header";
import ROUTES from "../ROUTES";
import { subjects } from "../utils/subjects";

const SubjectMenu = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card goBack={() => navigate(ROUTES.menu.path)}>
        <Header title="Subjects" size="text-4xl" />
        <div className="grid grid-cols-1 gap-y-5 mt-8 mb-4">
          <Button
            text={"All questions"}
            onClick={() => {
              navigate(ROUTES.subjects.path + "/all");
            }}
            className="bg-[#00509e] hover:bg-blue-700 w-1/3"
          />
          {subjects.map((subject) => {
            return (
              <Button
                text={subject.label}
                onClick={() => {
                  navigate(ROUTES.subjects.path + "/" + subject.value);
                }}
                className="bg-[#00509e] hover:bg-blue-700 w-1/3"
              />
            );
          })}
        </div>
      </Card>
    </Container>
  );
};

export default SubjectMenu;
