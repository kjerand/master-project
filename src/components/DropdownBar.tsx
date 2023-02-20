import LanguagesDropdown from "./LanguagesDropdown";
import ThemeDropdown from "./ThemeDropdown";

const DropdownBar = ({ handleThemeChange, theme, onSelectChange }) => {
  return (
    <div className="flex mt-3">
      <LanguagesDropdown onSelectChange={onSelectChange} />
      <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
    </div>
  );
};

export default DropdownBar;
