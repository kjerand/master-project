import { ContentState, EditorState, Editor } from "draft-js";

const DisplayQuestion = ({ question }: { question: Question }) => {
  return (
    <>
      <div className="bg-gray-100 p-3 rounded-md my-4 text-base font-mono">
        <p className="whitespace-pre-line">{question.questionBody}</p>
        <p className="whitespace-pre-line">{question.solutionBody}</p>
      </div>
    </>
  );
};

export default DisplayQuestion;
