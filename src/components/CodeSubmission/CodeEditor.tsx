import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditor = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange(value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="60vh"
        width={`100%`}
        language={language || "typecript"}
        value={value}
        theme={theme}
        defaultValue="class Complex {
          real: number;
          imag: number;
        
          constructor(real: number, img: number) {
            this.real = real;
            this.imag = img;
          }
        }
        
        let v = [new Complex(2, 2), new Complex(1, 1)];"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
