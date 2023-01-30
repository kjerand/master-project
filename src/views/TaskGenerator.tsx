import Card from "../components/Card";
import Container from "../components/Container";
import TaskForm from "../components/TaskForm";

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
