import { Question } from "../../app/questions";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";

const DisplayQuestion = ({
  questions,
  taskIndex,
}: {
  questions: Question[];
  taskIndex: number;
}) => {
  return (
    <>
      {questions.length > 0 && (
        <>
          <div className="bg-gray-100 p-3 rounded-md my-4">
            <Editor
              editorState={questions[taskIndex].questionBody}
              toolbarClassName="hidden"
              readOnly={true}
            />
            <Editor
              editorState={questions[taskIndex].solutionBody}
              toolbarClassName="hidden"
              readOnly={true}
            />
          </div>
        </>
      )}
    </>
  );
};

export default DisplayQuestion;
