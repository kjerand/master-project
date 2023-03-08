import Editor from "@monaco-editor/react";
import { Question } from "../../app/questions";
import { languages } from "../../utils/languages";
import Header from "../base/Header";
import DisplayQuestion from "../CodeSubmission/DisplayQuestion";
import QuestionDropdown from "../CodeSubmission/QuestionDropdown";

const QuestionDetails = ({
  question,
  taskIndex,
  setTaskIndex,
}: {
  question: Question;
  taskIndex: number;
  setTaskIndex: Function;
}) => {
  return (
    <div>
      <div className="grid grid-cols-2 my-4">
        <div className="flex m-auto font-mono">
          <p className="mr-6 flex">
            <p className="text-blue-700 mr-1">{`Title:`}</p>
            <p> {question.title}</p>
          </p>
          <p className="flex">
            <p className="text-blue-700 mr-1">{`Variant:`}</p>
            <p> {question.variant}</p>
          </p>
        </div>
        <QuestionDropdown taskIndex={taskIndex} setTaskIndex={setTaskIndex} />
      </div>

      <DisplayQuestion question={question} />
      <Header title="Attached code" size="lg" />
      <div className="overlay rounded-md w-full h-full shadow-4xl">
        <Editor
          height="30vh"
          width={`100%`}
          value={question.initialCode}
          defaultLanguage={"typescript"}
          options={{ readOnly: true }}
        />
      </div>
      <Header title="Code solution" size="lg" />
      <div className="overlay rounded-md w-full h-full shadow-4xl">
        <Editor
          height="30vh"
          width={`100%`}
          language={languages[0].value}
          value={question.codeSolution}
          defaultLanguage={"typescript"}
          options={{ readOnly: true }}
        />
      </div>
    </div>
  );
};

export default QuestionDetails;
