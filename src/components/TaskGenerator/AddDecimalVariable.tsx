import { EditorState, Modifier } from "draft-js";
import { useState } from "react";
import Immutable from "immutable";
import Button from "../base/Button";

const AddDecimalVariable = ({
  editorState,
  setEditorState,
  decimalVariables,
  setDecimalVariables,
}: {
  editorState: EditorState;
  setEditorState: Function;
  decimalVariables: DecimalVariable[];
  setDecimalVariables: Function;
}) => {
  const { OrderedSet } = Immutable;
  const [name, setName] = useState<string>("");
  const [decimalVariable, setDecimalVariable] = useState<DecimalVariable>({
    name: "",
    min: 0,
    max: 0,
  });

  const addVariable = () => {
    let exists = false;
    decimalVariables.forEach((v) => {
      if (v.name == decimalVariable.name) exists = true;
    });
    if (!exists)
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
        decimalVariables.forEach((v) => {
          if (v.name == decimalVariable.name) exists = true;
        });
        if (!exists) {
          setDecimalVariables([...decimalVariables, decimalVariable]);
          setDecimalVariable({
            name: "",
            min: decimalVariable.min,
            max: decimalVariable.max,
          });
        }
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
            min: parseInt(event.target.value),
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
            max: parseInt(event.target.value),
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
