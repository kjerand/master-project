import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Header from "../components/base/Header";
import QuestionDropdown from "../components/CodeSubmission/QuestionDropdown";
import QuestionDetails from "../components/QuestionBank/QuestionDetails";

const QuestionBank = () => {
  const questionList = useSelector((state: RootState) => state.questions);
  const [taskIndex, setTaskIndex] = useState<number>(0);

  return (
    <Container>
      <Card>
        <Header title="Question bank" size="4xl" />

        <QuestionDetails
          question={questionList.questions[taskIndex]}
          taskIndex={taskIndex}
          setTaskIndex={setTaskIndex}
        />
      </Card>
    </Container>
  );
};

export default QuestionBank;
