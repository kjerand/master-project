import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Empty from "../components/base/Empty";
import Header from "../components/base/Header";
import QuestionDropdown from "../components/AnswerQuestion/QuestionDropdown";
import QuestionDetails from "../components/QuestionBank/QuestionDetails";
import ROUTES from "../ROUTES";

const QuestionBank = () => {
  const questionList = useSelector((state: RootState) => state.questions);
  const [taskIndex, setTaskIndex] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <Container>
      {questionList.questions.length === 0 ? (
        <Empty goBack={() => navigate(ROUTES.admin.path)} />
      ) : (
        <Card width="w-3/4" goBack={() => navigate(ROUTES.admin.path)}>
          <Header title="Question bank" size="text-3xl" />

          <QuestionDetails
            question={questionList.questions[taskIndex]}
            taskIndex={taskIndex}
            setTaskIndex={setTaskIndex}
          />
        </Card>
      )}
    </Container>
  );
};

export default QuestionBank;
