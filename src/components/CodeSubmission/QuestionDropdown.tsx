import { useSelector } from "react-redux";
import Select from "react-select";
import { RootState } from "../../app/store";

const QuestionDropdown = ({
  taskIndex,
  setTaskIndex,
}: {
  taskIndex: number;
  setTaskIndex: Function;
}) => {
  const questionList = useSelector((state: RootState) => state.questions);

  const indices = Array.from(Array(questionList.questions.length)).map(
    (v, index) => {
      return {
        label: questionList.questions[index].title,
        value: index,
      };
    }
  );
  return (
    <Select
      placeholder={`Choose question`}
      defaultValue={indices[0]}
      options={indices}
      onChange={(selectedOption) => setTaskIndex(selectedOption.value)}
      menuPlacement="top"
      className="w-1/4"
    />
  );
};

export default QuestionDropdown;
