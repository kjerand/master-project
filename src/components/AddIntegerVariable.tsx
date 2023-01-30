import { EditorState, Modifier } from "draft-js";
import { useState } from "react";
import Immutable from "immutable";
import Button from "./Button";

const AddIntegerVariable = ({
  editorState,
  setEditorState,
  integerVariables,
  setIntegerVariables,
}: {
  editorState: EditorState;
  setEditorState: Function;
  integerVariables: IntegerVariable[];
  setIntegerVariables: Function;
}) => {
  const { OrderedSet } = Immutable;
  const [integerVariable, setIntegerVariable] = useState<IntegerVariable>({
    name: "",
    min: 0,
    max: 0,
  });

  const addVariable = () => {
    let exists = false;
    integerVariables.forEach((v) => {
      if (v.name == integerVariable.name) exists = true;
    });
    if (!exists)
      if (integerVariable.name != "") {
        let newContent = Modifier.insertText(
          editorState.getCurrentContent(),
          editorState.getSelection(),
          `{{${integerVariable.name}}}`,
          OrderedSet.of("BOLD")
        );

        setEditorState(
          EditorState.push(editorState, newContent, "insert-characters")
        );

        setIntegerVariables(integerVariable);
      }
  };
  return (
    <div className="my-5 pt-4 flex">
      <input
        type={"string"}
        placeholder="Name"
        value={integerVariable.name}
        onChange={(event) => {
          setIntegerVariable({ ...integerVariable, name: event.target.value });
        }}
        className="w-24 border-gray-600 border p-2 mr-2"
      />
      <input
        type={"number"}
        placeholder="Min"
        onChange={(event) => {
          setIntegerVariable({
            ...integerVariable,
            min: parseInt(event.target.value),
          });
        }}
        className="border-gray-600 border p-2 mr-2"
      />
      <input
        type={"number"}
        placeholder="Max"
        onChange={(event) => {
          setIntegerVariable({
            ...integerVariable,
            max: parseInt(event.target.value),
          });
        }}
        className="border-gray-600 border p-2 mr-2"
      />
      <Button
        onClick={() => {
          addVariable();
        }}
        text="Add variable"
        className="bg-blue-700 ml-auto mr-3"
      />
    </div>
  );
};

export default AddIntegerVariable;
