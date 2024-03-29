import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import Button from "../base/Button";
import Header from "../base/Header";
import DisplayQuestion from "../AnswerQuestion/DisplayQuestion";
import EvaluationOutput from "../AnswerQuestion/EvaluationOutput";
import QuestionDropdown from "../AnswerQuestion/QuestionDropdown";

const GuessCodeOutput = ({
  solution,
  question,
  theme,
  language,
  nextStage,
  taskIndex,
  setTaskIndex,
  loading,
  answerEvaluation,
  setAnswerEvaluation,
  questionList,
  uploadActionData,
}: {
  solution: string;
  question: Question;
  theme: string;
  language: string;
  nextStage: Function;
  taskIndex: number;
  setTaskIndex: Function;
  loading: boolean;
  answerEvaluation: number;
  setAnswerEvaluation: Function;
  questionList: Question[];
  uploadActionData: Function;
}) => {
  const [answer, setAnswer] = useState<string>("");

  const evaluate = async () => {
    if (answer.trim() == solution.trim()) {
      setAnswerEvaluation(1);
      await uploadActionData("correct");
    } else {
      setAnswerEvaluation(2);
      await uploadActionData("wrong");
    }
  };

  useEffect(() => setAnswer(""), [taskIndex]);
  return (
    <>
      <Header title={question.title} size="text-2xl" />
      <DisplayQuestion question={question} />
      <div className="overlay rounded-md shadow-4xl">
        <Editor
          height="70vh"
          width={`100%`}
          language={language}
          value={question.codeSolution}
          theme={theme}
          defaultValue={question.codeSolution}
          onChange={() => {}}
          options={{ readOnly: true }}
        />
      </div>
      {/*    <QuestionDropdown
        questionList={questionList}
        taskIndex={taskIndex}
        setTaskIndex={setTaskIndex}
        className="w-full my-2"
  />*/}

      <div className="grid grid-cols-2 my-4">
        <div className="w-full flex m-auto">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
            className="w-2/3 border-gray-600 border p-2 mr-2 rounded font-mono"
          />
          <Button
            text={`${answerEvaluation === 1 ? "Next question" : "Submit"}`}
            onClick={() => {
              if (answerEvaluation === 1) nextStage();
              else evaluate();
            }}
            className={`${
              loading
                ? "bg-gray-600"
                : answerEvaluation === 1
                ? "bg-green-600 hover:bg-green-500"
                : "bg-yellow-600 hover:bg-yellow-500"
            } w-1/3`}
            disabled={loading}
          />
        </div>
        <div className="m-auto">
          <EvaluationOutput evaluation={answerEvaluation} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default GuessCodeOutput;
