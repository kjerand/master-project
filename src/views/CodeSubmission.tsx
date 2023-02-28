import { useEffect, useState } from "react";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Header from "../components/base/Header";
import DisplayQuestion from "../components/CodeSubmission/DisplayQuestion";
import axios from "axios";

import CodeEditor from "../components/CodeSubmission/CodeEditor";
import { Language, languages } from "../utils/languages";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import ThemeDropdown from "../components/ThemeDropdown";
import { defineTheme, Theme } from "../utils/defineTheme";
import LanguagesDropdown from "../components/LanguagesDropdown";
import DropdownBar from "../components/DropdownBar";
import CodeOutput from "../components/CodeOutput";
import CompileButton from "../components/CompileButton";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { encode, decode } from "js-base64";

const CodeSubmission = () => {
  const [theme, setTheme] = useState<Theme>();
  const [processing, setProcessing] = useState(null);
  const [processingSubmit, setProcessingSubmit] = useState(null);
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [outputDetails, setOutputDetails] = useState(null);
  const [answerEvaluation, setAnswerEvaluation] = useState<number>(0);

  const questionList = useSelector((state: RootState) => state.questions);
  const [taskIndex, setTaskIndex] = useState<number>(0);
  const [code, setCode] = useState<string>();

  const onChange = (data) => {
    setCode(data);
  };

  useEffect(() => {
    defineTheme("brilliance-black").then((_) =>
      setTheme({ value: "brilliance-black", label: "Brilliance Black" })
    );
  }, []);

  const checkIfPrintingSolution = (): boolean => {
    if (
      code.includes(
        `console.log("${questionList.questions[taskIndex].solution}")`
      ) ||
      code.includes(
        `console.log('${questionList.questions[taskIndex].solution}')`
      )
    ) {
      setAnswerEvaluation(3);
      return true;
    }
    return false;
  };

  const handleCompile = (submission: boolean = false) => {
    if (checkIfPrintingSolution()) return;

    setAnswerEvaluation(0);
    if (submission) setProcessingSubmit(true);
    else setProcessing(true);

    const formData = {
      language_id: language.id,
      source_code: encode(code),
    };
    const options = {
      method: "POST",
      url: "http://localhost:2358/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token, submission);
      })
      .catch((err) => {
        if (submission) setProcessingSubmit(false);
        else setProcessing(false);
      });
  };

  const handleSubmit = () => handleCompile(true);

  const evaluateSubmission = (outputData) => {
    if (outputData?.stdout !== null) {
      let output = decode(outputData.stdout)
        .replace(/ /g, "")
        .replace(/\n|\r/g, "")
        .trim();
      const solution = questionList.questions[taskIndex].solution
        .replace(/ /g, "")
        .replace(/\n|\r/g, "")
        .trim();

      if (output === solution) {
        setAnswerEvaluation(1);
        return;
      }
    }
    setAnswerEvaluation(2);
  };

  const checkStatus = async (token, submission) => {
    const options = {
      method: "GET",
      url: "http://localhost:2358/submissions/" + token,
      params: { base64_encoded: "true", fields: "*" },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token, submission);
        }, 2000);
        return;
      } else {
        if (submission) setProcessingSubmit(false);
        else setProcessing(false);
        setOutputDetails(response.data);
        if (submission) evaluateSubmission(response.data);
        return;
      }
    } catch (err) {
      if (submission) setProcessingSubmit(false);
      else setProcessing(false);
    }
  };

  const getOutput = () => {
    if (outputDetails === null) return;
    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // compilation error
      return (
        <p className="px-2 py-1 font-normal text-xs text-red-500">
          {decode(outputDetails?.compile_output)}
        </p>
      );
    } else if (statusId === 3) {
      return (
        <p className="px-2 py-1 font-normal text-md text-green-700">
          {outputDetails?.stdout !== null
            ? `${decode(outputDetails?.stdout)}`
            : null}
        </p>
      );
    } else if (statusId === 5) {
      return (
        <p className="px-2 py-1 font-normal text-xs text-red-500">
          {`Time Limit Exceeded`}
        </p>
      );
    } else {
      return (
        <p className="px-2 py-1 font-normal text-xs text-red-500">
          {decode(outputDetails?.stderr)}
        </p>
      );
    }
  };

  function handleThemeChange(th) {
    const theme = th;

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value)
        .then((_) => {
          setTheme(theme);
        })
        .catch((err) => console.log(err));
    }
  }

  const onSelectChange = (sl) => {
    setLanguage(sl);
  };

  useEffect(() => {
    setCode(questionList.questions[taskIndex].initialCode);
  }, [taskIndex]);

  return (
    <Container>
      <Card width="w-4/5 min-h-44">
        {questionList.questions.length > 0 && theme ? (
          <>
            <Header title="Programming questions" size="4xl" />
            <DisplayQuestion
              questions={questionList.questions}
              taskIndex={taskIndex}
            />
            <Container>
              <CodeEditor
                code={code}
                theme={theme.value}
                language={language.value}
                onChange={onChange}
                initialCode={questionList.questions[taskIndex].initialCode}
              />
              <Sidebar
                handleSubmit={handleSubmit}
                handleCompile={handleCompile}
                evaluation={answerEvaluation}
                processing={processing}
                processingSubmit={processingSubmit}
                output={getOutput}
                nextStage={() => {
                  setTaskIndex(taskIndex + 1);
                  setAnswerEvaluation(0);
                }}
              />
            </Container>
            <DropdownBar
              handleThemeChange={handleThemeChange}
              theme={theme}
              onSelectChange={onSelectChange}
              taskIndex={taskIndex}
              setTaskIndex={setTaskIndex}
              length={questionList.questions.length}
            />
          </>
        ) : (
          <Header
            title="Waiting for questions to be added..."
            size="2xl"
            className="my-12"
          />
        )}
      </Card>
    </Container>
  );
};

export default CodeSubmission;
