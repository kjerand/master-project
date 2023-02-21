import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, SelectionState, Modifier } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AddIntegerVariable from "./AddIntegerVariable";
import Button from "../base/Button";
import AddTextVariable from "./AddTextVariable";
import AddDecimalVariable from "./AddDecimalVariable";
import { generateIntegerVariable } from "../../utils/generateIntegerVariable";
import Immutable from "immutable";

import { generateStringVariable } from "../../utils/generateStringVariable";
import { generateDecimalVariable } from "../../utils/generateDecimalVariable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { addQuestions, Question } from "../../app/questions";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../ROUTES";
const options = ["Add variable", "Text", "Integer", "Decimal"];

const TaskForm = () => {
  const [submit, setSumbit] = useState<boolean>(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [codeEditorState, setCodeEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { OrderedSet } = Immutable;
  const [numberOfTasks, setNumberOfTasks] = useState<number>(5);
  const [tasks, setTasks] = useState<Question[]>([]);
  const navigate = useNavigate();

  const [dropdownOption, setDropdownOption] = useState<string>("");

  const [integerVariables, setIntegerVariables] = useState<IntegerVariable[]>(
    []
  );

  const [stringVariables, setStringVariables] = useState<StringVariable[]>([]);

  const [decimalVariables, setDecimalVariables] = useState<DecimalVariable[]>(
    []
  );

  const [codeCheckbox, setCodeCheckbox] = useState<boolean>(false);

  const dispatch = useDispatch();

  const addIntegerVariable = (variable: IntegerVariable) => {
    let exists = false;
    integerVariables.forEach((v) => {
      if (v.name == variable.name) exists = true;
    });
    if (!exists) setIntegerVariables([...integerVariables, variable]);
  };

  const findWithRegex = (regex, contentBlock, callback) => {
    const text = contentBlock.getText();
    let matchArr, start, end;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      end = start + matchArr[0].length;
      callback(start, end);
    }
  };

  const generate = () => {
    for (let i = 0; i < numberOfTasks; i++) {
      let state = EditorState.createWithContent(
        editorState.getCurrentContent()
      );

      for (let variable of integerVariables) {
        let contentState = state.getCurrentContent();
        const blockMap = state.getCurrentContent().getBlockMap();
        const regex = new RegExp("{{" + variable.name + "}}", "g");
        const selectionsToReplace = [];

        blockMap.forEach((contentBlock) =>
          findWithRegex(regex, contentBlock, (start, end) => {
            const blockKey = contentBlock.getKey();
            const blockSelection = SelectionState.createEmpty(blockKey).merge({
              anchorOffset: start,
              focusOffset: end,
            });
            selectionsToReplace.push(blockSelection);
          })
        );

        selectionsToReplace.forEach((selectionState) => {
          contentState = Modifier.replaceText(
            contentState,
            selectionState,
            `${generateIntegerVariable(variable.min, variable.max)}`,
            OrderedSet.of("CODE")
          );
        });

        state = EditorState.createWithContent(contentState);
      }

      for (let variable of stringVariables) {
        let contentState = state.getCurrentContent();
        const blockMap = state.getCurrentContent().getBlockMap();
        const regex = new RegExp("{{" + variable.name + "}}", "g");
        const selectionsToReplace = [];

        blockMap.forEach((contentBlock) =>
          findWithRegex(regex, contentBlock, (start, end) => {
            const blockKey = contentBlock.getKey();
            const blockSelection = SelectionState.createEmpty(blockKey).merge({
              anchorOffset: start,
              focusOffset: end,
            });

            selectionsToReplace.push(blockSelection);
          })
        );

        selectionsToReplace.forEach((selectionState) => {
          contentState = Modifier.replaceText(
            contentState,
            selectionState,
            `${generateStringVariable(variable.options)}`,
            OrderedSet.of("CODE")
          );
        });

        state = EditorState.createWithContent(contentState);
      }

      for (let variable of decimalVariables) {
        let contentState = state.getCurrentContent();
        const blockMap = state.getCurrentContent().getBlockMap();
        const regex = new RegExp("{{" + variable.name + "}}", "g");
        const selectionsToReplace = [];

        blockMap.forEach((contentBlock) =>
          findWithRegex(regex, contentBlock, (start, end) => {
            const blockKey = contentBlock.getKey();
            const blockSelection = SelectionState.createEmpty(blockKey).merge({
              anchorOffset: start,
              focusOffset: end,
            });

            selectionsToReplace.push(blockSelection);
          })
        );

        selectionsToReplace.forEach((selectionState) => {
          contentState = Modifier.replaceText(
            contentState,
            selectionState,
            `${generateDecimalVariable(variable.min, variable.max, 2)}`,
            OrderedSet.of("CODE")
          );
        });

        state = EditorState.createWithContent(contentState);
      }

      tasks.push({
        questionBody: state,
        solution: "",
        initialCode: codeCheckbox
          ? codeEditorState.getCurrentContent().getPlainText()
          : undefined,
      });
    }

    dispatch(addQuestions(tasks));
    navigate(ROUTES.menu.path);
  };

  const variableForm = () => {
    switch (dropdownOption) {
      case "Text":
        return (
          <AddTextVariable
            editorState={editorState}
            setEditorState={setEditorState}
            stringVariables={stringVariables}
            setStringVariables={setStringVariables}
          />
        );
      case "Integer":
        return (
          <AddIntegerVariable
            editorState={editorState}
            setEditorState={setEditorState}
            integerVariables={integerVariables}
            setIntegerVariables={addIntegerVariable}
          />
        );
      case "Decimal":
        return (
          <AddDecimalVariable
            editorState={editorState}
            setEditorState={setEditorState}
            decimalVariables={decimalVariables}
            setDecimalVariables={setDecimalVariables}
          />
        );
    }
  };

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (submit) generate();
        }}
      >
        <h3 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-700 mb-12 text-center">
          Genererate variants of question
        </h3>
        <div className="items-center m-auto bg-gray-100 rounded-md p-3">
          <Editor
            toolbar={{
              options: ["inline", "list", "textAlign", "history"],
            }}
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={setEditorState}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
            }}
          />
        </div>
        <Dropdown
          options={options}
          onChange={(data) => {
            setDropdownOption(data.value);
          }}
          value={options[0]}
          placeholder="Add variable"
          className="mb-5 border-t-4 border-gray-700 pt-4"
        />
        {variableForm()}
        <div className="flex my-5">
          <h3 className="font-medium leading-tight text-lg text-gray-700 mr-4 my-auto">
            Number of variants:
          </h3>
          <input
            type={"number"}
            value={numberOfTasks}
            placeholder=""
            onChange={(event) => {
              setNumberOfTasks(parseInt(event.target.value));
            }}
            className="w-24 border-gray-600 border px-2 my-auto"
            required
          />
        </div>

        <div className="flex items-center mb-3">
          <input
            onChange={(e) => setCodeCheckbox(!codeCheckbox)}
            type={"checkbox"}
            className="w-4 h-4 mr-4 pt-2"
            checked={codeCheckbox}
          />
          <div className="text-md font-medium leading-tight text-gray-700">
            {"Add question code"}
          </div>
        </div>

        {codeCheckbox && (
          <div className="w-2/3 items-center m-auto bg-gray-100 p-3 rounded-md mb-3">
            <Editor
              editorState={codeEditorState}
              toolbarClassName="hidden"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={setCodeEditorState}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
              }}
            />
          </div>
        )}

        <Button
          text="Submit"
          onClick={() => {
            setSumbit(true);
          }}
          className="bg-gray-700 px-5"
        />
      </form>
    </>
  );
};

export default TaskForm;
