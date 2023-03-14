import { useNavigate } from "react-router-dom";
import Button from "../components/base/Button";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Header from "../components/base/Header";
import ROUTES from "../ROUTES";
import { courses } from "../utils/courses";

const SubjectMenu = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Card goBack={() => navigate(ROUTES.menu.path)}>
        <Header title="Courses" size="text-3xl" />

        <div className="grid-cols-1 gap-y-5 mt-8 mb-4">
          {Object.keys(courses).map((key, index) => {
            return (
              <div key={key} className="grid gap-y-3 mt-5">
                <Header title={key} size="text-xl" />
                <Button
                  text={"All questions"}
                  onClick={() => {
                    navigate(ROUTES.subjects.path + "/" + key);
                  }}
                  className="bg-[#00509e] hover:bg-blue-700 w-1/3"
                />
                {courses[key].map((subject) => {
                  return (
                    <Button
                      key={subject.value}
                      text={subject.label}
                      onClick={() => {
                        navigate(ROUTES.subjects.path + "/" + subject.value);
                      }}
                      className="bg-[#00509e] hover:bg-blue-700 w-1/3 col-span-1"
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </Card>
    </Container>
  );
};

export default SubjectMenu;
