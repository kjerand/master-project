import { EditorState, Modifier } from "draft-js";
import { useState } from "react";
import Immutable from "immutable";
import Button from "../base/Button";
import Dropdown from "react-dropdown";

const AddTextVariable = ({
  editorState,
  setEditorState,
  stringVariables,
  setStringVariables,
}: {
  editorState: EditorState;
  setEditorState: Function;
  stringVariables: StringVariable[];
  setStringVariables: Function;
}) => {
  const { OrderedSet } = Immutable;
  const [stringVariable, setStringVariable] = useState<StringVariable>({
    name: "",
    options: [],
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
      stringVariables.forEach((v) => {
        if (v.name == stringVariable.name) exists = true;
      });
      if (!exists) setStringVariables([...stringVariables, stringVariable]);
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
        className="w-24 border-gray-600 border p-2 mr-2"
      />
      <input
        type={"text"}
        value={option}
        placeholder="Text"
        onChange={(event) => setOption(event.target.value)}
        className="mr-4 border-gray-600 border p-2 w-96"
      />

      <button
        value={option}
        onClick={() => {
          setStringVariable({
            ...stringVariable,
            options: [...stringVariable.options, option],
          });
          setOption("");
        }}
        className={`shadow bg-green-800 hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white px-3 text-md rounded`}
      >
        Add
      </button>

      <Button
        onClick={() => {
          addVariable();
        }}
        text="Add variable"
        className="bg-blue-700 ml-auto mr-3 px-5"
      />
    </div>
  );
};

export default AddTextVariable;
