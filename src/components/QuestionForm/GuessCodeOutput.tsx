import Editor from "@monaco-editor/react";
import { useState } from "react";
import { Question } from "../../app/questions";
import Button from "../base/Button";
import Header from "../base/Header";
import DisplayQuestion from "../CodeSubmission/DisplayQuestion";
import EvaluationOutput from "../CodeSubmission/EvaluationOutput";
import QuestionDropdown from "../CodeSubmission/QuestionDropdown";

const GuessCodeOutput = ({
  solution,
  question,
  theme,
  language,
  nextStage,
  taskIndex,
  setTaskIndex,
}: {
  solution: string;
  question: Question;
  theme: string;
  language: string;
  nextStage: Function;
  taskIndex: number;
  setTaskIndex: Function;
}) => {
  const [answerEvaluation, setAnswerEvaluation] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  const evaluate = () => {
    if (answer.trim() == solution.trim()) setAnswerEvaluation(1);
    else setAnswerEvaluation(2);
  };
  return (
    <>
      <Header title={question.title} size="4xl" />
      <DisplayQuestion question={question} />
      <div className="overlay rounded-md shadow-4xl">
        <Editor
          height="50vh"
          width={`100%`}
          language={language}
          value={question.codeSolution}
          theme={theme}
          defaultValue={question.codeSolution}
          onChange={() => {}}
          options={{ readOnly: true }}
        />
      </div>
      <QuestionDropdown
        taskIndex={taskIndex}
        setTaskIndex={setTaskIndex}
        className="w-full my-2"
      />
      <div className="grid grid-cols-2 my-4">
        <div className="w-full flex m-auto">
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
            className="w-2/3 border-gray-600 border p-2 mr-2 rounded font-mono"
          />
          <Button
            text={`${answerEvaluation === 1 ? "Next stage" : "Submit"}`}
            onClick={() => {
              if (answerEvaluation !== 1) evaluate();
              else nextStage();
            }}
            className={`${
              answerEvaluation === 1
                ? "bg-green-600 hover:bg-green-500"
                : "bg-yellow-600 hover:bg-yellow-500"
            } w-1/3`}
          />
        </div>
        <div className="m-auto">
          <EvaluationOutput evaluation={answerEvaluation} />
        </div>
      </div>
    </>
  );
};

export default GuessCodeOutput;
