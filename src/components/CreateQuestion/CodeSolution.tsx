import Editor from "@monaco-editor/react";
import axios from "axios";
import { decode, encode } from "js-base64";
import { useState } from "react";
import { generateDecimalVariable } from "../../utils/generateDecimalVariable";
import { generateIntegerListVariable } from "../../utils/generateIntegerListVariable";
import { generateIntegerVariable } from "../../utils/generateIntegerVariable";
import { generateStringVariable } from "../../utils/generateStringVariable";
import { Language } from "../../utils/languages";
import Button from "../base/Button";
import Header from "../base/Header";

const CodeSolution = ({
  onChange,
  language,
  code,
  theme,
  initialCode,
  variables,
}: {
  onChange: Function;
  language: Language;
  code: string;
  theme: string;
  initialCode?: string;
  variables: Variable[];
}) => {
  const [outputDetails, setOutputDetails] = useState(null);
  const [exampleSolutionVariableNames, setExampleSolutionVariableNames] =
    useState<string[]>([]);
  const [exampleSolutionVariableValues, setExampleSolutionVariableValues] =
    useState<string | number[]>([]);
  const handleEditorChange = (value) => {
    onChange(value);
  };

  const addInputData = (variables: Variable[]) => {
    let val = "\nconsole.log(solution(";
    let names = [];
    let values = [];
    for (let variable of variables) {
      let value;
      if (variable.type === "str") {
        const data = variable.data as StringVariable;
        value = "'" + generateStringVariable(data.options) + "'";
      } else if (variable.type === "int") {
        const data = variable.data as IntegerVariable;
        value = generateIntegerVariable(data.min, data.max);
      } else if (variable.type === "dec") {
        const data = variable.data as DecimalVariable;
        value = generateDecimalVariable(data.min, data.max, 2);
      } else if (variable.type === "int[]") {
        const data = variable.data as IntegerListVariable;
        value = generateIntegerListVariable(data.min, data.max, data.size);
      }
      names.push(variable.name);
      values.push(value);
      val += value + ",";
    }

    if (variables.length > 0) val = val.substring(0, val.length - 1);
    val += "))";

    setExampleSolutionVariableNames(names);
    setExampleSolutionVariableValues(values);

    return code + val;
  };

  const handleCompile = (submission: boolean = false) => {
    setOutputDetails(null);
    let codeWithInput = addInputData(variables);
    const formData = {
      language_id: language.id,
      source_code: encode(codeWithInput),
    };
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json;charset=utf-8",
        "Content-Type": "application/json;charset=utf-8",
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token, submission);
      })
      .catch((err) => {});
  };

  const printSolutionVariables = () => {
    return exampleSolutionVariableNames.map((name, index) => {
      return (
        <div key={name} className="flex mr-12">
          <p className="font-normal text-md text-gray-500">{name}:</p>
          <p className="font-normal text-md text-blue-500 ml-2">
            {exampleSolutionVariableValues[index]}
          </p>
        </div>
      );
    });
  };

  const checkStatus = async (token, submission) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(async () => {
          await checkStatus(token, submission);
        }, 2000);
        return;
      } else {
        setOutputDetails(response.data);

        return;
      }
    } catch (err) {}
  };

  const getOutput = () => {
    if (outputDetails === null) return;
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <p className="font-normal text-xs text-red-500">
          {decode(outputDetails?.compile_output)}
        </p>
      );
    } else if (statusId === 3) {
      return (
        <p className="font-normal text-md text-green-700">
          {outputDetails?.stdout !== null
            ? `${decode(outputDetails?.stdout)}`
            : null}
        </p>
      );
    } else if (statusId === 5) {
      return (
        <p className="font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </p>
      );
    } else {
      return (
        <p className="font-normal text-xs text-red-500">
          {decode(outputDetails?.stderr)}
        </p>
      );
    }
  };

  const generateInitialValue = (): string => {
    let val = "function solution(";
    for (let variable of variables) {
      if (variable.type === "str") val += variable.name + ": string, ";
      else if (variable.type === "int") val += variable.name + ": number, ";
      else if (variable.type === "int[]") val += variable.name + ": number[], ";
    }
    if (variables.length > 0) val = val.substring(0, val.length - 2);

    val += ") {\n\treturn\n}";

    return val;
  };

  return (
    <div className="mb-4">
      <div className="overlay rounded-md w-3/4 h-full shadow-4xl m-auto">
        <Editor
          height="60vh"
          width={`100%`}
          language={language.value || "typecript"}
          value={code}
          theme={theme}
          defaultValue={generateInitialValue()}
          onChange={handleEditorChange}
        />
      </div>
      <div className="">
        <Button
          text="See example solution"
          onClick={() => {
            handleCompile();
          }}
          className="bg-blue-700 hover:bg-blue-600 px-3 my-2"
        />

        <Button
          text="Refresh variables"
          onClick={() => {
            handleEditorChange(generateInitialValue());
          }}
          className="bg-gray-800 hover:bg-gray-700 px-3 my-2 ml-4"
        />
      </div>
      {(exampleSolutionVariableNames.length > 0 || outputDetails !== null) && (
        <div className="flex">
          <div className="bg-gray-200 rounded-md p-3">
            <Header title="Variables" size="text-sm" />{" "}
            {printSolutionVariables()}
          </div>
          <div className="ml-4 bg-gray-200 rounded-md p-3 px-6">
            <Header title="Solution" size="text-sm" />
            {getOutput()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeSolution;
