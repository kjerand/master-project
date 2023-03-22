import LanguagesDropdown from "./LanguagesDropdown";
import QuestionDropdown from "./QuestionDropdown";
import ThemeDropdown from "./ThemeDropdown";

const DropdownBar = ({
  handleThemeChange,
  theme,
  onSelectChange,
  taskIndex,
  setTaskIndex,
  questionList,
}) => {
  return (
    <div className="flex mt-3">
      {/* <QuestionDropdown
        taskIndex={taskIndex}
        setTaskIndex={setTaskIndex}
        className="w-1/4"
        questionList={questionList}
      />
       <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />*/}

      <LanguagesDropdown onSelectChange={onSelectChange} />
    </div>
  );
};

export default DropdownBar;
