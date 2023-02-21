import Select from "react-select";

const QuestionDropdown = ({
  taskIndex,
  setTaskIndex,
  length,
}: {
  taskIndex: number;
  setTaskIndex: Function;
  length: number;
}) => {
  const indices = Array.from(Array(length)).map((v, index) => {
    return {
      label: index + 1,
      value: index,
    };
  });
  return (
    <Select
      placeholder={`Choose question`}
      options={indices}
      onChange={(selectedOption) => setTaskIndex(selectedOption.value)}
      menuPlacement="top"
    />
  );
};

export default QuestionDropdown;
