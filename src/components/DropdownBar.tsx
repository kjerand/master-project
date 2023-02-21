import LanguagesDropdown from "./LanguagesDropdown";
import QuestionDropdown from "./QuestionDropdown";
import ThemeDropdown from "./ThemeDropdown";

const DropdownBar = ({
  handleThemeChange,
  theme,
  onSelectChange,
  taskIndex,
  setTaskIndex,
  length,
}) => {
  return (
    <div className="flex mt-3">
      <QuestionDropdown
        taskIndex={taskIndex}
        setTaskIndex={setTaskIndex}
        length={length}
      />
      <LanguagesDropdown onSelectChange={onSelectChange} />
      <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
    </div>
  );
};

export default DropdownBar;
