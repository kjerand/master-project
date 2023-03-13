import { useEffect, useState } from "react";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Header from "../components/base/Header";
import DisplayQuestion from "../components/AnswerQuestion/DisplayQuestion";
import axios from "axios";
import CodeEditor from "../components/AnswerQuestion/CodeEditor";
import { Language, languages } from "../utils/languages";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { defineTheme, Theme } from "../utils/defineTheme";
import DropdownBar from "../components/AnswerQuestion/DropdownBar";
import Sidebar from "../components/AnswerQuestion/Sidebar";
import { encode, decode } from "js-base64";
import { FadeLoader } from "react-spinners";
import GuessCodeOutput from "../components/CreateQuestion/GuessCodeOutput";
import Loading from "../components/base/Loading";
import Empty from "../components/base/Empty";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../ROUTES";

const AnswerQuestion = () => {
  const { subject } = useParams();
  console.log(subject);
  const [theme, setTheme] = useState<Theme>();
  const [processing, setProcessing] = useState(null);
  const [processingSubmit, setProcessingSubmit] = useState(null);
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [outputDetails, setOutputDetails] = useState(null);
  const [answerEvaluation, setAnswerEvaluation] = useState<number>(0);

  const questionList = useSelector((state: RootState) =>
    state.questions.questions.filter(
      (q) => q.subject === subject || subject === "all"
    )
  );
  const [taskIndex, setTaskIndex] = useState<number>(
    Math.floor(Math.random() * questionList.length)
  );
  const [code, setCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [questionSolution, setQuestionSolution] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (questionList.length > 0) {
      if (questionList[taskIndex].codeSolution !== "") {
        handleCompile(false, true);
      } else {
        setQuestionSolution(questionList[taskIndex].textSolution);
        setLoading(false);
      }
    }
  }, [taskIndex]);

  const onChange = (data) => {
    setCode(data);
  };

  useEffect(() => {
    defineTheme("brilliance-black").then((_) =>
      setTheme({ value: "brilliance-black", label: "Brilliance Black" })
    );
  }, []);

  const checkIfPrintingSolution = (): boolean => {
    const compressedCode = code.replace(/ /g, "").replace(/\n|\r/g, "").trim();
    const compressedSolution = questionSolution
      .replace(/ /g, "")
      .replace(/\n|\r/g, "")
      .trim();
    if (
      compressedCode.includes(`console.log("${compressedSolution}")`) ||
      compressedCode.includes(`console.log('${compressedSolution}')`)
    ) {
      setAnswerEvaluation(3);
      return true;
    }
    return false;
  };

  const handleCompile = (
    submission: boolean = false,
    loadingSolution: boolean = false
  ) => {
    if (loadingSolution) {
      setLoading(true);
    }
    if (submission) if (checkIfPrintingSolution()) return;

    const compilecode = loadingSolution
      ? questionList[taskIndex].codeSolution
      : code;

    setAnswerEvaluation(0);
    if (submission) setProcessingSubmit(true);
    else if (!submission && !loadingSolution) setProcessing(true);

    const formData = {
      language_id: language.id,
      source_code: encode(compilecode),
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
        checkStatus(token, submission, loadingSolution);
      })
      .catch((err) => {
        console.log(err);
        if (submission) setProcessingSubmit(false);
        else if (!submission && !loadingSolution) setProcessing(false);
      });
  };

  const handleSubmit = () => handleCompile(true, false);

  const evaluateSubmission = (outputData) => {
    if (outputData?.stdout !== null) {
      let output = decode(outputData.stdout)
        .replace(/ /g, "")
        .replace(/\n|\r/g, "")
        .trim();
      const solution = questionSolution
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

  const checkStatus = async (token, submission, loadingSolution) => {
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
        setTimeout(() => {
          checkStatus(token, submission, loadingSolution);
        }, 2000);
        return;
      } else {
        if (loadingSolution) {
          setQuestionSolution(decode(response.data.stdout));
          setLoading(false);
        }

        if (submission) setProcessingSubmit(false);
        else setProcessing(false);
        if (!loadingSolution) setOutputDetails(response.data);
        if (submission) evaluateSubmission(response.data);

        setLoading(false);
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

    console.log("HAHAHAHAH");

    if (statusId === 6) {
      // compilation error
      return (
        <p className="px-2 py-1 font-normal text-xs text-red-500">
          {decode(outputDetails?.compile_output)}
        </p>
      );
    } else if (statusId === 3) {
      return (
        <p className="px-2 py-1 font-normal text-lg font-mono text-green-700">
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
    if (questionList.length > 0) {
      setCode(questionList[taskIndex].initialCode);
      setOutputDetails(null);
      setAnswerEvaluation(0);
    }
  }, [taskIndex]);

  const variant = () => {
    if (questionList.length > 0 && theme) {
      switch (questionList[taskIndex].variant) {
        case "code":
          return (
            <>
              <Header title={questionList[taskIndex].title} size="text-2xl" />
              <DisplayQuestion question={questionList[taskIndex]} />
              <Container>
                <CodeEditor
                  code={code}
                  theme={theme.value}
                  language={language.value}
                  onChange={onChange}
                  initialCode={questionList[taskIndex].initialCode}
                />
                <Sidebar
                  handleSubmit={handleSubmit}
                  handleCompile={handleCompile}
                  evaluation={answerEvaluation}
                  processing={processing}
                  processingSubmit={processingSubmit}
                  output={getOutput}
                  nextStage={() => {
                    setTaskIndex(
                      Math.floor(Math.random() * questionList.length)
                    );
                    setAnswerEvaluation(0);
                  }}
                  loading={loading}
                />
              </Container>
              <DropdownBar
                handleThemeChange={handleThemeChange}
                theme={theme}
                onSelectChange={onSelectChange}
                taskIndex={taskIndex}
                setTaskIndex={setTaskIndex}
                questionList={questionList}
              />
            </>
          );
        case "text":
          return (
            <GuessCodeOutput
              solution={questionSolution}
              question={questionList[taskIndex]}
              theme={theme.value}
              language={language.value}
              nextStage={() => {
                setTaskIndex(Math.floor(Math.random() * questionList.length));
                setAnswerEvaluation(0);
              }}
              taskIndex={taskIndex}
              setTaskIndex={setTaskIndex}
              loading={loading}
              answerEvaluation={answerEvaluation}
              setAnswerEvaluation={setAnswerEvaluation}
              questionList={questionList}
            />
          );
      }
    } else return <Loading />;
  };

  return (
    <Container>
      {questionList.length === 0 ? (
        <Empty goBack={() => navigate(ROUTES.subjects.path)} />
      ) : (
        <Card
          width={`${
            questionList[taskIndex].variant === "code" ? "w-3/4" : "w-1/2"
          }`}
          goBack={() => navigate(ROUTES.subjects.path)}
        >
          {variant()}
        </Card>
      )}
    </Container>
  );
};

export default AnswerQuestion;