import { EditorState, Modifier } from "draft-js";
import { useState } from "react";
import Immutable from "immutable";
import Button from "../base/Button";

const AddIntegerVariable = ({
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
  const [integerVariable, setIntegerVariable] = useState<Variable>({
    data: {
      min: 0,
      max: 0,
    },
    type: "int",
    name: "",
  });

  const addVariable = () => {
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

      let exists = false;
      variables.forEach((v) => {
        if (v.name == integerVariable.name) exists = true;
      });
      if (!exists) setVariables([...variables, integerVariable]);
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
            data: {
              ...integerVariable.data,
              min: parseInt(event.target.value),
            },
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
            data: {
              ...integerVariable.data,
              max: parseInt(event.target.value),
            },
          });
        }}
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

export default AddIntegerVariable;
