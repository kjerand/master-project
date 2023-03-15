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
import Select from "react-select";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AddIntegerVariable from "../components/CreateQuestion/AddIntegerVariable";
import Button from "../components/base/Button";
import AddTextVariable from "../components/CreateQuestion/AddTextVariable";
import AddDecimalVariable from "../components/CreateQuestion/AddDecimalVariable";
import { generateIntegerVariable } from "../utils/generateIntegerVariable";
import Immutable from "immutable";
import { generateStringVariable } from "../utils/generateStringVariable";
import { generateDecimalVariable } from "../utils/generateDecimalVariable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addQuestions, Question } from "../store/questions";
import { useNavigate } from "react-router-dom";
import ROUTES from "../ROUTES";
import CodeEditor from "../components/AnswerQuestion/CodeEditor";
import { Language, languages } from "../utils/languages";
import { defineTheme, Theme } from "../utils/defineTheme";
import CodeSolution from "../components/CreateQuestion/CodeSolution";
import Header from "../components/base/Header";
import axios from "axios";
import { encode } from "js-base64";
import ShowVariables from "../components/CreateQuestion/ShowVariables";
import Container from "../components/base/Container";
import Card from "../components/base/Card";
import AddIntegerListVariable from "../components/CreateQuestion/AddIntegerListVariable";
import { generateIntegerListVariable } from "../utils/generateIntegerListVariable";
import { createQuestions } from "../database/questions";
import { courses, getSubjects } from "../utils/courses";
const options = [
  "Add variable",
  "Text",
  "Integer",
  "Decimal",
  "List of integers",
];

const CreateQuestion = () => {
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
  const [numberOfTasks, setNumberOfTasks] = useState<number>(5);
  const [questionTitle, setQuestionTitle] = useState<string>("Example");
  const [questions, setQuestions] = useState<Question[]>([]);
  const questionList = useSelector((state: RootState) => state.questions);
  const navigate = useNavigate();

  const [dropdownOption, setDropdownOption] = useState<string>("");

  const [variables, setVariables] = useState<Variable[]>([]);

  const [codeCheckbox, setCodeCheckbox] = useState<boolean>(false);
  const [codeSolutionCheckbox, setCodeSolutionCheckbox] =
    useState<boolean>(false);
  const [variantCheckbox, setVariantCheckbox] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>("general");

  const dispatch = useDispatch();

  useEffect(() => {
    defineTheme("iplastic").then((_) =>
      setTheme({ value: "iplastic", label: "iPlastic" })
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

    return newState;
  };

  const generate = async (currentState: EditorState) => {
    for (let i = 0; i < numberOfTasks; i++) {
      let values = [];
      let types: ("str" | "num" | "num[]")[] = [];
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
        } else if (variable.type === "int[]") {
          const data = variable.data as IntegerListVariable;
          value = generateIntegerListVariable(data.min, data.max, data.size);
          type = "num[]";
        }
        values.push(value);
        types.push(type);

        state = insertVariable(state, variable.name, value.toString());
      }

      let code = undefined;
      if (codeCheckbox)
        code = codeEditorState.getCurrentContent().getPlainText();

      let textSolution = "";
      let codeSolution = "";
      if (codeSolutionCheckbox) codeSolution = addInputData(values, types);
      else textSolution = state.getCurrentContent().getPlainText();

      let title;
      if (questionTitle === "")
        title =
          "Question" + " (" + (i + 1 + questionList.questions.length) + ")";
      else
        title =
          questionTitle + " (" + (i + 1 + questionList.questions.length) + ")";

      const variant = variantCheckbox ? "text" : "code";
      questions.push({
        questionBody: editorState.getCurrentContent().getPlainText(),
        solutionBody: state.getCurrentContent().getPlainText(),
        initialCode: code,
        textSolution: textSolution,
        codeSolution: codeSolution,
        title: title,
        variant: variant,
        subject: subject,
      });
    }

    await createQuestions(questions);
    dispatch(addQuestions(questions));
    navigate(ROUTES.menu.path);
  };
  const addInputData = (
    values: (string | number)[],
    types: ("str" | "num" | "num[]")[]
  ) => {
    let val = "\n\nconsole.log(solution(";
    for (let i = 0; i < values.length; i++) {
      if (types[i] === "str") val += "'" + values[i] + "'" + ", ";
      else if (types[i] === "num") val += values[i] + ", ";
      else if (types[i] === "num[]") val += values[i] + ", ";
    }
    if (values.length > 0) val = val.substring(0, val.length - 2);
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
      case "List of integers":
        return (
          <AddIntegerListVariable
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
      <Card width="w-1/2" goBack={() => navigate(ROUTES.admin.path)}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (submit) generate(solutionEditorState);
          }}
        >
          <Header title="Genererate variants of question" size="text-2xl" />

          <div className="my-8 grid grid-cols-5 w-full gap-5">
            <div className="flex col-span-2">
              <h3 className="font-medium font-mono leading-tight text-base text-gray-700 mr-3 my-auto">
                Title:
              </h3>
              <input
                type={"text"}
                value={questionTitle}
                placeholder=""
                onChange={(event) => {
                  setQuestionTitle(event.target.value);
                }}
                className="border-gray-600 border px-2 my-auto rounded font-mono w-full"
                required
              />
            </div>
            <div className="flex">
              <h3 className="font-base font-mono leading-tight text-base text-gray-700 mr-3 my-auto">
                Variants:
              </h3>
              <input
                type={"number"}
                value={numberOfTasks}
                placeholder=""
                onChange={(event) => {
                  setNumberOfTasks(parseInt(event.target.value));
                }}
                className="border-gray-600 border px-2 my-auto rounded font-mono w-1/2"
                required
              />
            </div>
            <div className="flex col-span-2">
              <h3 className="font-medium font-mono leading-tight text-base text-gray-700 mr-3 my-auto">
                Subject:
              </h3>
              <Select
                placeholder={`Choose subject...`}
                options={getSubjects()}
                onChange={(selectedOption) => setSubject(selectedOption.value)}
                menuPlacement="top"
                className="font-mono w-full text-sm"
              />
            </div>
          </div>

          <div className="items-center m-auto">
            <div className="bg-gray-100 rounded-md p-3 mb-4">
              <Header title="Question description" size="text-lg" />
              <Editor
                toolbar={{
                  options: ["inline", "list", "textAlign", "history"],
                }}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName font-mono"
                onEditorStateChange={setEditorState}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                }}
              />
            </div>
            {codeCheckbox && (
              <div className="w-2/3 items-center m-auto bg-gray-100 p-3 rounded-md my-4 border-dashed border-2 border-gray-400">
                <Header title="Attached question code" size="text-lg" />
                <Editor
                  editorState={codeEditorState}
                  toolbarClassName="hidden"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName font-mono"
                  onEditorStateChange={setCodeEditorState}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                />
              </div>
            )}

            <div className="bg-gray-100 rounded-md p-3 mt-4">
              <Header title="Variable question solution" size="text-lg" />
              <Editor
                editorState={solutionEditorState}
                toolbarClassName="hidden"
                wrapperClassName="wrapperClassName"
                editorClassName="border-1 font-mono"
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
            className="mb-5 border-t-4 border-gray-700 pt-4 font-mono"
          />
          {variableForm()}

          <ShowVariables variables={variables} setVariables={setVariables} />

          <div className="grid grid-cols-3 mb-5 m-auto">
            <div className="flex m-auto items-center">
              <input
                onChange={(e) => {
                  if (codeSolutionCheckbox) setVariantCheckbox(false);
                  setCodeSolutionCheckbox(!codeSolutionCheckbox);
                }}
                type={"checkbox"}
                className="w-4 h-4 mr-4 pt-2"
                checked={codeSolutionCheckbox}
              />
              <div className="text-md font-medium leading-tight text-gray-700 font-mono">
                {"Add code solution"}
              </div>
            </div>

            <div className="flex m-auto items-center">
              <input
                onChange={(e) => {
                  setVariantCheckbox(!variantCheckbox);
                  setCodeCheckbox(false);
                }}
                type={"checkbox"}
                className="w-4 h-4 mr-4 pt-2"
                checked={variantCheckbox}
                disabled={!codeSolutionCheckbox}
              />
              <div className="text-md font-medium leading-tight text-gray-700 font-mono">
                {"Answer with text"}
              </div>
            </div>

            <div className="flex m-auto items-center">
              <input
                onChange={(e) => setCodeCheckbox(!codeCheckbox)}
                type={"checkbox"}
                className="w-4 h-4 mr-4 pt-2"
                checked={codeCheckbox}
                disabled={variantCheckbox}
              />
              <div className="text-md font-medium leading-tight text-gray-700 font-mono">
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
            className="bg-[#00509e] hover:bg-blue-700 px-5 w-full"
          />
        </form>
      </Card>
    </Container>
  );
};

export default CreateQuestion;
