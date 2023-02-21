import React, { useState } from "react";

import Editor from "@monaco-editor/react";
import { Language } from "../../utils/languages";
import { Theme } from "../../utils/defineTheme";

const CodeEditor = ({
  onChange,
  language,
  code,
  theme,
  initialCode,
}: {
  onChange: Function;
  language: string;
  code: string;
  theme: string;
  initialCode?: string;
}) => {
  const handleEditorChange = (value) => {
    onChange(value);
  };
  const empty = (value: string) => value !== undefined && value !== "";

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="60vh"
        width={`100%`}
        language={language || "typecript"}
        value={code}
        theme={theme}
        defaultValue={
          !empty(initialCode) ? initialCode : "// write your code here"
        }
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
