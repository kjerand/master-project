import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Empty from "../components/base/Empty";
import Header from "../components/base/Header";
import QuestionDropdown from "../components/CodeSubmission/QuestionDropdown";
import QuestionDetails from "../components/QuestionBank/QuestionDetails";

const QuestionBank = () => {
  const questionList = useSelector((state: RootState) => state.questions);
  const [taskIndex, setTaskIndex] = useState<number>(0);

  return (
    <Container>
      {questionList.questions.length === 0 ? (
        <Empty />
      ) : (
        <Card width="w-3/4">
          <Header title="Question bank" size="text-4xl" />

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
