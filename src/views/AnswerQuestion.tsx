import { useEffect, useState } from "react";
import Card from "../components/base/Card";
import Container from "../components/base/Container";
import Header from "../components/base/Header";
import DisplayQuestion from "../components/AnswerQuestion/DisplayQuestion";
import axios from "axios";
import CodeEditor from "../components/AnswerQuestion/CodeEditor";
import { Language, languages } from "../utils/languages";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { defineTheme, Theme } from "../utils/defineTheme";
import DropdownBar from "../components/AnswerQuestion/DropdownBar";
import Sidebar from "../components/AnswerQuestion/Sidebar";
import { encode, decode } from "js-base64";
import GuessCodeOutput from "../components/CreateQuestion/GuessCodeOutput";
import Loading from "../components/base/Loading";
import Empty from "../components/base/Empty";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../ROUTES";
import { courses } from "../utils/courses";
import { uploadUsageData } from "../database/usage";

const AnswerQuestion = () => {
  const { subject } = useParams();
  const [theme, setTheme] = useState<Theme>();
  const [processing, setProcessing] = useState(null);
  const [processingSubmit, setProcessingSubmit] = useState(null);
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [outputDetails, setOutputDetails] = useState(null);
  const [answerEvaluation, setAnswerEvaluation] = useState<number>(0);
  const userID = useSelector((state: RootState) => state.admin.userID);

  const questionList = useSelector((state: RootState) =>
    state.questions.questions.filter((q) => {
      if (courses[subject]) {
        const values = courses[subject].map((v) => v.value);
        return values.includes(q.subject);
      }
      return q.subject === subject;
    })
  );
  const [taskIndex, setTaskIndex] = useState<number>(
    Math.floor(Math.random() * questionList.length)
  );
  const [code, setCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [questionSolution, setQuestionSolution] = useState<string>("");

  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => setTime(time + 1), 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTime(0);

    if (questionList.length > 0) {
      setCode(questionList[taskIndex].initialCode);
      setOutputDetails(null);
      setAnswerEvaluation(0);

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
    uploadActionData("load");
  }, []);

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
      compressedCode.includes(`console.log('${compressedSolution}')`) ||
      compressedCode.includes("console.log(`" + compressedSolution + "`)")
    ) {
      setAnswerEvaluation(3);
      return true;
    }
    return false;
  };

  const handleCompileClick = async () => {
    handleCompile();
    await uploadActionData("compile");
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
    if (submission) {
      setProcessingSubmit(true);
      setLoading(true);
    } else if (!submission && !loadingSolution) setProcessing(true);

    const formData = {
      language_id: questionList[taskIndex].languageID,
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

  const handleSubmitClick = async () => {
    handleCompile(true, false);
    await uploadActionData("submit");
  };

  const evaluateSubmission = async (outputData) => {
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
        await uploadActionData("correct", questionList[taskIndex].id, code);
        return;
      }
    }
    setAnswerEvaluation(2);
    await uploadActionData("wrong", questionList[taskIndex].id, code);
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

  const nextQuestion = async (skip: boolean = false) => {
    const prevQuestionID = questionList[taskIndex].id;
    let newTaskIndex = Math.floor(Math.random() * questionList.length);
    while (newTaskIndex === taskIndex)
      newTaskIndex = Math.floor(Math.random() * questionList.length);
    setTaskIndex(newTaskIndex);
    setAnswerEvaluation(0);
    if (skip) await uploadActionData("skip", prevQuestionID);
    await uploadActionData("load", questionList[newTaskIndex].id);
  };

  const skipQuestion = async () => {
    nextQuestion(true);
  };

  const uploadActionData = async (
    type: string,
    questionID?: string,
    code?: string
  ) =>
    await uploadUsageData(
      type,
      userID,
      questionID ? questionID : questionList[taskIndex].id,
      type === "load" ? 0 : time,
      code
    );

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
                  handleSubmit={handleSubmitClick}
                  handleCompile={handleCompileClick}
                  evaluation={answerEvaluation}
                  processing={processing}
                  processingSubmit={processingSubmit}
                  output={getOutput}
                  nextStage={nextQuestion}
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
              nextStage={nextQuestion}
              taskIndex={taskIndex}
              setTaskIndex={setTaskIndex}
              loading={loading}
              answerEvaluation={answerEvaluation}
              setAnswerEvaluation={setAnswerEvaluation}
              questionList={questionList}
              uploadActionData={uploadActionData}
            />
          );
      }
    } else return <Loading />;
  };

  return (
    <Container>
      {questionList.length === 0 ? (
        <Empty goBack={() => navigate(ROUTES.menu.path)} />
      ) : (
        <Card
          width={`${
            questionList[taskIndex].variant === "code" ? "w-4/5" : "w-3/5"
          }`}
          goBack={() => navigate(ROUTES.menu.path)}
          skip={skipQuestion}
          loading={loading}
        >
          {variant()}
        </Card>
      )}
    </Container>
  );
};

export default AnswerQuestion;
