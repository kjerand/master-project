import { ContentState, EditorState, Editor } from "draft-js";

const DisplayQuestion = ({ question }: { question: Question }) => {
  return (
    <>
      <div className="bg-gray-100 p-3 rounded-md my-4 text-base font-mono">
        <Editor
          editorState={EditorState.createWithContent(
            ContentState.createFromText(question.questionBody)
          )}
          onChange={() => {}}
          readOnly={true}
        />
        <Editor
          editorState={EditorState.createWithContent(
            ContentState.createFromText(question.solutionBody)
          )}
          onChange={() => {}}
          readOnly={true}
        />
      </div>
    </>
  );
};

export default DisplayQuestion;
