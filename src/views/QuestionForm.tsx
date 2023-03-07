import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  SelectionState,
  Modifier,
  ContentState,
  RichUtils,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AddIntegerVariable from "../components/QuestionForm/AddIntegerVariable";
import Button from "../components/base/Button";
import AddTextVariable from "../components/QuestionForm/AddTextVariable";
import AddDecimalVariable from "../components/QuestionForm/AddDecimalVariable";
import { generateIntegerVariable } from "../utils/generateIntegerVariable";
import Immutable from "immutable";
import { generateStringVariable } from "../utils/generateStringVariable";
import { generateDecimalVariable } from "../utils/generateDecimalVariable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { addQuestions, Question } from "../app/questions";
import { useNavigate } from "react-router-dom";
import ROUTES from "../ROUTES";
import CodeEditor from "../components/CodeSubmission/CodeEditor";
import { Language, languages } from "../utils/languages";
import { defineTheme, Theme } from "../utils/defineTheme";
import CodeSolution from "../components/QuestionForm/CodeSolution";
import Header from "../components/base/Header";
import axios from "axios";
import { encode } from "js-base64";
import ShowVariables from "../components/QuestionForm/ShowVariables";
import Container from "../components/base/Container";
import Card from "../components/base/Card";
const options = ["Add variable", "Text", "Integer", "Decimal"];

const QuestionForm = () => {
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [theme, setTheme] = useState<Theme>();
  const [code, setCode] = useState<string>();
  const [submit, setSumbit] = useState<boolean>(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [codeEditorState, setCodeEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [solutionEditorState, setSolutionEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const { OrderedSet } = Immutable;
  const [numberOfTasks, setNumberOfTasks] = useState<number>(10);
  const [questionTitle, setQuestionTitle] = useState<string>("Example");
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  const [dropdownOption, setDropdownOption] = useState<string>("");

  const [variables, setVariables] = useState<Variable[]>([]);

  const [codeCheckbox, setCodeCheckbox] = useState<boolean>(false);
  const [codeSolutionCheckbox, setCodeSolutionCheckbox] =
    useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    defineTheme("brilliance-black").then((_) =>
      setTheme({ value: "brilliance-black", label: "Brilliance Black" })
    );
  }, []);

  const insertVariable = (
    state: EditorState,
    name: string,
    value: string
  ): EditorState => {
    const str = "{{" + name + "}}";

    const replacedText = state
      .getCurrentContent()
      .getPlainText()
      .replaceAll(str, value);

    let newState = EditorState.createWithContent(
      ContentState.createFromText(replacedText)
    );

    const selectionState = newState.getSelection();
    const newSelection = selectionState.merge({
      anchorOffset: 0,
      focusOffset: replacedText.length,
    });
    newState = EditorState.forceSelection(newState, newSelection);
    newState = RichUtils.toggleInlineStyle(newState, "CODE");
    newState = EditorState.forceSelection(newState, selectionState);
    return newState;
  };

  const generate = async (currentState: EditorState) => {
    for (let i = 0; i < numberOfTasks; i++) {
      let values = [];
      let types: ("str" | "num")[] = [];
      let state = EditorState.createWithContent(
        currentState.getCurrentContent()
      );

      for (let variable of variables) {
        let value;
        let type;
        if (variable.type === "str") {
          const data = variable.data as StringVariable;
          value = generateStringVariable(data.options);
          type = "str";
        } else if (variable.type === "int") {
          const data = variable.data as IntegerVariable;
          value = generateIntegerVariable(data.min, data.max);
          type = "num";
        } else if (variable.type === "dec") {
          const data = variable.data as DecimalVariable;
          value = generateDecimalVariable(data.min, data.max, 2);
          type = "num";
        }
        values.push(value);
        types.push(type);

        state = insertVariable(state, variable.name, value.toString());
      }

      let code = undefined;
      if (codeCheckbox)
        code = codeEditorState.getCurrentContent().getPlainText();

      let solution = "";
      if (codeSolutionCheckbox) solution = addInputData(values, types);

      let title;
      if (questionTitle === "") title = "Question" + " (" + (i + 1) + ")";
      else title = questionTitle + " (" + (i + 1) + ")";

      questions.push({
        questionBody: editorState,
        solutionBody: state,
        solution: state.getCurrentContent().getPlainText(),
        initialCode: code,
        codeSolution: solution,
        title: title,
      });
    }

    dispatch(addQuestions(questions));
    navigate(ROUTES.menu.path);
  };
  const addInputData = (
    values: (string | number)[],
    types: ("str" | "num")[]
  ) => {
    let val = "\nconsole.log(solution(";
    for (let i = 0; i < values.length; i++) {
      if (types[i] === "str") val += "'" + values[i] + "'" + ",";
      else if (types[i] === "num") val += values[i] + ",";
    }
    if (values.length > 0) val = val.substring(0, val.length - 1);
    val += "))";
    return code + val;
  };

  const variableForm = () => {
    switch (dropdownOption) {
      case "Text":
        return (
          <AddTextVariable
            editorState={solutionEditorState}
            setEditorState={setSolutionEditorState}
            variables={variables}
            setVariables={setVariables}
          />
        );
      case "Integer":
        return (
          <AddIntegerVariable
            editorState={solutionEditorState}
            setEditorState={setSolutionEditorState}
            variables={variables}
            setVariables={setVariables}
          />
        );
      case "Decimal":
        return (
          <AddDecimalVariable
            editorState={solutionEditorState}
            setEditorState={setSolutionEditorState}
            variables={variables}
            setVariables={setVariables}
          />
        );
    }
  };

  const onChange = (data) => {
    setCode(data);
  };

  return (
    <Container>
      <Card>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (submit) generate(solutionEditorState);
          }}
        >
          <h3 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-700 mb-12 text-center">
            Genererate variants of question
          </h3>

          <div className="my-8 grid grid-cols-2 w-full gap-3">
            <div className="flex">
              <h3 className="font-medium leading-tight text-lg text-gray-700 mr-4 my-auto">
                Question title:
              </h3>
              <input
                type={"text"}
                value={questionTitle}
                placeholder=""
                onChange={(event) => {
                  setQuestionTitle(event.target.value);
                }}
                className="border-gray-600 border px-2 my-auto rounded"
                required
              />
            </div>
            <div className="flex">
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
                className="border-gray-600 border px-2 my-auto rounded"
                required
              />
            </div>
          </div>

          <div className="items-center m-auto">
            <div className="bg-gray-100 rounded-md p-3 mb-4">
              <Header title="Question description" size="lg" />
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
            {codeCheckbox && (
              <div className="w-2/3 items-center m-auto bg-gray-100 p-3 rounded-md my-4 border-dashed border-2 border-gray-400">
                <Header title="Attached question code" size="lg" />
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

            <div className="bg-gray-100 rounded-md p-3 mt-4">
              <Header title="Variable question solution" size="lg" />
              <Editor
                editorState={solutionEditorState}
                toolbarClassName="hidden"
                wrapperClassName="wrapperClassName"
                editorClassName="border-1"
                onEditorStateChange={setSolutionEditorState}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
            </div>
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

          <ShowVariables variables={variables} setVariables={setVariables} />

          <div className="grid grid-cols-2 mb-5 m-auto">
            <div className="flex m-auto items-center">
              <input
                onChange={(e) => setCodeSolutionCheckbox(!codeSolutionCheckbox)}
                type={"checkbox"}
                className="w-4 h-4 mr-4 pt-2"
                checked={codeSolutionCheckbox}
              />
              <div className="text-md font-medium leading-tight text-gray-700">
                {"Add code solution"}
              </div>
            </div>
            <div className="flex m-auto items-center">
              <input
                onChange={(e) => setCodeCheckbox(!codeCheckbox)}
                type={"checkbox"}
                className="w-4 h-4 mr-4 pt-2"
                checked={codeCheckbox}
              />
              <div className="text-md font-medium leading-tight text-gray-700">
                {"Attach question code"}
              </div>
            </div>
          </div>

          {theme && codeSolutionCheckbox && (
            <CodeSolution
              code={code}
              theme={theme.value}
              language={language}
              onChange={onChange}
              variables={variables}
            />
          )}

          <Button
            text="Generate question variants"
            onClick={() => {
              setSumbit(true);
            }}
            className="bg-blue-800 hover:bg-blue-700 px-5 w-full"
          />
        </form>
      </Card>
    </Container>
  );
};

export default QuestionForm;
