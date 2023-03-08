import { useSelector } from "react-redux";
import Select from "react-select";
import { RootState } from "../../app/store";

const QuestionDropdown = ({
  taskIndex,
  setTaskIndex,
  className = "",
}: {
  taskIndex: number;
  setTaskIndex: Function;
  className?: string;
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
    <div className={className}>
      <Select
        placeholder={`Choose question`}
        options={indices}
        value={indices[taskIndex]}
        onChange={(selectedOption) => setTaskIndex(selectedOption.value)}
        menuPlacement="top"
        className="font-mono"
      />
    </div>
  );
};

export default QuestionDropdown;
