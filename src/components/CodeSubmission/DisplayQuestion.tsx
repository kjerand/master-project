import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import Header from "../base/Header";

const DisplayQuestion = () => {
  const questions = useSelector((state: RootState) => state.questions);
  const [taskIndex, setTaskIndex] = useState<number>(0);

  return (
    <>
      {questions.questions.length > 0 && (
        <>
          <h1 className="font-medium leading-tight text-lg mt-0 mb-2 text-gray-700 mt-10">
            Choose question
          </h1>
          <div className="flex">
            {Array.from(Array(questions.questions.length)).map((v, index) => {
              return (
                <p
                  key={v}
                  onClick={() => setTaskIndex(index)}
                  className="hover:text-gray-600 text-blue-600 px-1 cursor-pointer"
                >
                  {index + 1}
                </p>
              );
            })}
          </div>

          <Editor
            toolbar={{
              options: [],
            }}
            editorState={questions.questions[taskIndex]}
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />
        </>
      )}
    </>
  );
};

export default DisplayQuestion;
