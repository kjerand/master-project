import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import { ContentState, EditorState } from "draft-js";

const DisplayQuestion = ({ question }: { question: Question }) => {
  return (
    <>
      <div className="bg-gray-100 p-3 rounded-md my-4">
        <Editor
          editorState={EditorState.createWithContent(
            ContentState.createFromText(question.questionBody)
          )}
          toolbarClassName="hidden"
          editorClassName="text-base font-mono"
          readOnly={true}
        />
        <Editor
          editorState={EditorState.createWithContent(
            ContentState.createFromText(question.solutionBody)
          )}
          toolbarClassName="hidden"
          editorClassName="text-base font-mono"
          readOnly={true}
        />
      </div>
    </>
  );
};

export default DisplayQuestion;
