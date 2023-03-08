import { EditorState, Modifier } from "draft-js";
import { useState } from "react";
import Immutable from "immutable";
import Button from "../base/Button";
import Dropdown from "react-dropdown";

const AddTextVariable = ({
  editorState,
  setEditorState,
  variables,
  setVariables,
}: {
  editorState: EditorState;
  setEditorState: Function;
  variables: Variable[];
  setVariables: Function;
}) => {
  const { OrderedSet } = Immutable;
  const [stringVariable, setStringVariable] = useState<Variable>({
    data: {
      options: [],
    },
    type: "str",
    name: "",
  });
  const [option, setOption] = useState<string>("");

  const addVariable = () => {
    if (stringVariable.name != "") {
      let newContent = Modifier.insertText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        `{{${stringVariable.name}}}`,
        OrderedSet.of("BOLD")
      );

      setEditorState(
        EditorState.push(editorState, newContent, "insert-characters")
      );

      let exists = false;
      variables.forEach((v) => {
        if (v.name == stringVariable.name) exists = true;
      });
      if (!exists) setVariables([...variables, stringVariable]);
    }
  };
  return (
    <div className="my-5 pt-4 flex">
      <input
        type={"string"}
        placeholder="Name"
        value={stringVariable.name}
        onChange={(event) =>
          setStringVariable({
            ...stringVariable,
            name: event.target.value,
          })
        }
        className="w-24 border-gray-600 border p-2 rounded font-mono"
      />
      <input
        type={"text"}
        value={option}
        placeholder="Text"
        onChange={(event) => setOption(event.target.value)}
        className="mx-2 border-gray-600 border p-2 w-96 rounded font-mono"
      />

      <button
        value={option}
        onClick={() => {
          const data = stringVariable.data as StringVariable;
          setStringVariable({
            ...stringVariable,
            data: {
              ...data,
              options: [...data.options, option],
            },
          });
          setOption("");
        }}
        className={`shadow bg-blue-900 hover:bg-blue-800 focus:shadow-outline focus:outline-none text-white px-3 text-md rounded font-mono`}
      >
        Add
      </button>

      <Button
        onClick={() => {
          addVariable();
        }}
        text="Add variable"
        className="bg-blue-700 hover:bg-blue-600 ml-auto mr-3 px-5"
      />
    </div>
  );
};

export default AddTextVariable;
