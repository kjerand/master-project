import React from "react";
import Select from "react-select";
import { languages } from "../../utils/languages";

const LanguagesDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languages}
      defaultValue={languages[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
      menuPlacement="top"
      className="font-mono text-sm ml-2"
    />
  );
};

export default LanguagesDropdown;
