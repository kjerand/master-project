import Card from "../components/base/Card";
import Container from "../components/base/Container";
import QuestionForm from "../components/TaskGenerator/QuestionForm";

const TaskGenerator = () => {
  return (
    <Container>
      <Card>
        <QuestionForm />
      </Card>
    </Container>
  );
};

export default TaskGenerator;
