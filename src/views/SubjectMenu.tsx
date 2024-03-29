import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuestions } from "../store/questions";
import Button from "../components/base/Button";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Header from "../components/base/Header";
import { initDatabase } from "../database/database";
import { courses } from "../utils/courses";
import useMobile from "../utils/useMobile";

const SubjectMenu = () => {
  const navigate = useNavigate();

  const isMobile: boolean = useMobile() <= 750;

  return (
    <Container>
      <Card>
        <Header title="Menu" size="text-3xl" />

        <div className="grid-cols-1 gap-y-5 mt-8 mb-4">
          {Object.keys(courses).map((key, index) => {
            return (
              <div key={key} className="grid gap-y-3 mt-5">
                <Header title={key} size="text-xl" />
                <Button
                  text={"All questions"}
                  onClick={() => {
                    navigate("subjects/" + key);
                  }}
                  className={`bg-blue-900 hover:bg-blue-700 ${
                    isMobile ? "w-4/5" : "w-1/2"
                  }`}
                />
                {courses[key].map((subject) => {
                  return (
                    <Button
                      key={subject.value}
                      text={subject.label}
                      onClick={() => {
                        navigate("subjects/" + subject.value);
                      }}
                      className={`bg-[#00509e] hover:bg-blue-700 col-span-1 ${
                        isMobile ? "w-4/5" : "w-1/2"
                      }`}
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
