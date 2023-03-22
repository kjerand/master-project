import Select from "react-select";

const QuestionDropdown = ({
  questionList,
  taskIndex,
  setTaskIndex,
  className = "",
}: {
  questionList: Question[];
  taskIndex: number;
  setTaskIndex: Function;
  className?: string;
}) => {
  const indices = Array.from(Array(questionList.length)).map((v, index) => {
    return {
      label: questionList[index].title,
      value: index,
    };
  });
  return (
    <div className={className}>
      <Select
        placeholder={`Choose question`}
        options={indices}
        value={indices[taskIndex]}
        onChange={(selectedOption) => setTaskIndex(selectedOption.value)}
        menuPlacement="top"
        className="font-mono text-sm"
      />
    </div>
  );
};

export default QuestionDropdown;
