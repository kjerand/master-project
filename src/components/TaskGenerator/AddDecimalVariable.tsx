import { EditorState, Modifier } from "draft-js";
import { useState } from "react";
import Immutable from "immutable";
import Button from "../base/Button";

const AddDecimalVariable = ({
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
  const [decimalVariable, setDecimalVariable] = useState<Variable>({
    data: {
      min: 0,
      max: 0,
    },
    type: "dec",
    name: "",
  });

  const addVariable = () => {
    if (decimalVariable.name != "") {
      let newContent = Modifier.insertText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        `{{${decimalVariable.name}}}`,
        OrderedSet.of("BOLD")
      );

      setEditorState(
        EditorState.push(editorState, newContent, "insert-characters")
      );

      let exists = false;
      variables.forEach((v) => {
        if (v.name == decimalVariable.name) exists = true;
      });
      if (!exists) setVariables([...variables, decimalVariable]);
    }
  };
  return (
    <div className="my-5 pt-4 flex">
      <input
        type={"string"}
        placeholder="Name"
        onChange={(event) => {
          setDecimalVariable({ ...decimalVariable, name: event.target.value });
        }}
        className="w-24 border-gray-600 border p-2 mr-2"
      />
      <input
        type={"number"}
        placeholder="Min"
        onChange={(event) => {
          setDecimalVariable({
            ...decimalVariable,
            data: {
              ...decimalVariable.data,
              min: parseInt(event.target.value),
            },
          });
        }}
        step={0.01}
        className="border-gray-600 border p-2 mr-2"
      />
      <input
        type={"number"}
        placeholder="Max"
        onChange={(event) => {
          setDecimalVariable({
            ...decimalVariable,
            data: {
              ...decimalVariable.data,
              max: parseInt(event.target.value),
            },
          });
        }}
        step={0.01}
        className="border-gray-600 border p-2 mr-2"
      />
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

export default AddDecimalVariable;
