import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { languages } from "../../utils/languages";
import Header from "../base/Header";
import DisplayQuestion from "../AnswerQuestion/DisplayQuestion";
import QuestionDropdown from "../AnswerQuestion/QuestionDropdown";

import { addQuestion, deleteQuestion, Question } from "../../app/questions";

const QuestionDetails = ({
  question,
  taskIndex,
  setTaskIndex,
}: {
  question: Question;
  taskIndex: number;
  setTaskIndex: Function;
}) => {
  const dispatch = useDispatch();

  const questionList = useSelector(
    (state: RootState) => state.questions.questions
  );

  const handleDelete = () => {
    dispatch(deleteQuestion(taskIndex));

    if (taskIndex - 1 > 0) setTaskIndex(taskIndex - 1);
    else setTaskIndex(0);
  };

  return (
    <div>
      <div className="grid grid-cols-2 my-4">
        <div className="flex m-auto font-mono">
          <p className="mr-6 flex">
            <p className="text-blue-700 mr-1">{`Title:`}</p>
            <p> {question.title}</p>
          </p>
          <p className="mr-6 flex">
            <p className="text-blue-700 mr-1">{`Variant:`}</p>
            <p> {question.variant}</p>
          </p>
          <p className="mr-6 flex">
            <p className="text-blue-700 mr-1">{`Subject:`}</p>
            <p> {question.subject}</p>
          </p>
          <p className="flex" onClick={handleDelete}>
            <p className="text-red-700 mr-1 cursor-pointer">{`Delete`}</p>
          </p>
        </div>
        <QuestionDropdown
          questionList={questionList}
          taskIndex={taskIndex}
          setTaskIndex={setTaskIndex}
        />
      </div>

      <DisplayQuestion question={question} />
      <Header title="Attached code" size="text-lg" />
      <div className="overlay rounded-md w-full h-full shadow-4xl">
        <Editor
          height="30vh"
          width={`100%`}
          value={question.initialCode}
          defaultLanguage={"typescript"}
          options={{ readOnly: true }}
        />
      </div>
      <Header title="Code solution" size="text-lg" />
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
