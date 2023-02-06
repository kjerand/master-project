import Card from "../components/base/Card";
import Container from "../components/base/Container";
import TaskForm from "../components/TaskGenerator/TaskForm";

const TaskGenerator = () => {
  return (
    <Container>
      <Card>
        <TaskForm />
      </Card>
    </Container>
  );
};

export default TaskGenerator;
